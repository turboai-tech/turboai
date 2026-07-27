'use client'

import ButtonLink from '@/components/button-link'
import { Button } from '@heroui/react'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function BannerComponent() {
  const t = useTranslations('Navbar')

  return (
    <div
      data-banner
      className="flex w-full flex-wrap items-center gap-x-3 gap-y-2 border-b border-default/40 bg-gradient-to-r from-default/40 via-[color-mix(in_oklab,var(--accent)_16%,transparent)] to-[color-mix(in_oklab,var(--accent)_10%,transparent)] px-4 py-2 sm:flex-nowrap sm:px-3.5 sm:before:flex-1">
      <span aria-label="rocket" className="hidden shrink-0 md:block" role="img">
        🚀
      </span>
      <p className="min-w-0 text-sm text-foreground">
        <Link className="text-inherit" href="/#pricing-container">
          {t('banner_title')}
        </Link>
      </p>
      <ButtonLink
        className="cta-border-gradient group relative h-9 shrink-0 overflow-hidden rounded-full bg-transparent text-sm font-normal text-foreground"
        href="/#pricing-container"
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
            const banner = document.querySelector('[data-banner]')
            if (banner) {
              banner.remove()
            }
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
