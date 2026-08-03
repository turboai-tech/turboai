import { ArrowUpRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { BuyerXLogo } from '@/components/icons'
import SectionHeading from '@/components/section/section-heading'
import { Link } from '@/i18n/navigation'

export default async function CustomersComponent() {
  const t = await getTranslations('customers')

  return (
    <section
      id="customers-container"
      className="mx-auto flex w-full flex-col gap-10 px-0">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
      />

      <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-default/40 bg-default/50 md:grid-cols-2">
        <li className="bg-background p-7">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <a
                href="https://buyerx.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 no-underline">
                <BuyerXLogo height={36} />
                <span className="text-sm font-medium text-foreground">
                  {t('buyerx')}
                </span>
              </a>
              <span className="text-xs text-muted">{t('buyerx_location')}</span>
            </div>
            <p className="text-sm leading-6 text-muted">{t('buyerx_note')}</p>
            <a
              href="https://buyerx.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent no-underline">
              {t('buyerx_cta')}
              <ArrowUpRight size={14} />
            </a>
          </div>
        </li>

        <li className="bg-background p-7">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-foreground">
                {t('ignition')}
              </span>
              <span className="rounded-full border border-default/40 px-2 py-0.5 text-xs text-muted">
                {t('ignition_badge')}
              </span>
            </div>
            <p className="text-sm leading-6 text-muted">{t('ignition_note')}</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent no-underline">
              {t('ignition_cta')}
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </li>
      </ul>
    </section>
  )
}
