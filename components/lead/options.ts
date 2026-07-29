/**
 * 留资表单的选项集。
 *
 * 值是稳定的代号，展示文案走 i18n —— 存进库的是代号，改文案不会让历史数据
 * 对不上。
 */

export const COUNTRY_VALUES = [
  'cn',
  'jp',
  'sg',
  'us',
  'gb',
  'de',
  'au',
  'kr',
  'other',
] as const

/** International dialling codes shown beside the phone field. */
export const COUNTRY_DIAL_CODES: Record<(typeof COUNTRY_VALUES)[number], string> =
  {
    cn: '+86',
    jp: '+81',
    sg: '+65',
    us: '+1',
    gb: '+44',
    de: '+49',
    au: '+61',
    kr: '+82',
    other: '',
  }

export const INDUSTRY_VALUES = [
  'ecommerce',
  'saas',
  'finance',
  'manufacturing',
  'education',
  'healthcare',
  'media',
  'gaming',
  'logistics',
  'other',
] as const

export const PRODUCT_VALUES = [
  'ignition',
  'chat',
  'label',
  'voice',
  'reel',
  'other',
] as const

export type CountryValue = (typeof COUNTRY_VALUES)[number]
export type IndustryValue = (typeof INDUSTRY_VALUES)[number]
export type ProductValue = (typeof PRODUCT_VALUES)[number]

export function dialCodeForCountry(country: string | null): string {
  if (!country) return ''
  return COUNTRY_DIAL_CODES[country as CountryValue] ?? ''
}

/** Prefer a country matching the active site locale when the form opens. */
export function defaultCountryFromLocale(locale: string): CountryValue | null {
  if (locale.startsWith('zh')) return 'cn'
  if (locale.startsWith('ja')) return 'jp'
  return null
}

/** Build a stored phone value: "+86 13800138000" (or national digits alone). */
export function composePhone(
  country: string | null,
  nationalNumber: string,
): string | undefined {
  const digits = nationalNumber.replace(/[^\d]/g, '').replace(/^0+/, '')
  if (!digits) return undefined

  const dial = dialCodeForCountry(country)
  if (!dial) return digits

  // Avoid "+86 +86…" if the user already typed an international prefix.
  if (nationalNumber.trim().startsWith('+')) {
    return nationalNumber.trim()
  }

  return `${dial} ${digits}`
}
