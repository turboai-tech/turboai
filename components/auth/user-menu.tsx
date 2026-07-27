'use client'

import { Dropdown, Label } from '@heroui/react'
import { Icon } from '@iconify/react'
import type { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import { createClient } from '@/lib/supabase/client'

export default function UserMenu() {
  const t = useTranslations('Auth')
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | undefined

    try {
      const supabase = createClient()

      supabase.auth.getUser().then(({ data }) => {
        setUser(data.user)
      })

      const result = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null)
      })
      subscription = result.data.subscription
    } catch {
      setUser(null)
    }

    return () => subscription?.unsubscribe()
  }, [])

  if (!user) {
    return null
  }

  const label =
    user.user_metadata?.full_name ||
    user.email?.split('@')[0] ||
    t('account')

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    router.replace('/')
    router.refresh()
  }

  return (
    <Dropdown>
      {/* Trigger is already a button — keep children non-interactive */}
      <Dropdown.Trigger
        aria-label={t('account')}
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full p-0"
        variant="ghost">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-default/40 text-sm font-medium leading-none">
          {String(label).slice(0, 1).toUpperCase()}
        </span>
      </Dropdown.Trigger>
      <Dropdown.Popover className="min-w-48" placement="bottom end">
        <Dropdown.Menu
          aria-label={t('account')}
          onAction={(key) => {
            if (key === 'dashboard') router.push('/dashboard')
            if (key === 'signout') void signOut()
          }}>
          <Dropdown.Item
            id="email"
            className="pointer-events-none opacity-70"
            textValue={user.email ?? ''}>
            <Label className="truncate text-xs">{user.email}</Label>
          </Dropdown.Item>
          <Dropdown.Item id="dashboard" textValue={t('dashboard')}>
            <Icon icon="lucide:layout-dashboard" width={16} />
            <Label>{t('dashboard')}</Label>
          </Dropdown.Item>
          <Dropdown.Item id="signout" textValue={t('sign_out')} variant="danger">
            <Icon icon="lucide:log-out" width={16} />
            <Label>{t('sign_out')}</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
