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
