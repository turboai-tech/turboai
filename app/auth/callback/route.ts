import type { EmailOtpType } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

import { createClient } from '@/lib/supabase/server'

/** 只允许站内相对路径，避免 next 被构造成开放重定向 */
function sanitizeNext(value: string | null): string {
  if (!value || !value.startsWith('/') || value.startsWith('//')) {
    return '/dashboard'
  }
  return value
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const next = sanitizeNext(searchParams.get('next'))

  const code = searchParams.get('code')
  const tokenHash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null

  const supabase = await createClient()

  // PKCE 流程：OAuth 回调走这一支
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // 邮件 OTP 流程：密码重置、邮箱确认、邀请都走这一支。
  // 之前只处理了 code，导致重置密码链接必定失败。
  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type,
    })
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback`)
}
