import { useEffect, useState } from 'react'
import { Icon } from './Icon'

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
      icon: <Icon icon="sun" className="w-4 h-4" />,
      title: '亮色模式',
    },
    {
      key: 'system',
      icon: <Icon icon="display" className="w-4 h-4" />,
      title: '跟随系统',
    },
    {
      key: 'dark',
      icon: <Icon icon="moon" className="w-4 h-4" />,
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
      <div className="relative inline-flex items-center bg-gray-200 dark:bg-gray-800 rounded-full p-1 shadow-lg">
        {/* 滑动指示器 */}
        <div
          className="absolute top-1 bottom-1 bg-white dark:bg-gray-700 rounded-full shadow-md transition-all duration-300 ease-out"
          style={{
            left: `${getSliderPosition()}px`,
            width: '32px',
          }}
        />

        {/* 按钮组 */}
        {themes.map(({ key, icon, title }) => (
          <button
            key={key}
            onClick={() => setTheme(key)}
            title={title}
            className={`relative z-10 flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ease-out ${
              theme === key
                ? 'text-gray-800 dark:text-white'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            {icon}
          </button>
        ))}
      </div>

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
