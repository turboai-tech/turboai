'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Cookies() {
  const [isVisible, setIsVisible] = useState(false)

  // localStorage 只在客户端存在，横幅的可见性必须挂载后才能确定。
  // Next 16 新增的 react-hooks/set-state-in-effect 对这个模式属误伤。
  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted')
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(!cookiesAccepted)
  }, [])

  const t = useTranslations('cookies')

  const handleAcceptAll = () => {
    setIsVisible(false)
    localStorage.setItem('cookiesAccepted', 'true')
  }

  const handleCookieSettings = () => {
    console.log('Cookie Settings clicked')
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
          {/* Inline accent styles so theme switches cannot be overridden by Button/CSS utilities. */}
          <button
            type="button"
            className="inline-flex h-9 cursor-pointer items-center justify-center rounded-full px-4 text-sm font-medium shadow-lg transition-transform active:scale-[0.97]"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--accent-foreground)',
              border: 'none',
              outline: 'none',
              boxShadow: '0 10px 15px -3px color-mix(in oklab, var(--accent) 35%, transparent)',
            }}
            onClick={handleAcceptAll}>
            {t('accept_all')}
          </button>
          <button
            type="button"
            className="inline-flex h-9 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent px-4 text-sm font-medium text-foreground transition-colors hover:bg-default/60 active:scale-[0.97]"
            onClick={handleCookieSettings}>
            {t('cookie_settings')}
          </button>
        </div>
      </div>
    </div>
  )
}
