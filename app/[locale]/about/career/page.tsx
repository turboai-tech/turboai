'use client'

import ButtonLink from '@/components/button-link'
import SectionHeading from '@/components/section/section-heading'
import { FireIcon } from '@heroicons/react/24/solid'
import { Accordion } from '@heroui/react'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'

const ROLE_IDS = ['fde', 'ai_engineer', 'ai_infra'] as const

type RoleContent = {
  title: string
  department: string
  hot: boolean
  description: string
  responsibilities: string[]
  requirements: string[]
  nice: string[]
  closing: string
}

export default function CareerPage() {
  const t = useTranslations('career')

  const roles = ROLE_IDS.map((id) => {
    const role = t.raw(`roles.${id}`) as RoleContent
    return { id, ...role }
  }).sort((a, b) => Number(b.hot) - Number(a.hot))

  return (
    <div className="relative flex flex-col gap-10 pb-24 pt-20">
      <div
        aria-hidden
        className="bg-grid mask-fade-out pointer-events-none absolute inset-x-[-50vw] top-[-80px] h-[420px] select-none"
      />

      <div className="relative flex flex-col gap-6">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />
        <ButtonLink
          className="h-11 w-fit rounded-full cta-gradient px-6 text-sm font-medium shadow-lg"
          href="mailto:careers@iturboai.com?subject=Application%20to%20Turbo%20AI">
          {t('apply_cta')}
          <Icon icon="solar:arrow-right-linear" width={16} />
        </ButtonLink>
      </div>

      <Accordion className="relative mx-auto w-full max-w-2xl" variant="surface">
        {roles.map((job) => (
          <Accordion.Item key={job.id} aria-label={job.title} id={job.id}>
            <Accordion.Heading>
              <Accordion.Trigger className="flex flex-col items-start gap-1 py-4 text-left">
                <div className="flex items-center">
                  <span className="text-foreground">{job.title}</span>
                  {job.hot && (
                    <FireIcon
                      className="ml-2 h-5 w-5 text-danger"
                      title={t('hot')}
                    />
                  )}
                </div>
                <div className="flex items-center gap-x-4 text-sm text-muted">
                  <span>{job.department}</span>
                  <span>
                    {t('location_shanghai')} | {t('type_full_time')}
                  </span>
                </div>
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>
                <div className="flex flex-col gap-6 text-muted">
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-foreground">
                      {t('section_overview')}
                    </h3>
                    <p>{job.description}</p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-foreground">
                      {t('section_responsibilities')}
                    </h3>
                    <ul className="list-disc space-y-1 pl-5">
                      {job.responsibilities.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-foreground">
                      {t('section_requirements')}
                    </h3>
                    <ul className="list-disc space-y-1 pl-5">
                      {job.requirements.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-foreground">
                      {t('section_nice')}
                    </h3>
                    <ul className="list-disc space-y-1 pl-5">
                      {job.nice.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="whitespace-pre-line">{job.closing}</p>
                  <ButtonLink
                    className="h-10 w-fit rounded-full px-5 text-sm font-medium"
                    href={`mailto:careers@iturboai.com?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
                    variant="outline">
                    {t('apply_role_cta')}
                  </ButtonLink>
                </div>
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}
