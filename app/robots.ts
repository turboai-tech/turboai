import type { MetadataRoute } from 'next'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://www.iturboai.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard',
        '/zh-CN/dashboard',
        '/ja/dashboard',
        '/api/',
        '/auth/',
        '/login',
        '/signup',
        '/zh-CN/login',
        '/zh-CN/signup',
        '/ja/login',
        '/ja/signup',
        '/about/news',
        '/zh-CN/about/news',
        '/ja/about/news',
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
