'use client'

import ButtonLink from '@/components/button-link'
import { Button } from '@heroui/react'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { useEffect, useState } from 'react'

const BANNER_DISMISSED_KEY = 'turboai.banner.dismissed'

export default function BannerComponent() {
  const t = useTranslations('Navbar')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(localStorage.getItem(BANNER_DISMISSED_KEY) !== '1')
  }, [])

  if (!visible) return null

  return (
    <div
      data-banner
      className="flex w-full flex-wrap items-center gap-x-3 gap-y-2 border-b border-default/40 bg-linear-to-r from-default/40 via-[color-mix(in_oklab,var(--accent)_16%,transparent)] to-[color-mix(in_oklab,var(--accent)_10%,transparent)] px-4 py-2 sm:flex-nowrap sm:px-3.5 sm:before:flex-1">
      <p className="min-w-0 text-sm text-foreground">
        <Link className="text-inherit" href="/contact">
          {t('banner_title')}
        </Link>
      </p>
      <ButtonLink
        className="cta-border-gradient group relative h-9 shrink-0 overflow-hidden rounded-full bg-transparent text-sm font-normal text-foreground"
        href="/contact"
        variant="outline">
        {t('banner_button')}
        <Icon
          className="flex-none outline-none transition-transform group-hover:translate-x-0.5 [&>path]:stroke-[2]"
          icon="solar:arrow-right-linear"
          width={16}
        />
      </ButtonLink>
      <div className="flex flex-1 justify-end">
        <Button
          isIconOnly
          aria-label="Close Banner"
          className="-m-1"
          size="sm"
          variant="ghost"
          onPress={() => {
            localStorage.setItem(BANNER_DISMISSED_KEY, '1')
            setVisible(false)
          }}>
          <Icon
            aria-hidden="true"
            className="text-muted"
            icon="lucide:x"
            width={20}
          />
        </Button>
      </div>
    </div>
  )
}
