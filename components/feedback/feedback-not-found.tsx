'use client'

import ButtonLink from '@/components/button-link'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'

export default function FeedbackNotFound() {
  const t = useTranslations('NotFound')

  return (
    <div className="mt-4 flex w-full max-w-sm flex-col items-center gap-3 rounded-lg border border-default/40 bg-surface p-6 text-center">
      <p className="text-sm text-muted">{t('feedback_cta')}</p>
      <ButtonLink
        className="h-10 rounded-full cta-gradient px-5 text-sm font-medium"
        href="/contact">
        {t('contact_us')}
        <Icon icon="solar:arrow-right-linear" width={16} />
      </ButtonLink>
    </div>
  )
}
