import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

export function ThemeToggle() {
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

  if (!mounted) return <div className="w-32 h-8" />

  const themes = [
    { key: 'light', icon: '☀️', title: '亮色模式' },
    { key: 'system', icon: '💻', title: '跟随系统' },
    { key: 'dark', icon: '🌙', title: '暗色模式' },
  ] as const

  return (
    <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      {themes.map(({ key, icon, title }) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          className={`p-2 rounded-md transition-colors ${
            theme === key
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          title={title}
        >
          <span className="text-sm font-medium">{icon}</span>
        </button>
      ))}
    </div>
  )
}
