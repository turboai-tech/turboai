import { randomBytes } from 'node:crypto'

import { NextResponse, type NextRequest } from 'next/server'

import { buildAuthorizeUrl } from '@/lib/wechat/client'

export const STATE_COOKIE = 'wx_oauth_state'
export const NEXT_COOKIE = 'wx_oauth_next'

/** 只允许站内相对路径，防止被构造成开放重定向 */
function sanitizeNext(value: string | null): string {
  if (!value || !value.startsWith('/') || value.startsWith('//')) {
    return '/dashboard'
  }
  return value
}

export async function GET(request: NextRequest) {
  const next = sanitizeNext(request.nextUrl.searchParams.get('next'))

  let authorizeUrl: string
  const state = randomBytes(32).toString('hex')

  try {
    authorizeUrl = buildAuthorizeUrl(state)
  } catch {
    // 未配置微信环境变量时不要抛 500，回到登录页给出可读提示
    return NextResponse.redirect(
      new URL('/login?error=wechat_unconfigured', request.url),
    )
  }

  const response = NextResponse.redirect(authorizeUrl)

  // state 存 httpOnly cookie，回调时比对 —— 微信网站应用不支持 PKCE，
  // 这是本链路唯一的 CSRF 防护，不能省。
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 600, // 10 分钟，够扫码用，也限制了重放窗口
  }

  response.cookies.set(STATE_COOKIE, state, cookieOptions)
  response.cookies.set(NEXT_COOKIE, next, cookieOptions)

  return response
}
