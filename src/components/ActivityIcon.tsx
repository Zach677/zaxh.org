import { useEffect, useState } from 'react'
import appIconMap from '../../reporter-assets/app-icon.json'

const CDN_BASE = 'https://fastly.jsdelivr.net/gh/Innei/reporter-assets@main'

const FALLBACK_ICON = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="12" r="3"/></svg>',
)}`

interface ActivityIconProps {
  processName: string;
}

export function ActivityIcon({ processName }: ActivityIconProps) {
  const [iconError, setIconError] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  const iconName = (appIconMap as Record<string, string>)[processName]
  const iconUrl = iconName ? `${CDN_BASE}/apps/${iconName}.png` : null

  useEffect(() => {
    setIconError(false)
  }, [processName])

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <img
        src={iconError || !iconUrl ? FALLBACK_ICON : iconUrl}
        alt={processName}
        width={18}
        height={18}
        className="size-[18px] select-none transition-opacity duration-300"
        onError={() => setIconError(true)}
      />
      {showTooltip && (
        <div className="absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-xs text-white dark:bg-white/90 dark:text-black">
          正在使用 {processName}
        </div>
      )}
    </div>
  )
}
