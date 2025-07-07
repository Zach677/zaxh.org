import React from 'react'

// Liquid Glass 容器组件
interface LiquidGlassProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'subtle' | 'strong'
  blur?: 'sm' | 'md' | 'lg'
}

export const LiquidGlass: React.FC<LiquidGlassProps> = ({
  children,
  className = '',
  variant = 'default',
  blur = 'md',
}) => {
  const variants = {
    default: 'bg-white/10 dark:bg-white/5 border-white/20 dark:border-white/10',
    subtle: 'bg-white/5 dark:bg-white/3 border-white/10 dark:border-white/5',
    strong: 'bg-white/20 dark:bg-white/10 border-white/30 dark:border-white/20',
  }

  const blurs = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
  }

  return (
    <div
      className={`${variants[variant]} ${blurs[blur]} border shadow-lg ${className}`}
    >
      {children}
    </div>
  )
}

// Liquid Glass 滑动指示器
interface LiquidSliderProps {
  position: number
  width: number
  className?: string
}

export const LiquidSlider: React.FC<LiquidSliderProps> = ({
  position,
  width,
  className = '',
}) => {
  return (
    <div
      className={`absolute top-1 bottom-1 bg-white/90 dark:bg-white/20 rounded-full shadow-lg transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] backdrop-blur-sm border border-white/30 dark:border-white/10 ${className}`}
      style={{
        left: `${position}px`,
        width: `${width}px`,
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
        boxShadow:
          '0 4px 20px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)',
      }}
    />
  )
}

// Liquid Glass 按钮
interface LiquidButtonProps {
  children: React.ReactNode
  onClick?: () => void
  active?: boolean
  className?: string
  title?: string
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({
  children,
  onClick,
  active = false,
  className = '',
  title,
}) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`relative z-10 flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ease-out group ${
        active
          ? 'text-gray-800 dark:text-white'
          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
      } ${className}`}
    >
      {/* 图标容器 */}
      <div
        className={`transition-all duration-300 ${
          active
            ? 'scale-110 drop-shadow-sm'
            : 'scale-100 group-hover:scale-105'
        }`}
      >
        {children}
      </div>

      {/* 活跃状态光晕 */}
      {active && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent opacity-60 pointer-events-none" />
      )}

      {/* 点击涟漪效果 */}
      <div className="absolute inset-0 rounded-full opacity-0 group-active:opacity-30 transition-opacity duration-200 bg-white/20 dark:bg-white/10 pointer-events-none" />
    </button>
  )
}

// Liquid Glass 文本标签
interface LiquidLabelProps {
  children: React.ReactNode
  visible?: boolean
  className?: string
}

export const LiquidLabel: React.FC<LiquidLabelProps> = ({
  children,
  visible = false,
  className = '',
}) => {
  return (
    <div
      className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 dark:text-gray-300 font-medium transition-all duration-300 pointer-events-none whitespace-nowrap ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
      } ${className}`}
    >
      {children}
    </div>
  )
}
