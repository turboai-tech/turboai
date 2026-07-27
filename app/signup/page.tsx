import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

import SignupForm from '@/components/auth/signup-form'

export default async function SignupPage() {
  const t = await getTranslations('Auth')

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col items-center justify-center gap-8 px-4 py-16">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t('sign_up_title')}
        </h1>
        <p className="mt-2 text-sm text-muted">{t('sign_up_description')}</p>
      </div>
      <SignupForm />
      <Link className="text-sm text-muted hover:text-foreground" href="/">
        {t('back_home')}
      </Link>
    </div>
  )
}
