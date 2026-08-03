import { getLocale } from 'next-intl/server'

import JsonLd from '@/components/seo/json-ld'
import { SITE_NAME, absoluteUrl } from '@/lib/site'
import { routing } from '@/i18n/routing'

export default async function WebsiteJsonLd() {
  const locale = await getLocale()

  return (
    <JsonLd
      id="website-json-ld"
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        alternateName: ['TurboAI', 'Turbo.ai'],
        url: absoluteUrl('', locale),
        inLanguage: [...routing.locales],
      }}
    />
  )
}
