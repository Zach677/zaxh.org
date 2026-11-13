import type { Theme } from './types'

interface ThemeManager {
  init(): void
  getTheme(): Theme
  setTheme(theme: Theme, origin?: { x: number; y: number }): void
  registerListener(listener: () => void): () => void
}

const LOCAL_STORAGE_KEY = 'app_theme'

// Yohaku paper (light) / inverted paper (dark) — mobile browser chrome
const LIGHT_THEME_COLOR = '#f9f8f5'
const DARK_THEME_COLOR = '#141312'

const listeners = new Set<() => void>()
// index.html sets data-theme before the first paint. Start from it, so the
// switcher does not slide into place on load.
let currentTheme: Theme =
  typeof document === 'undefined'
    ? 'system'
    : (document.documentElement.dataset.theme as Theme | undefined) ?? 'system'

let lightThemeColorMeta: HTMLMetaElement | null = null
let darkThemeColorMeta: HTMLMetaElement | null = null

function applyTheme(theme: Theme) {
  currentTheme = theme

  const root = document.documentElement
  root.dataset['theme'] = theme

  if (!lightThemeColorMeta || !darkThemeColorMeta) {
    lightThemeColorMeta = document.createElement('meta')
    lightThemeColorMeta.name = 'theme-color'
    lightThemeColorMeta.media = '(prefers-color-scheme: light)'
    darkThemeColorMeta = document.createElement('meta')
    darkThemeColorMeta.name = 'theme-color'
    darkThemeColorMeta.media = '(prefers-color-scheme: dark)'

    const head = document.head
    head.appendChild(lightThemeColorMeta)
    head.appendChild(darkThemeColorMeta)
  }

  lightThemeColorMeta.content =
    theme === 'dark' ? DARK_THEME_COLOR : LIGHT_THEME_COLOR
  darkThemeColorMeta.content =
    theme === 'light' ? LIGHT_THEME_COLOR : DARK_THEME_COLOR

  listeners.forEach((f) => f())
}

const themeManager: ThemeManager = {
  init() {
    const persistentTheme = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (
      persistentTheme === 'system' ||
      persistentTheme === 'light' ||
      persistentTheme === 'dark'
    ) {
      applyTheme(persistentTheme)
    }
  },
  getTheme() {
    return currentTheme
  },
  setTheme(theme, origin = { x: 0, y: 0 }) {
    localStorage.setItem(LOCAL_STORAGE_KEY, theme)

    if (
      !('startViewTransition' in document) ||
      matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      applyTheme(theme)
      return
    }

    const transition = document.startViewTransition(() => {
      applyTheme(theme)
    })

    transition.ready.then(() => {
      // The new theme spreads from where it was picked.
      const { x, y } = origin
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      )

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        },
      )
    })
  },
  registerListener(listener) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
}

export default themeManager
