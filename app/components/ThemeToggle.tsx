import { useEffect, useState } from 'react'
import { LiquidGlass, LiquidButton } from './LiquidGlass'

type Theme = 'light' | 'dark' | 'system'

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>('system')
  const [mounted, setMounted] = useState(false)
  const [showLabel, setShowLabel] = useState(false)

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

  if (!mounted) return <div className="w-32 h-11" />

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

  const getActiveIndex = () => {
    return themes.findIndex((t) => t.key === theme)
  }

  const getSliderPosition = () => {
    const buttonWidth = 36 // w-9 = 36px
    const padding = 4 // p-1 = 4px
    return padding + getActiveIndex() * buttonWidth
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowLabel(true)}
      onMouseLeave={() => setShowLabel(false)}
    >
      <LiquidGlass
        variant="default"
        blur="md"
        className="relative inline-flex items-center rounded-full p-1 shadow-xl shadow-black/10 dark:shadow-black/20"
      >
        {/* 滑动指示器 */}
        <div
          className="absolute top-1 bottom-1 bg-white/90 dark:bg-white/20 rounded-full shadow-lg transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] backdrop-blur-sm border border-white/30 dark:border-white/10"
          style={{
            left: `${getSliderPosition()}px`,
            width: '32px',
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
            boxShadow:
              '0 4px 20px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)',
          }}
        />

        {/* 按钮组 */}
        {themes.map(({ key, icon, title }) => (
          <button
            key={key}
            onClick={() => setTheme(key)}
            title={title}
            className={`relative z-10 flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ease-out group ${
              theme === key
                ? 'text-gray-800 dark:text-white'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            {/* 图标容器 */}
            <div
              className={`transition-all duration-300 ${
                theme === key
                  ? 'scale-110 drop-shadow-sm'
                  : 'scale-100 group-hover:scale-105'
              }`}
            >
              {icon}
            </div>

            {/* 活跃状态光晕 */}
            {theme === key && (
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent opacity-60 pointer-events-none" />
            )}

            {/* 点击涟漪效果 */}
            <div className="absolute inset-0 rounded-full opacity-0 group-active:opacity-30 transition-opacity duration-200 bg-white/20 dark:bg-white/10 pointer-events-none" />
          </button>
        ))}

        {/* 环境光效果 */}
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-500/8 via-purple-500/8 to-pink-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm -z-10" />
      </LiquidGlass>

      {/* 当前模式标签 */}
      <div
        className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 dark:text-gray-300 font-medium transition-all duration-300 pointer-events-none whitespace-nowrap ${
          showLabel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
        }`}
      >
        {themes.find((t) => t.key === theme)?.title}
      </div>
    </div>
  )
}
