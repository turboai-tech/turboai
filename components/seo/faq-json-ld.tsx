import { getTranslations } from 'next-intl/server'

import faqs from '@/components/layout/faqs'
import JsonLd from '@/components/seo/json-ld'

export default async function FaqJsonLd() {
  const t = await getTranslations('Faq')

  return (
    <JsonLd
      id="faq-json-ld"
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((item) => ({
          '@type': 'Question',
          name: t(item.title),
          acceptedAnswer: {
            '@type': 'Answer',
            text: t(item.content),
          },
        })),
      }}
    />
  )
}
