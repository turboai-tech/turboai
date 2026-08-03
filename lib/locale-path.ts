import { locales } from '@/i18n/config'

/** Strip a leading locale segment so auth checks work with `/zh-CN/dashboard`. */
export function stripLocalePrefix(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return '/'
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1)
    }
  }
  return pathname
}
