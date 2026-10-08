import * as stylex from '@stylexjs/stylex'
import { Link } from 'react-router'

import { colors, fonts } from '../design-system/tokens.stylex'
import { shared } from '../design-system/shared.stylex'

// A page torn out of the book: a ragged top edge from a fixed, seeded
// sequence, so the prerendered page and the client draw the same tear.
const TORN_EDGE = (() => {
  const points: string[] = []
  for (let i = 0; i <= 40; i++) {
    const noise = (((Math.sin(i * 12.9898) * 43758.5453) % 1) + 1) % 1
    points.push(`${i * 2.5}% ${(noise * 2.4).toFixed(2)}%`)
  }
  return `polygon(${points.join(', ')}, 100% 100%, 0 100%)`
})()

const styles = stylex.create({
  desk: {
    minHeight: '100svh',
    display: 'grid',
    placeItems: 'center',
    padding: '2rem 1rem',
  },
  // The shadow sits on a wrapper: clip-path would cut a box-shadow.
  sheet: {
    width: 'min(26rem, 88vw)',
    rotate: '-2deg',
    filter: 'drop-shadow(0 18px 24px rgba(20, 19, 18, 0.18))',
  },
  page: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    aspectRatio: '0.72',
    padding: '3.25rem 2.5rem 2rem',
    backgroundColor: colors.page,
    color: colors.body,
  },
  running: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: fonts.mono,
    fontSize: '11px',
    letterSpacing: '0.04em',
    color: colors.icon,
  },
  body: {
    marginBlock: 'auto',
  },
  number: {
    margin: 0,
    fontFamily: fonts.serif,
    fontStyle: 'italic',
    fontWeight: 500,
    fontSize: 'clamp(4.5rem, 18vw, 6.5rem)',
    lineHeight: 1,
    letterSpacing: '-0.03em',
    color: colors.heading,
  },
  rule: {
    width: '2rem',
    height: '1px',
    marginBlock: '1.25rem',
    backgroundColor: colors.accent,
  },
  caption: {
    margin: 0,
    maxWidth: '18rem',
    fontFamily: fonts.serif,
    fontStyle: 'italic',
    fontSize: '17px',
    lineHeight: 1.55,
    color: colors.secondary,
  },
  back: {
    alignSelf: 'flex-start',
    fontFamily: fonts.mono,
    fontSize: '12px',
    color: {
      default: colors.bodyAlt,
      ':hover': colors.accent,
    },
    borderRadius: '2px',
    outline: {
      default: 'none',
      ':focus-visible': `2px solid ${colors.accent}`,
    },
    outlineOffset: '3px',
  },
  grain: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    backgroundImage: 'var(--paper-grain-img)',
    backgroundSize: '180px 180px',
    opacity: 'var(--paper-grain-opacity)',
    mixBlendMode: 'var(--paper-grain-blend)',
  },
})

export default function NotFound() {
  return (
    <main {...stylex.props(styles.desk)}>
      <div {...stylex.props(styles.sheet)}>
        <article {...stylex.props(styles.page)} style={{ clipPath: TORN_EDGE }}>
          <header {...stylex.props(styles.running)}>
            <span>zaxh.org</span>
            <span>Missing</span>
          </header>
          <div {...stylex.props(styles.body)}>
            <h1 {...stylex.props(styles.number)}>
              404<span {...stylex.props(shared.srOnly)}> page not found</span>
            </h1>
            <div {...stylex.props(styles.rule)} aria-hidden="true" />
            <p {...stylex.props(styles.caption)}>
              This page was torn out of the book, or it was never printed.
            </p>
          </div>
          <Link to="/" {...stylex.props(shared.inkLink, styles.back)}>
            ← Back to the book
          </Link>
          <div {...stylex.props(styles.grain)} aria-hidden="true" />
        </article>
      </div>
    </main>
  )
}
