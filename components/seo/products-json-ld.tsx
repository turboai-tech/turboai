import { getLocale, getTranslations } from 'next-intl/server'

import JsonLd from '@/components/seo/json-ld'
import { SITE_NAME, absoluteUrl } from '@/lib/site'

const products = [
  { key: 'ignition', url: 'https://ignition.iturboai.com', applicationCategory: 'BusinessApplication' },
  { key: 'chat', applicationCategory: 'BusinessApplication' },
  { key: 'label', applicationCategory: 'BusinessApplication' },
  { key: 'voice', applicationCategory: 'MultimediaApplication' },
  { key: 'reel', applicationCategory: 'MultimediaApplication' },
] as const

export default async function ProductsJsonLd() {
  const t = await getTranslations('products')
  const locale = await getLocale()

  return (
    <JsonLd
      id="products-json-ld"
      data={products.map((product) => ({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: t(`item_${product.key}_title`),
        description: t(`item_${product.key}_description`),
        applicationCategory: product.applicationCategory,
        operatingSystem: 'Web',
        url:
          'url' in product && product.url
            ? product.url
            : absoluteUrl(`/products`, locale),
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          price: '0',
          priceCurrency: 'USD',
          description: t('talk_to_us'),
        },
        author: SITE_NAME,
      }))}
    />
  )
}
