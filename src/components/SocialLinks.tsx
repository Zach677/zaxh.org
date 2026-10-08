import * as stylex from '@stylexjs/stylex'
import { Icon } from '@/components/Icon'
import { links } from '@/../data/me'
import { colors } from '../design-system/tokens.stylex'

const styles = stylex.create({
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  link: {
    position: 'relative',
    color: {
      default: colors.secondary,
      ':hover': colors.heading,
    },
    display: 'inline-flex',
    transition: 'color 0.25s var(--ease), transform 0.25s var(--ease-spring)',
    transform: {
      default: null,
      ':hover': 'translateY(-2px) rotate(-4deg)',
    },
    borderRadius: '2px',
    outline: {
      default: 'none',
      ':focus-visible': `2px solid ${colors.accent}`,
    },
    outlineOffset: {
      default: null,
      ':focus-visible': '3px',
    },
    '::after': {
      content: {
        default: null,
        '@media (pointer: coarse)': '""',
      },
      position: 'absolute',
      inset: '-10px',
      display: {
        default: 'none',
        '@media (pointer: coarse)': 'block',
      },
    },
  },
})

export function SocialLinks({ style }: { style?: stylex.StyleXStyles }) {
  return (
    <div {...stylex.props(styles.row, style)}>
      {links.map((link) => {
        const external = link.url.startsWith('http')
        return (
          <a
            key={link.title}
            href={link.url}
            aria-label={link.title}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            {...stylex.props(styles.link)}
          >
            <Icon icon={link.icon} size="16px" />
          </a>
        )
      })}
    </div>
  )
}
