import {
  type KeyboardEvent,
  type MouseEventHandler,
  useRef,
  useSyncExternalStore,
} from 'react'
import * as stylex from '@stylexjs/stylex'
import { type IconType, Icon } from '@/components/Icon'
import { type Theme, themeManager } from '@/theme'
import { colors } from '../design-system/tokens.stylex'

const styles = stylex.create({
  root: {
    // view-transition-name for theme chrome
    viewTransitionName: 'theme-switcher',
    position: 'relative',
    padding: '2px',
    backgroundColor: colors.separator,
    borderRadius: '9999px',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.06)',
  },
  thumb: {
    position: 'absolute',
    width: '30px',
    height: '30px',
    backgroundColor: colors.paper,
    boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
    borderRadius: '9999px',
    zIndex: 10,
    transition: 'background-color 0.3s, left 0.3s var(--ease-spring) 0s',
  },
  row: {
    position: 'relative',
    display: 'flex',
    zIndex: 20,
  },
  button: {
    position: 'relative',
    display: 'flex',
    width: '30px',
    height: '30px',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    borderWidth: 0,
    backgroundColor: 'transparent',
    transition: 'color 0.2s var(--ease)',
    borderRadius: '9999px',
    outline: {
      default: 'none',
      ':focus-visible': `2px solid ${colors.accent}`,
    },
    outlineOffset: {
      default: null,
      ':focus-visible': '2px',
    },
    '::after': {
      content: {
        default: null,
        '@media (pointer: coarse)': '""',
      },
      position: 'absolute',
      inset: '-8px',
      display: {
        default: 'none',
        '@media (pointer: coarse)': 'block',
      },
    },
  },
  active: {
    color: colors.heading,
  },
  inactive: {
    color: {
      default: colors.secondary,
      ':hover': colors.heading,
    },
  },
})

const THEME_OPTIONS: { theme: Theme; icon: IconType; title: string }[] = [
  { theme: 'dark', icon: 'moon', title: 'Dark' },
  { theme: 'system', icon: 'display', title: 'System' },
  { theme: 'light', icon: 'sun', title: 'Light' },
]

const INDICATOR_OFFSET_MAP: Record<Theme, number> = {
  dark: 2,
  system: 32,
  light: 62,
}

function ThemeRadioButton({
  active,
  icon,
  title,
  onClick,
  onKeyDown,
  tabIndex,
  buttonRef,
}: {
  active: boolean
  icon: IconType
  title: string
  onClick: MouseEventHandler
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void
  tabIndex: number
  buttonRef: (el: HTMLButtonElement | null) => void
}) {
  return (
    <button
      ref={buttonRef}
      {...stylex.props(styles.button, active ? styles.active : styles.inactive)}
      type="button"
      role="radio"
      aria-label={title}
      aria-checked={active}
      tabIndex={tabIndex}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <Icon icon={icon} size="15px" />
    </button>
  )
}

export function ThemeSwitcher() {
  const currentTheme = useSyncExternalStore<Theme>(
    (onStoreChange) => {
      return themeManager.registerListener(onStoreChange)
    },
    () => themeManager.getTheme(),
    () => 'system',
  )

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])

  function changeTheme(theme: Theme) {
    themeManager.setTheme(theme)
  }

  function focusOption(index: number) {
    const next = THEME_OPTIONS[index]
    changeTheme(next.theme)
    // Focus after state update so the tab stop moves with selection
    requestAnimationFrame(() => {
      buttonRefs.current[index]?.focus()
    })
  }

  function handleKeyDown(
    e: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number | null = null
    switch (e.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      nextIndex = (index + 1) % THEME_OPTIONS.length
      break
    case 'ArrowLeft':
    case 'ArrowUp':
      nextIndex = (index - 1 + THEME_OPTIONS.length) % THEME_OPTIONS.length
      break
    case 'Home':
      nextIndex = 0
      break
    case 'End':
      nextIndex = THEME_OPTIONS.length - 1
      break
    default:
      return
    }
    e.preventDefault()
    focusOption(nextIndex)
  }

  return (
    <div
      {...stylex.props(styles.root)}
      role="radiogroup"
      aria-label="Theme Switcher"
    >
      <div
        {...stylex.props(styles.thumb)}
        style={{ left: INDICATOR_OFFSET_MAP[currentTheme] }}
      />

      <div {...stylex.props(styles.row)}>
        {THEME_OPTIONS.map((opt, index) => (
          <ThemeRadioButton
            key={opt.theme}
            active={currentTheme === opt.theme}
            icon={opt.icon}
            title={opt.title}
            tabIndex={currentTheme === opt.theme ? 0 : -1}
            buttonRef={(el) => {
              buttonRefs.current[index] = el
            }}
            onClick={() => changeTheme(opt.theme)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>
    </div>
  )
}
