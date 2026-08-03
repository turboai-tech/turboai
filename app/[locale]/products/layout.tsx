import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import ProductsJsonLd from '@/components/seo/products-json-ld'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('products')
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ProductsJsonLd />
      {children}
    </>
  )
}
