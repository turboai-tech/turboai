import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import Faq from '@/components/layout/faq'
import PricingComponent from '@/components/pricing/pricing'
import CollaborationsComponent from '@/components/scrolling/collaborations'
import AppMainSections from '@/components/section/app-main-section'
import BuildSection from '@/components/section/build-section'
import FactsSection from '@/components/section/facts-section'
import ProcessSection from '@/components/section/process-section'
import FaqJsonLd from '@/components/seo/faq-json-ld'
import Sitemap from '@/components/sitemap/sitemap'
import TeamMemberComponent from '@/components/team/team-member'
import { SITE_NAME } from '@/lib/site'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('HomeMeta')
  return {
    title: {
      absolute: `${SITE_NAME}: ${t('title')}`,
    },
    description: t('description'),
    keywords: t('keywords')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <FaqJsonLd />
      <AppMainSections />
      <FactsSection />
      <BuildSection />
      <CollaborationsComponent />
      <ProcessSection />
      <PricingComponent />
      <TeamMemberComponent />
      <Faq />
      <Sitemap />
    </>
  )
}
