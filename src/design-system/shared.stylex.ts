import * as stylex from '@stylexjs/stylex'

/** Shared pieces of the book's pages. */
export const shared = stylex.create({
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
})
