import { getTranslations } from 'next-intl/server'

import LeadForm from '@/components/lead/lead-form'

export default async function ContactPage() {
  const t = await getTranslations('Lead')

  return (
    <div className="w-full px-4 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-[560px]">
        <div className="border-default/40 bg-surface rounded-3xl border p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.12)] sm:p-8">
          <div className="mb-6 flex flex-col gap-1.5">
            <h1 className="text-foreground text-xl font-semibold tracking-tight">
              {t('title')}
            </h1>
            <p className="text-muted text-sm leading-relaxed">
              {t('description')}
            </p>
          </div>

          <LeadForm source="contact_page" />
        </div>
      </div>
    </div>
  )
}
