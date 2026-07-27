import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Suspense } from 'react'

import LoginForm from '@/components/auth/login-form'

export default async function LoginPage() {
  const t = await getTranslations('Auth')

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col items-center justify-center gap-8 px-4 py-16">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t('sign_in_title')}
        </h1>
        <p className="mt-2 text-sm text-muted">{t('sign_in_description')}</p>
      </div>
      <Suspense
        fallback={
          <div className="h-40 w-full max-w-sm animate-pulse rounded-lg bg-default/40" />
        }>
        <LoginForm />
      </Suspense>
      <Link className="text-sm text-muted hover:text-foreground" href="/">
        {t('back_home')}
      </Link>
    </div>
  )
}
