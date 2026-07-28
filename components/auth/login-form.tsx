'use client'

import { Alert, Button, Checkbox, Input, Label, TextField } from '@heroui/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormEvent, useState } from 'react'

import { createClient } from '@/lib/supabase/client'

import { authErrorKey, callbackErrorKey } from './auth-error'
import PasswordField from './password-field'

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
    <form className="flex flex-col gap-3" onSubmit={onSubmit}>
      {errorKey ? (
        <Alert status="danger" className="text-small">
          {t(errorKey)}
        </Alert>
      ) : null}

      <TextField isRequired className="w-full" name="email" type="email">
        <Label>{t('email')}</Label>
        <Input autoComplete="email" placeholder="you@company.com" />
      </TextField>

      <PasswordField
        autoComplete="current-password"
        label={t('password')}
        toggleLabel={t('toggle_password_visibility')}
      />

      <div className="flex w-full items-center justify-between px-1 py-2">
        <Checkbox name="remember">
          {t('remember_me')}
        </Checkbox>
        <Link
          className="text-small text-default-500 hover:underline"
          href="/forgot-password"
        >
          {t('forgot_password')}
        </Link>
      </div>

      <Button
        className="w-full"
        isDisabled={pending}
        type="submit"
        variant="primary"
      >
        {pending ? t('signing_in') : t('sign_in')}
      </Button>
    </form>
  )
}
