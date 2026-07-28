'use client'

import { Alert, Button, Checkbox, Input, Label, TextField } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormEvent, useState } from 'react'

import { createClient } from '@/lib/supabase/client'
import { isReservedAuthEmail } from '@/lib/wechat/identity'

import { authErrorKey } from './auth-error'
import PasswordField from './password-field'

const MIN_PASSWORD_LENGTH = 8

export default function SignupForm() {
  const t = useTranslations('Auth')
  const router = useRouter()

  const [errorKey, setErrorKey] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorKey(null)
    setMessage(null)

    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') ?? '')
    const password = String(form.get('password') ?? '')

    // 拦住内部保留域名：微信登录用 wx_<unionid>@wechat.invalid 作为身份映射，
    // 若允许自行注册，抢注即等于劫持对应的微信账号。
    if (isReservedAuthEmail(email)) {
      setErrorKey('error_reserved_email')
      return
    }

    setPending(true)

    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    setPending(false)

    if (error) {
      setErrorKey(authErrorKey(error))
      return
    }

    // 关闭邮箱确认时会直接返回 session，此时无需再等确认邮件
    if (data.session) {
      router.replace('/dashboard')
      router.refresh()
      return
    }

    setMessage(t('check_email'))
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={onSubmit}>
      {errorKey ? (
        <Alert status="danger" className="text-small">
          {t(errorKey)}
        </Alert>
      ) : null}
      {message ? (
        <Alert status="success" className="text-small">
          {message}
        </Alert>
      ) : null}

      <TextField isRequired className="w-full" name="email" type="email">
        <Label>{t('email')}</Label>
        <Input autoComplete="email" placeholder="you@company.com" />
      </TextField>

      <PasswordField
        autoComplete="new-password"
        label={t('password')}
        minLength={MIN_PASSWORD_LENGTH}
        toggleLabel={t('toggle_password_visibility')}
      />
      <p className="text-tiny text-default-500 px-1">
        {t('password_hint', { min: MIN_PASSWORD_LENGTH })}
      </p>

      <div className="px-1 py-2">
        <Checkbox isRequired name="terms">
          {t('accept_terms')}
        </Checkbox>
      </div>

      <Button
        className="w-full"
        isDisabled={pending}
        type="submit"
        variant="primary"
      >
        {pending ? t('signing_up') : t('sign_up')}
      </Button>
    </form>
  )
}
