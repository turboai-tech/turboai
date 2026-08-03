import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Footer')
  return {
    title: t('legal'),
    description: t('value_description'),
  }
}

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
