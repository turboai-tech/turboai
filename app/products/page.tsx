'use client'

import ButtonLink from '@/components/button-link'
import SectionHeading from '@/components/section/section-heading'
import { Chip } from '@heroui/react'
import { Icon } from '@iconify/react'
import { useLocale, useTranslations } from 'next-intl'

const products = [
  {
    key: 'ignition',
    icon: 'lucide:sparkles',
    status: 'live',
    href: 'external' as const,
  },
  { key: 'chat', icon: 'lucide:messages-square', status: 'live' },
  { key: 'label', icon: 'lucide:tags', status: 'live' },
  { key: 'voice', icon: 'lucide:audio-lines', status: 'beta' },
  { key: 'reel', icon: 'lucide:clapperboard', status: 'beta' },
] as const

function ignitionUrl(locale: string) {
  if (locale.startsWith('zh')) return 'https://ignition.iturboai.com/zh'
  return 'https://ignition.iturboai.com/en'
}

export default function ProductsPage() {
  const t = useTranslations('products')
  const locale = useLocale()

  return (
    <div className="flex flex-col">
      <section className="relative flex flex-col gap-4 pb-8 pt-20">
        <div
          aria-hidden
          className="bg-grid mask-fade-out pointer-events-none absolute inset-x-[-50vw] top-[-80px] h-[420px] select-none"
        />
        <div className="relative">
          <SectionHeading
            eyebrow={t('eyebrow')}
            title={t('title')}
            description={t('description')}
          />
        </div>
      </section>

      <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-default/40 bg-default/50 md:grid-cols-2">
        {products.map((product) => {
          const { key, icon, status } = product
          const href =
            'href' in product && product.href === 'external'
              ? ignitionUrl(locale)
              : undefined

          const body = (
            <>
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-md border border-default/40 text-muted transition-colors group-hover:border-accent group-hover:text-accent">
                  <Icon icon={icon} width={20} />
                </span>
                <Chip
                  color={status === 'live' ? 'success' : 'default'}
                  size="sm"
                  variant="soft">
                  {t(status === 'live' ? 'status_live' : 'status_beta')}
                </Chip>
              </div>
              <h3 className="text-xl font-semibold tracking-tight">
                {t(`item_${key}_title`)}
              </h3>
              <p className="text-sm leading-6 text-muted">
                {t(`item_${key}_description`)}
              </p>
              {href ? (
                <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  {t('visit_product')}
                  <Icon
                    className="transition-transform group-hover:translate-x-0.5"
                    icon="solar:arrow-right-linear"
                    width={14}
                  />
                </span>
              ) : null}
            </>
          )

          return (
            <li key={key} className="bg-background">
              {href ? (
                <a
                  className="group flex h-full flex-col gap-3 p-7 no-underline transition-colors hover:bg-default/30"
                  href={href}
                  rel="noopener noreferrer"
                  target="_blank">
                  {body}
                </a>
              ) : (
                <div className="group flex h-full flex-col gap-3 p-7 transition-colors hover:bg-default/30">
                  {body}
                </div>
              )}
            </li>
          )
        })}
      </ul>

      <section className="bg-grid relative my-20 flex flex-col items-start gap-4 overflow-hidden rounded-lg border border-default/40 p-8 sm:flex-row sm:items-center sm:justify-between">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40"
        />
        <div className="relative flex flex-col gap-1">
          <h2 className="text-xl font-semibold tracking-tight">
            {t('cta_title')}
          </h2>
          <p className="max-w-[520px] text-sm text-muted">
            {t('cta_description')}
          </p>
        </div>
        <ButtonLink
          className="relative h-11 shrink-0 rounded-full cta-gradient px-6 text-sm font-medium shadow-lg"
          href="/#pricing-container">
          {t('cta_button')}
          <Icon icon="solar:arrow-right-linear" width={16} />
        </ButtonLink>
      </section>
    </div>
  )
}
