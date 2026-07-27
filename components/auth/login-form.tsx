'use client'

import { Button, Input, Label, TextField } from '@heroui/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { useTranslations } from 'next-intl'

import { createClient } from '@/lib/supabase/client'

export default function LoginForm() {
  const t = useTranslations('Auth')
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? '/dashboard'

  const [error, setError] = useState<string | null>(
    searchParams.get('error') ? t('error_callback') : null,
  )
  const [pending, setPending] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setPending(true)

    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') ?? '')
    const password = String(form.get('password') ?? '')

    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setPending(false)

    if (signInError) {
      setError(signInError.message)
      return
    }

    router.replace(next)
    router.refresh()
  }

  return (
    <form className="flex w-full max-w-sm flex-col gap-4" onSubmit={onSubmit}>
      <TextField isRequired name="email" type="email">
        <Label>{t('email')}</Label>
        <Input autoComplete="email" placeholder="you@company.com" />
      </TextField>
      <TextField isRequired name="password" type="password">
        <Label>{t('password')}</Label>
        <Input autoComplete="current-password" />
      </TextField>

      {error ? <p className="text-sm text-danger">{error}</p> : null}

      <Button isDisabled={pending} type="submit" variant="primary">
        {pending ? t('signing_in') : t('sign_in')}
      </Button>

      <p className="text-center text-sm text-muted">
        {t('no_account')}{' '}
        <Link className="text-accent underline-offset-2 hover:underline" href="/signup">
          {t('sign_up')}
        </Link>
      </p>
    </form>
  )
}
