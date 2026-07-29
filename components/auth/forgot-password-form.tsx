'use client'

import { Alert, Button, Input, Label, TextField } from '@heroui/react'
import { useTranslations } from 'next-intl'
import { FormEvent, useState } from 'react'

import { createClient } from '@/lib/supabase/client'

import { authErrorKey } from './auth-error'

export default function ForgotPasswordForm() {
  const t = useTranslations('Auth')
  const [errorKey, setErrorKey] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [pending, setPending] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorKey(null)
    setPending(true)

    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') ?? '')

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      // 邮件里的链接先经过 /auth/callback 核销 token 建立会话，
      // 再落到 /reset-password 让用户设置新密码。
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || window.location.origin}/auth/callback?next=/reset-password`,
    })

    setPending(false)

    // 只有限流这类「与账号是否存在无关」的错误才展示。
    // 其余一律显示成功 —— 若对不存在的邮箱报错，这个表单就成了账号枚举器。
    if (error && authErrorKey(error) === 'error_rate_limited') {
      setErrorKey('error_rate_limited')
      return
    }

    setSent(true)
  }

  if (sent) {
    return (
      <Alert status="success" className="text-sm">
        {t('reset_email_sent')}
      </Alert>
    )
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

      <Button
        className="mt-1 w-full"
        isDisabled={pending}
        type="submit"
        variant="primary"
      >
        {pending ? t('sending') : t('send_reset_link')}
      </Button>
    </form>
  )
}
