'use client'

import { Alert, Button } from '@heroui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { FormEvent, useState } from 'react'

import { createClient } from '@/lib/supabase/client'

import { authErrorKey } from './auth-error'
import PasswordField from './password-field'

const MIN_PASSWORD_LENGTH = 8

/**
 * `hasSession` 由服务端页面判定后传入：用户是带着重置链接建立的会话到这里的，
 * 没有会话说明链接已过期或被直接访问。
 */
export default function ResetPasswordForm({
  hasSession,
}: {
  hasSession: boolean
}) {
  const t = useTranslations('Auth')
  const router = useRouter()
  const [errorKey, setErrorKey] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  if (!hasSession) {
    return (
      <div className="flex flex-col gap-3">
        <Alert status="danger" className="text-sm">
          {t('reset_link_invalid')}
        </Alert>
        <Link
          className="text-muted hover:text-accent text-center text-sm transition-colors"
          href="/forgot-password"
        >
          {t('send_reset_link')}
        </Link>
      </div>
    )
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorKey(null)

    const form = new FormData(event.currentTarget)
    const password = String(form.get('password') ?? '')
    const confirm = String(form.get('confirm_password') ?? '')

    if (password !== confirm) {
      setErrorKey('error_password_mismatch')
      return
    }

    setPending(true)

    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setPending(false)
      setErrorKey(authErrorKey(error))
      return
    }

    // 密码已改，会话仍然有效，直接进控制台
    router.replace('/dashboard')
    router.refresh()
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      {errorKey ? (
        <Alert status="danger" className="text-sm">
          {t(errorKey)}
        </Alert>
      ) : null}

      <PasswordField
        autoComplete="new-password"
        label={t('new_password')}
        minLength={MIN_PASSWORD_LENGTH}
        toggleLabel={t('toggle_password_visibility')}
      />
      <PasswordField
        autoComplete="new-password"
        label={t('confirm_password')}
        minLength={MIN_PASSWORD_LENGTH}
        name="confirm_password"
        toggleLabel={t('toggle_password_visibility')}
      />
      <p className="text-muted px-1 text-xs">
        {t('password_hint', { min: MIN_PASSWORD_LENGTH })}
      </p>

      <Button
        className="mt-1 w-full"
        isDisabled={pending}
        type="submit"
        variant="primary"
      >
        {pending ? t('saving') : t('update_password')}
      </Button>
    </form>
  )
}
