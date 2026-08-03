'use server'

import { cookies } from 'next/headers'

import { defaultLocale, type Locale, locales } from '@/i18n/config'

/**
 * Legacy cookie helpers. Locale is now primarily driven by the URL segment
 * via next-intl routing; the cookie remains a soft preference for first visits.
 */
const COOKIE_NAME = 'NEXT_LOCALE'

export async function getUserLocale(): Promise<Locale> {
  const value = (await cookies()).get(COOKIE_NAME)?.value
  if (value && (locales as readonly string[]).includes(value)) {
    return value as Locale
  }
  return defaultLocale
}

export async function setUserLocale(locale: Locale) {
  ;(await cookies()).set(COOKIE_NAME, locale)
}
