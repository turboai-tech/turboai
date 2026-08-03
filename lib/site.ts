import { routing } from '@/i18n/routing'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://www.iturboai.com'

export const SITE_NAME = 'Turbo AI'
export const SITE_LEGAL_NAME = 'Turbo AI Technology (Shanghai) Co., Ltd.'
export const SITE_EMAIL = 'contact@iturboai.com'
export const CAREERS_EMAIL = 'careers@iturboai.com'

export function absoluteUrl(path = '', locale?: string) {
  const normalised = path.startsWith('/') ? path : path ? `/${path}` : ''
  if (!locale || locale === routing.defaultLocale) {
    return `${SITE_URL}${normalised}`
  }
  return `${SITE_URL}/${locale}${normalised}`
}
