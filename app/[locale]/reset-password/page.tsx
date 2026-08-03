import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

import AuthCard from '@/components/auth/auth-card'
import ResetPasswordForm from '@/components/auth/reset-password-form'
import { createClient } from '@/lib/supabase/server'

export default async function ResetPasswordPage() {
  const t = await getTranslations('Auth')

  // 用户是带着重置链接建立的会话到这里的（链接先经 /auth/callback 核销）。
  // 用 getUser() 而非 getSession()：后者不校验 JWT 签名，伪造 cookie 即可
  // 进到改密表单 —— 那等于把改密功能对任何人开放。
  let hasSession = false
  try {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    hasSession = Boolean(data.user)
  } catch {
    hasSession = false
  }

  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center">
      <AuthCard
        description={t('reset_password_description')}
        title={t('reset_password_title')}
        footer={
          <Link className="text-accent font-medium hover:underline" href="/login">
            {t('back_to_sign_in')}
          </Link>
        }
      >
        <ResetPasswordForm hasSession={hasSession} />
      </AuthCard>
    </div>
  )
}
