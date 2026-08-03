import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { Providers } from '@/app/providers'
import Cookies from '@/components/layout/cookies'
import WebsiteJsonLd from '@/components/seo/website-json-ld'
import { siteConfig } from '@/config/site'
import { routing } from '@/i18n/routing'

import RootLayoutClient from './layout-client'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://www.iturboai.com'

const ogLocale: Record<string, string> = {
  en: 'en_US',
  'zh-CN': 'zh_CN',
  ja: 'ja_JP',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const languages = Object.fromEntries(
    routing.locales.map((item) => [
      item,
      item === routing.defaultLocale ? siteUrl : `${siteUrl}/${item}`,
    ]),
  )

  return {
    alternates: {
      canonical:
        locale === routing.defaultLocale ? siteUrl : `${siteUrl}/${locale}`,
      languages: {
        ...languages,
        'x-default': siteUrl,
      },
    },
    openGraph: {
      locale: ogLocale[locale] ?? 'en_US',
      url: locale === routing.defaultLocale ? siteUrl : `${siteUrl}/${locale}`,
      siteName: siteConfig.name,
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <WebsiteJsonLd />
      <Providers
        themeProps={{
          attribute: 'class',
          defaultTheme: 'system',
          enableSystem: true,
          disableTransitionOnChange: true,
        }}>
        <RootLayoutClient locale={locale}>{children}</RootLayoutClient>
        <Cookies />
      </Providers>
    </NextIntlClientProvider>
  )
}
