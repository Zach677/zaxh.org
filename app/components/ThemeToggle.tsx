import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>('system')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const applyTheme = () => {
      const isDark =
        theme === 'dark' ||
        (theme === 'system' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)

      document.documentElement.classList.toggle('dark', isDark)
      localStorage.setItem('theme', theme)
    }

    applyTheme()

    // Listen for system changes only when using system theme
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', applyTheme)
      return () => mediaQuery.removeEventListener('change', applyTheme)
    }
  }, [theme, mounted])

  if (!mounted) return <div className="w-32 h-10" />

  const themes = [
    {
      key: 'light',
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      title: '亮色模式',
    },
    {
      key: 'system',
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: '跟随系统',
    },
    {
      key: 'dark',
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ),
      title: '暗色模式',
    },
  ] as const

  return (
    <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1 border border-gray-200 dark:border-gray-700 shadow-sm">
      {themes.map(({ key, icon, title }) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          className={`relative p-2.5 rounded-full transition-all duration-200 ease-in-out ${
            theme === key
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md transform scale-105'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'
          }`}
          title={title}
          aria-label={title}
        >
          {icon}
        </button>
      ))}
    </div>
  )
}
