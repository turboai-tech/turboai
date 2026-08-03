import { getTranslations } from 'next-intl/server'

import JsonLd from '@/components/seo/json-ld'
import {
  CAREERS_EMAIL,
  SITE_LEGAL_NAME,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from '@/lib/site'

const ROLE_IDS = ['fde', 'ai_engineer', 'ai_infra'] as const

type RoleContent = {
  title: string
  description: string
  responsibilities: string[]
  requirements: string[]
}

export default async function JobPostingJsonLd() {
  const t = await getTranslations('career')
  const datePosted = '2026-01-01'

  const jobs = ROLE_IDS.map((id) => {
    const role = t.raw(`roles.${id}`) as RoleContent
    const description = [
      role.description,
      '',
      t('section_responsibilities'),
      ...role.responsibilities.map((item) => `• ${item}`),
      '',
      t('section_requirements'),
      ...role.requirements.map((item) => `• ${item}`),
    ].join('\n')

    return {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: role.title,
      description,
      datePosted,
      validThrough: '2026-12-31',
      employmentType: 'FULL_TIME',
      hiringOrganization: {
        '@type': 'Organization',
        name: SITE_LEGAL_NAME,
        sameAs: SITE_URL,
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Shanghai',
          addressCountry: 'CN',
        },
      },
      applicantLocationRequirements: {
        '@type': 'Country',
        name: 'CN',
      },
      directApply: true,
      url: absoluteUrl('/about/career'),
      applicationContact: {
        '@type': 'ContactPoint',
        email: CAREERS_EMAIL,
        contactType: 'HR',
        name: SITE_NAME,
      },
    }
  })

  return <JsonLd id="job-posting-json-ld" data={jobs} />
}
