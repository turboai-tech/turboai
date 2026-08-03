import { CheckCircle2 } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import BuildSection from '@/components/section/build-section'
import ProcessSection from '@/components/section/process-section'
import SectionHeading from '@/components/section/section-heading'

const outcomes = ['1', '2', '3'] as const

type Props = {
  params: Promise<{ locale: string }>
}

export default async function SolutionsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('solutions')

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

      <BuildSection showHeading={false} />

      <section className="flex flex-col gap-8 py-20">
        <h2 className="text-[clamp(24px,5vw,28px)] font-bold tracking-tighter sm:text-[32px]">
          {t('outcomes_title')}
        </h2>
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {outcomes.map((outcome) => (
            <li
              key={outcome}
              className="flex flex-col gap-2 border-t border-default/40 pt-5">
              <CheckCircle2 className="text-accent" size={22} />
              <h3 className="text-large font-semibold tracking-tight">
                {t(`outcome_${outcome}_title`)}
              </h3>
              <p className="text-sm leading-6 text-muted">
                {t(`outcome_${outcome}_description`)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <ProcessSection />
    </div>
  )
}
