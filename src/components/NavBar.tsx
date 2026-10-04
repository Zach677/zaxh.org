import * as stylex from '@stylexjs/stylex'
import { Link } from 'react-router'

import { colors, fonts, typeScale } from '../design-system/tokens.stylex'
import { shared } from '../design-system/shared.stylex'
import { Logo } from './Logo'

const styles = stylex.create({
  nav: {
    height: '4.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wordmark: {
    fontFamily: fonts.serif,
    fontStyle: 'italic',
    fontSize: typeScale.title20,
    lineHeight: 1,
    fontWeight: 500,
    color: colors.heading,
    textDecoration: 'none',
  },
  links: {
    display: 'flex',
    gap: '1.5rem',
  },
  link: {
    position: 'relative',
    fontSize: typeScale.copy14,
    lineHeight: typeScale.copy14Lh,
    color: {
      default: colors.secondary,
      ':hover': colors.heading,
    },
    transition: 'color 0.25s var(--ease), background-size 0.35s var(--ease)',
    outline: {
      default: 'none',
      ':focus-visible': `2px solid ${colors.accent}`,
    },
    outlineOffset: {
      default: null,
      ':focus-visible': '3px',
    },
    borderRadius: '2px',
    '::after': {
      content: {
        default: null,
        '@media (pointer: coarse)': '""',
      },
      position: 'absolute',
      inset: '-12px -10px',
      display: {
        default: 'none',
        '@media (pointer: coarse)': 'block',
      },
    },
  },
})

// Sections of the home page. Router links, not plain anchors: a full page
// load shares the "default" history key, so ScrollRestoration would restore
// that saved position over the hash.
const NAV_ITEMS = [
  { to: '/#work', label: 'work' },
  { to: '/#about', label: 'about' },
] as const

export const NavBar = () => {
  return (
    <nav {...stylex.props(styles.nav)}>
      <Link {...stylex.props(styles.wordmark)} to="/">
        <Logo />
      </Link>
      <div {...stylex.props(styles.links)}>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            {...stylex.props(shared.inkLink, styles.link)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
