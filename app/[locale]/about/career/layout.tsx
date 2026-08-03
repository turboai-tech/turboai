import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import JobPostingJsonLd from '@/components/seo/job-posting-json-ld'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('career')
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <JobPostingJsonLd />
      {children}
    </>
  )
}
