'use client'

import SectionHeading from '@/components/section/section-heading'
import { useTranslations } from 'next-intl'

const milestones = ['1', '2', '3'] as const
const founders = ['1', '2', '3'] as const

export default function StoryPage() {
  const t = useTranslations('story')

  return (
    <div className="flex flex-col pb-24">
      <section className="relative flex flex-col gap-4 pb-12 pt-20">
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

      <section className="mb-12 rounded-lg border border-default/40 bg-default/20 p-6 sm:p-8">
        <h2 className="text-lg font-semibold tracking-tight">
          {t('definition_title')}
        </h2>
        <p className="mt-3 max-w-[720px] text-sm leading-7 text-muted">
          {t('definition_body')}
        </p>
      </section>

      <ol className="flex flex-col">
        {milestones.map((milestone) => (
          <li
            key={milestone}
            className="flex flex-col gap-2 border-t border-default/40 py-8 md:flex-row md:gap-12">
            <span className="label-mono shrink-0 pt-1 md:w-32">
              {t(`milestone_${milestone}_date`)}
            </span>
            <div className="flex max-w-[680px] flex-col gap-2">
              <h2 className="text-xl font-semibold tracking-tight">
                {t(`milestone_${milestone}_title`)}
              </h2>
              <p className="leading-7 text-muted">
                {t(`milestone_${milestone}_description`)}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-8 border-t border-default/40 pt-10">
        <h2 className="text-xl font-semibold tracking-tight">
          {t('founders_title')}
        </h2>
        <p className="mt-2 max-w-[680px] text-sm leading-7 text-muted">
          {t('founders_description')}
        </p>
        <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {founders.map((id) => (
            <li
              key={id}
              className="rounded-lg border border-default/40 bg-background p-5">
              <h3 className="font-semibold tracking-tight">
                {t(`founder_${id}_name`)}
              </h3>
              <p className="mt-1 text-sm text-accent">
                {t(`founder_${id}_role`)}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">
                {t(`founder_${id}_bio`)}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
