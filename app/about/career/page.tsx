'use client'

import { FireIcon } from '@heroicons/react/24/solid'
import { Accordion } from '@heroui/react'
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
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-2xl font-bold md:text-3xl">{t('title')}</h1>
          <p className="mx-auto max-w-2xl text-base text-muted">
            {t('description')}
          </p>
        </div>

        <Accordion className="mx-auto max-w-2xl" variant="surface">
          {roles.map((job) => (
            <Accordion.Item
              key={job.id}
              aria-label={job.title}
              id={job.id}>
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
                  </div>
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
