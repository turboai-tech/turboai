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

export function getStoredVibrant(): boolean {
  if (typeof window === 'undefined') {
    return false
  }
  return window.localStorage.getItem(VIBRANT_STORAGE_KEY) === 'true'
}

export function applyVibrantPalette(enabled: boolean) {
  const root = document.documentElement
  if (enabled) {
    root.setAttribute('data-vibrant-palette', 'true')
  } else {
    root.removeAttribute('data-vibrant-palette')
  }
}

// ---------------------------------------------------------------- 外部 store
//
// 主题存在 localStorage 里，属于 React 之外的状态。用 useSyncExternalStore 订阅
// 它，而不是在 effect 里读一次再 setState —— 后者会在水合后多渲染一轮，
// 也正是 react-hooks/set-state-in-effect 要拦的模式。

type Listener = () => void

const listeners = new Set<Listener>()

/** 同标签页内的写入不会触发 storage 事件，所以要手动广播。 */
function notify() {
  for (const listener of listeners) listener()
}

export function subscribeDesignTheme(listener: Listener) {
  listeners.add(listener)
  // storage 事件负责跨标签页同步
  window.addEventListener('storage', listener)

  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', listener)
  }
}

export function setStoredDesignTheme(themeId: DesignThemeId) {
  window.localStorage.setItem(DESIGN_THEME_STORAGE_KEY, themeId)
  applyDesignTheme(themeId)
  notify()
}

export function setStoredVibrant(enabled: boolean) {
  window.localStorage.setItem(VIBRANT_STORAGE_KEY, String(enabled))
  applyVibrantPalette(enabled)
  notify()
}
