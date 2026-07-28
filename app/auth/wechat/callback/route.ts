import { timingSafeEqual } from 'node:crypto'

import { NextResponse, type NextRequest } from 'next/server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { RATE_LIMITS, checkRateLimit, recordAuthEvent } from '@/server/security'
import { WECHAT_EMAIL_DOMAIN } from '@/lib/wechat/identity'
import { authenticateWithCode } from '@/lib/wechat/client'

import { NEXT_COOKIE, STATE_COOKIE } from '../start/route'

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  // timingSafeEqual 要求等长，长度不同直接判否（长度本身不是秘密）
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

function failure(request: NextRequest, reason: string) {
  const response = NextResponse.redirect(
    new URL(`/login?error=${reason}`, request.url),
  )
  response.cookies.delete(STATE_COOKIE)
  response.cookies.delete(NEXT_COOKIE)
  return response
}

/** 与 tRPC context 同一套取法：平台注入的头优先，客户端伪造不了 */
function clientIp(request: NextRequest): string | null {
  const vercel = request.headers.get('x-vercel-forwarded-for')
  if (vercel) return vercel.split(',')[0]?.trim() || null
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]?.trim() || null
  return request.headers.get('x-real-ip')
}

export async function GET(request: NextRequest) {
  const ip = clientIp(request)
  const userAgent = request.headers.get('user-agent')

  // 这个入口会触发对微信的换取请求，拿伪造 code 反复打即可放大成对外流量。
  if (!(await checkRateLimit(RATE_LIMITS.wechatCallback, ip))) {
    return failure(request, 'wechat_rate_limited')
  }

  const code = request.nextUrl.searchParams.get('code')
  const state = request.nextUrl.searchParams.get('state')
  const expectedState = request.cookies.get(STATE_COOKIE)?.value
  const next = request.cookies.get(NEXT_COOKIE)?.value ?? '/dashboard'

  // 用户在微信侧点了取消
  if (!code) {
    return failure(request, 'wechat_cancelled')
  }

  // CSRF：state 必须与下发时写入的 cookie 一致
  if (!state || !expectedState || !safeEqual(state, expectedState)) {
    return failure(request, 'wechat_state_mismatch')
  }

  let wechatUser
  try {
    wechatUser = await authenticateWithCode(code)
  } catch {
    return failure(request, 'wechat_exchange_failed')
  }

  // 用微信身份派生一个确定性的合成邮箱。微信不提供邮箱，而 Supabase 的用户以
  // 邮箱为主键标识，因此必须合成一个。域名不可路由，且注册表单会拒绝该域名，
  // 防止有人用它抢注从而劫持某个微信账号。
  const email = `wx_${wechatUser.identity}@${WECHAT_EMAIL_DOMAIN}`

  const admin = createAdminClient()

  const { error: createError } = await admin.auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: {
      provider: 'wechat',
      wechat_openid: wechatUser.openid,
      wechat_unionid: wechatUser.unionid ?? null,
      full_name: wechatUser.nickname ?? null,
      avatar_url: wechatUser.avatarUrl ?? null,
    },
  })

  // 已存在即是老用户，属正常路径；其余错误才是真失败。
  const alreadyExists =
    createError?.message?.toLowerCase().includes('already') ?? false
  if (createError && !alreadyExists) {
    return failure(request, 'wechat_user_create_failed')
  }

  // 签发会话：微信不签发 OIDC ID token，因此 signInWithIdToken 走不通。
  // 改为由 service role 生成一次性 magiclink 的 token_hash，再在服务端立刻核销，
  // 核销动作会把会话 cookie 写入响应。token 不出服务端，也不经过邮件。
  const { data: link, error: linkError } = await admin.auth.admin.generateLink({
    type: 'magiclink',
    email,
  })

  if (linkError || !link?.properties?.hashed_token) {
    return failure(request, 'wechat_session_failed')
  }

  const supabase = await createClient()
  const { error: verifyError } = await supabase.auth.verifyOtp({
    token_hash: link.properties.hashed_token,
    type: 'magiclink',
  })

  if (verifyError) {
    return failure(request, 'wechat_session_failed')
  }

  await recordAuthEvent({
    event: 'wechat.signin',
    email,
    ip,
    userAgent,
    detail: {
      openid: wechatUser.openid,
      has_unionid: Boolean(wechatUser.unionid),
      new_user: !alreadyExists,
    },
  })

  const response = NextResponse.redirect(new URL(next, request.url))
  response.cookies.delete(STATE_COOKIE)
  response.cookies.delete(NEXT_COOKIE)
  return response
}
