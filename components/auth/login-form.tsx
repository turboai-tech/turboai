'use client'

import { Alert, Button, Input, Label, TextField } from '@heroui/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormEvent, useState } from 'react'

import { createClient } from '@/lib/supabase/client'

import { authErrorKey, callbackErrorKey } from './auth-error'
import PasswordField from './password-field'
import RememberMe from './remember-me'

export default function LoginForm() {
  const t = useTranslations('Auth')
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? '/dashboard'

  const [errorKey, setErrorKey] = useState<string | null>(() =>
    callbackErrorKey(searchParams.get('error')),
  )
  const [pending, setPending] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorKey(null)
    setPending(true)

    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') ?? '')
    const password = String(form.get('password') ?? '')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setPending(false)
      setErrorKey(authErrorKey(error))
      return
    }

    // 成功后保持 pending：跳转完成前禁用按钮，避免重复提交
    router.replace(next)
    router.refresh()
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      {errorKey ? (
        <Alert status="danger" className="text-sm">
          {t(errorKey)}
        </Alert>
      ) : null}

      <TextField isRequired className="w-full" name="email" type="email">
        <Label>{t('email')}</Label>
        <Input
          autoComplete="email"
          className="border-default/50 border"
          placeholder="you@company.com"
        />
      </TextField>

      <PasswordField
        autoComplete="current-password"
        label={t('password')}
        toggleLabel={t('toggle_password_visibility')}
      />

      <div className="flex w-full items-center justify-between gap-3 pt-1">
        <RememberMe label={t('remember_me')} />
        <Link
          className="text-muted hover:text-accent text-sm transition-colors"
          href="/forgot-password"
        >
          {t('forgot_password')}
        </Link>
      </div>

      <Button
        className="mt-1 w-full"
        isDisabled={pending}
        type="submit"
        variant="primary"
      >
        {pending ? t('signing_in') : t('sign_in')}
      </Button>
    </form>
  )
}
