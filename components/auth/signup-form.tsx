'use client'

import { Button, Input, Label, TextField } from '@heroui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { useTranslations } from 'next-intl'

import { createClient } from '@/lib/supabase/client'

export default function SignupForm() {
  const t = useTranslations('Auth')
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setMessage(null)
    setPending(true)

    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') ?? '')
    const password = String(form.get('password') ?? '')

    const supabase = createClient()
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    setPending(false)

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    if (data.session) {
      router.replace('/dashboard')
      router.refresh()
      return
    }

    setMessage(t('check_email'))
  }

  return (
    <form className="flex w-full max-w-sm flex-col gap-4" onSubmit={onSubmit}>
      <TextField isRequired name="email" type="email">
        <Label>{t('email')}</Label>
        <Input autoComplete="email" placeholder="you@company.com" />
      </TextField>
      <TextField isRequired minLength={8} name="password" type="password">
        <Label>{t('password')}</Label>
        <Input autoComplete="new-password" />
      </TextField>

      {error ? <p className="text-sm text-danger">{error}</p> : null}
      {message ? <p className="text-sm text-accent">{message}</p> : null}

      <Button isDisabled={pending} type="submit" variant="primary">
        {pending ? t('signing_up') : t('sign_up')}
      </Button>

      <p className="text-center text-sm text-muted">
        {t('have_account')}{' '}
        <Link className="text-accent underline-offset-2 hover:underline" href="/login">
          {t('sign_in')}
        </Link>
      </p>
    </form>
  )
}
