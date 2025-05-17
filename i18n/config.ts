export type Locale = (typeof locales)[number];

export const locales = ['en', 'zh-CN', 'ja'] as const;
export const defaultLocale: Locale = 'en';