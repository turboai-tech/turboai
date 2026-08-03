import type { MetadataRoute } from 'next'

import { routing } from '@/i18n/routing'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://www.iturboai.com'

const routes = [
  '',
  '/solutions',
  '/products',
  '/contact',
  '/about/story',
  '/about/career',
  // /about/news is intentionally omitted while the page remains a thin placeholder.
  '/legal/privacy',
  '/legal/terms',
  '/legal/claim',
  '/legal/user-agreement',
] as const

function localePath(locale: string, route: string) {
  if (locale === routing.defaultLocale) {
    return `${siteUrl}${route}`
  }
  return `${siteUrl}/${locale}${route}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return routing.locales.flatMap((locale) =>
    routes.map((route) => {
      const languages = Object.fromEntries(
        routing.locales.map((item) => [item, localePath(item, route)]),
      )

      return {
        url: localePath(locale, route),
        lastModified,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : route.startsWith('/legal') ? 0.3 : 0.7,
        alternates: {
          languages: {
            ...languages,
            'x-default': localePath(routing.defaultLocale, route),
          },
        },
      }
    }),
  )
}
