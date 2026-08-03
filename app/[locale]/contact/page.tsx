import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { Suspense } from 'react'

import LeadForm from '@/components/lead/lead-form'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Lead')
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function ContactPage() {
  const t = await getTranslations('Lead')

  return (
    <div className="relative w-full px-4 py-12 sm:py-16">
      <div
        aria-hidden
        className="bg-grid mask-fade-out pointer-events-none absolute inset-x-[-50vw] top-[-80px] h-[420px] select-none"
      />
      <div className="relative mx-auto w-full max-w-[560px]">
        <div className="rounded-lg border border-default/40 bg-surface/90 p-7 shadow-sm backdrop-blur-sm sm:p-8">
          <div className="mb-6 flex flex-col gap-1.5">
            <p className="label-mono text-xs tracking-[0.16em] text-muted uppercase">
              {t('eyebrow')}
            </p>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              {t('title')}
            </h1>
            <p className="text-sm leading-relaxed text-muted">
              {t('description')}
            </p>
          </div>

          <Suspense fallback={null}>
            <LeadForm source="contact_page" />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
