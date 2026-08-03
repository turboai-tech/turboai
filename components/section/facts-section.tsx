import { getTranslations } from 'next-intl/server'

import SectionHeading from './section-heading'

const facts = ['1', '2', '3', '4', '5', '6'] as const

/** Citeable, GEO-friendly fact blocks for AI answer engines and search. */
export default async function FactsSection() {
  const t = await getTranslations('facts')

  return (
    <section
      id="facts-container"
      className="mx-auto flex w-full flex-col gap-10 py-16 sm:py-20">
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
      />
      <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-default/40 bg-default/50 md:grid-cols-2">
        {facts.map((id) => (
          <div key={id} className="flex flex-col gap-2 bg-background p-6">
            <dt className="text-base font-semibold tracking-tight text-foreground">
              {t(`item_${id}_question`)}
            </dt>
            <dd className="text-sm leading-6 text-muted">
              {t(`item_${id}_answer`)}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
