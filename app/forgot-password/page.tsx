import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

import AuthCard from '@/components/auth/auth-card'
import ForgotPasswordForm from '@/components/auth/forgot-password-form'

export default async function ForgotPasswordPage() {
  const t = await getTranslations('Auth')

  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center">
      <AuthCard
        description={t('forgot_password_description')}
        title={t('forgot_password_title')}
        footer={
          <Link className="hover:underline" href="/login">
            {t('back_to_sign_in')}
          </Link>
        }
      >
        <ForgotPasswordForm />
      </AuthCard>
    </div>
  )
}
