export const DESIGN_THEME_IDS = [
  'default',
  'sky',
  'lavender',
  'mint',
  'netflix',
  'uber',
  'spotify',
  'coinbase',
  'airbnb',
  'discord',
  'rabbit',
] as const

export type DesignThemeId = (typeof DESIGN_THEME_IDS)[number]

export const DEFAULT_DESIGN_THEME: DesignThemeId = 'default'
export const DESIGN_THEME_STORAGE_KEY = 'turboai-design-theme'
export const VIBRANT_STORAGE_KEY = 'turboai-vibrant-palette'

export function isDesignThemeId(
  value: string | null | undefined,
): value is DesignThemeId {
  return DESIGN_THEME_IDS.includes(value as DesignThemeId)
}

export function getStoredDesignTheme(): DesignThemeId {
  if (typeof window === 'undefined') {
    return DEFAULT_DESIGN_THEME
  }

  const stored = window.localStorage.getItem(DESIGN_THEME_STORAGE_KEY)
  return isDesignThemeId(stored) ? stored : DEFAULT_DESIGN_THEME
}

export function applyDesignTheme(themeId: DesignThemeId) {
  const root = document.documentElement
  if (themeId === 'default') {
    root.removeAttribute('data-design-theme')
  } else {
    root.setAttribute('data-design-theme', themeId)
  }
}
