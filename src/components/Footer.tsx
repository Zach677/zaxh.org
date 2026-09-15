import * as stylex from '@stylexjs/stylex'
import { type IconType, Icon } from '@/components/Icon'
import me from '@/../data/me.json'
import { colors } from '../design-system/tokens.stylex'
import { shared } from '../design-system/shared.stylex'
import { ThemeSwitcher } from './ThemeSwitcher'

const styles = stylex.create({
  footer: {
    marginTop: '4rem',
    paddingTop: '1.5rem',
    paddingBottom: '3rem',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: '1rem',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: colors.separatorSoft,
    flexWrap: 'wrap',
  },
  label: {
    display: 'block',
    lineHeight: 1.9,
  },
  socialWrap: {
    marginTop: '0.75rem',
  },
  social: {
    display: 'flex',
    gap: '1.25rem',
  },
  socialLink: {
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
  },
})

function SocialLinks() {
  return (
    <div {...stylex.props(styles.social)}>
      {me.links.map((link) => (
        <a
          key={link.title}
          href={link.url}
          aria-label={link.title}
          target={link.url.startsWith('http') ? '_blank' : undefined}
          rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
          {...stylex.props(styles.socialLink)}
        >
          <Icon icon={link.icon as unknown as IconType} size="16px" />
        </a>
      ))}
    </div>
  )
}

export const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer {...stylex.props(styles.footer)}>
      <div>
        <span {...stylex.props(shared.regLabel, styles.label)}>
          © {year} Zach
        </span>
        <div {...stylex.props(styles.socialWrap)}>
          <SocialLinks />
        </div>
      </div>
      <div>
        <ThemeSwitcher />
      </div>
    </footer>
  )
}
