import { useState, useEffect, useRef } from 'react'

// 主要的 Liquid Glass 容器组件
interface LiquidGlassProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'subtle' | 'strong' | 'hero'
  effect?: 'none' | 'hover' | 'pulse' | 'shimmer' | 'morph'
  blur?: 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  interactive?: boolean
  style?: React.CSSProperties
  onClick?: () => void
}

export const LiquidGlass: React.FC<LiquidGlassProps> = ({
  children,
  className = '',
  variant = 'default',
  effect = 'none',
  blur = 'md',
  rounded = 'lg',
  interactive = false,
  style,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const glassRef = useRef<HTMLDivElement>(null)

  const variants = {
    default: 'liquid-glass',
    subtle: 'liquid-glass-subtle',
    strong: 'liquid-glass-strong',
    hero: 'liquid-glass-strong liquid-glass-pulse',
  }

  const effects = {
    none: '',
    hover: 'liquid-glass-hover',
    pulse: 'liquid-glass-pulse',
    shimmer: 'liquid-glass-shimmer',
    morph: 'liquid-glass-morph',
  }

  const blurs = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  }

  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !glassRef.current) return

    const rect = glassRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  const dynamicStyle = interactive
    ? {
        background: isHovered
          ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
         rgba(255, 255, 255, 0.2) 0%, 
         rgba(255, 255, 255, 0.1) 50%, 
         rgba(255, 255, 255, 0.05) 100%)`
          : undefined,
        ...style,
      }
    : style

  return (
    <div
      ref={glassRef}
      className={`
        ${variants[variant]} 
        ${effects[effect]} 
        ${blurs[blur]} 
        ${roundedStyles[rounded]}
        ${interactive ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={dynamicStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

// Liquid Glass 英雄区域组件
interface LiquidHeroProps {
  title: string
  subtitle?: string
  description?: string
  actions?: React.ReactNode
  className?: string
}

export const LiquidHero: React.FC<LiquidHeroProps> = ({
  title,
  subtitle,
  description,
  actions,
  className = '',
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* 动态背景 */}
      <div className="liquid-background" />

      {/* 主要内容 */}
      <LiquidGlass
        variant="hero"
        effect="pulse"
        blur="xl"
        rounded="xl"
        className="relative z-10 p-8 md:p-12 text-center"
      >
        {subtitle && (
          <div className="text-body-sm text-gray-600 dark:text-gray-300 mb-4 uppercase tracking-wider font-medium">
            {subtitle}
          </div>
        )}

        <h1 className="text-display liquid-text mb-6 font-bold">{title}</h1>

        {description && (
          <p className="text-body-lg text-gray-700 dark:text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}

        {actions && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {actions}
          </div>
        )}
      </LiquidGlass>
    </div>
  )
}
