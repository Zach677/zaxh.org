import * as stylex from '@stylexjs/stylex'
import { colors, fonts, typeScale } from './tokens.stylex'

/** Shared decorative / typography pieces used across pages. */
export const shared = stylex.create({
  regLabel: {
    fontFamily: fonts.mono,
    fontSize: typeScale.label12,
    lineHeight: typeScale.label12Lh,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: colors.secondary,
  },
  /** Underline wipe only — callers own color via stylex.props order. */
  inkLink: {
    textDecoration: 'none',
    backgroundImage: 'linear-gradient(currentColor, currentColor)',
    backgroundSize: {
      default: '0% 1px',
      ':hover': '100% 1px',
    },
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0 100%',
    transition: 'background-size 0.35s var(--ease)',
  },
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    borderWidth: 0,
  },
  /** Article-page title — italic serif at title28. */
  pageTitle: {
    fontFamily: fonts.serif,
    fontStyle: 'italic',
    fontWeight: 500,
    fontSize: typeScale.title28,
    lineHeight: typeScale.title28Lh,
    letterSpacing: '-0.01em',
    color: colors.heading,
  },
})
