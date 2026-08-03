'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { useEffect, useState } from 'react'

const COOKIES_KEY = 'cookiesAccepted'

export default function Cookies() {
  const [isVisible, setIsVisible] = useState(false)

  // localStorage 只在客户端存在，横幅的可见性必须挂载后才能确定。
  // Next 16 新增的 react-hooks/set-state-in-effect 对这个模式属误伤。
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(!localStorage.getItem(COOKIES_KEY))
  }, [])

  const t = useTranslations('cookies')

  const dismiss = (value: string) => {
    setIsVisible(false)
    localStorage.setItem(COOKIES_KEY, value)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-6 pb-6">
      <div className="pointer-events-auto mx-auto max-w-xl rounded-lg border border-default/40 bg-background/80 px-6 py-4 shadow-sm backdrop-blur">
        <p className="text-sm font-normal text-foreground">
          {t('intro_text')}&nbsp;
          <b className="font-semibold">&quot;{t('accept_all')}&quot;</b>
          {t('consent_text')}&nbsp;
          <span className="font-semibold text-accent">
            &quot;{t('cookie_settings')}&quot;
          </span>
          {t('controlled_consent_text')}&nbsp;
          <Link
            className="text-sm text-accent underline-offset-2 hover:underline"
            href="/legal/privacy">
            {t('cookie_policy')}
          </Link>
          {t('sentense_end_symbol')}
        </p>
        <div className="mt-4 flex items-center gap-x-2">
          {/* Use div+role to avoid global `button { border-* }` theme rules. */}
          <div
            role="button"
            tabIndex={0}
            className="inline-flex h-9 cursor-pointer items-center justify-center rounded-full px-4 text-sm font-medium shadow-lg transition-transform select-none active:scale-[0.97]"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--accent-foreground)',
              border: '0 solid transparent',
              outline: 'none',
              boxShadow:
                '0 10px 15px -3px color-mix(in oklab, var(--accent) 35%, transparent)',
            }}
            onClick={() => dismiss('all')}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                dismiss('all')
              }
            }}>
            {t('accept_all')}
          </div>
          <div
            role="button"
            tabIndex={0}
            className="inline-flex h-9 cursor-pointer items-center justify-center rounded-full px-4 text-sm font-medium text-foreground transition-colors select-none hover:bg-default/60 active:scale-[0.97]"
            onClick={() => dismiss('essential')}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                dismiss('essential')
              }
            }}>
            {t('cookie_settings')}
          </div>
        </div>
      </div>
    </div>
  )
}
