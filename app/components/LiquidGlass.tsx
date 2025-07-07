import { useState, useEffect, useRef } from 'react'

// 主要的 Liquid Glass 容器组件
interface LiquidGlassProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'subtle' | 'strong' | 'hero' | 'card' | 'nav'
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
    card: 'liquid-glass liquid-glass-hover',
    nav: 'liquid-glass-subtle',
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

// Liquid Glass 卡片组件
interface LiquidCardProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  className?: string
  interactive?: boolean
  onClick?: () => void
}

export const LiquidCard: React.FC<LiquidCardProps> = ({
  children,
  title,
  subtitle,
  className = '',
  interactive = true,
  onClick,
}) => {
  return (
    <LiquidGlass
      variant="card"
      effect="hover"
      blur="lg"
      rounded="xl"
      interactive={interactive}
      className={`p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {title && (
        <div className="mb-4">
          <h3 className="text-h4 text-gray-900 dark:text-white mb-1">
            {title}
          </h3>
          {subtitle && (
            <p className="text-body-sm text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </LiquidGlass>
  )
}

// Liquid Glass 按钮组件
interface LiquidButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
}) => {
  const variants = {
    primary: 'liquid-button text-white',
    secondary: 'liquid-glass text-gray-900 dark:text-white',
    ghost: 'liquid-glass-subtle text-gray-700 dark:text-gray-200',
  }

  const sizes = {
    sm: 'px-4 py-2 text-body-sm',
    md: 'px-6 py-3 text-body',
    lg: 'px-8 py-4 text-body-lg',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-full font-medium transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  )
}

// Liquid Glass 导航栏组件
interface LiquidNavProps {
  children: React.ReactNode
  className?: string
  fixed?: boolean
}

export const LiquidNav: React.FC<LiquidNavProps> = ({
  children,
  className = '',
  fixed = true,
}) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`
        ${fixed ? 'fixed top-0 left-0 right-0 z-50' : ''}
        transition-all duration-500 ease-out
        ${isScrolled ? 'liquid-glass-strong' : 'liquid-glass-subtle'}
        ${className}
      `}
    >
      {children}
    </nav>
  )
}

// Liquid Glass 标签组件
interface LiquidTagProps {
  children: React.ReactNode
  color?: 'blue' | 'purple' | 'pink' | 'green' | 'orange' | 'gray'
  className?: string
}

export const LiquidTag: React.FC<LiquidTagProps> = ({
  children,
  color = 'gray',
  className = '',
}) => {
  const colors = {
    blue: 'bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30',
    purple:
      'bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30',
    pink: 'bg-pink-500/20 text-pink-700 dark:text-pink-300 border-pink-500/30',
    green:
      'bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30',
    orange:
      'bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-500/30',
    gray: 'bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-500/30',
  }

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-body-sm font-medium
        backdrop-blur-sm border
        ${colors[color]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}

// Liquid Glass 输入框组件
interface LiquidInputProps {
  type?: 'text' | 'email' | 'password' | 'search'
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
  disabled?: boolean
}

export const LiquidInput: React.FC<LiquidInputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  disabled = false,
}) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className="
          w-full px-4 py-3 rounded-lg
          liquid-glass-subtle
          text-gray-900 dark:text-white
          placeholder-gray-500 dark:placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500/50
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-300
        "
      />
    </div>
  )
}
