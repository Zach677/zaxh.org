import * as stylex from '@stylexjs/stylex'
import { Link } from 'react-router'

import { ConstellationMap } from '@/components/constellation'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { SocialLinks } from '@/components/SocialLinks'
import { colors, fonts, typeScale } from '../design-system/tokens.stylex'
import { shared } from '../design-system/shared.stylex'
import { featuredProjects } from '../../data/projects'
import { NOW_STATUS } from '../../data/now-status'

const styles = stylex.create({
  shell: {
    minHeight: '100dvh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingInline: '1.5rem',
    paddingBlock: '2rem',
    boxSizing: 'border-box',
  },
  card: {
    width: '100%',
    maxWidth: '32rem',
  },
  mark: {
    fontFamily: fonts.logoLatin,
    fontStyle: 'italic',
    fontWeight: 500,
    fontSize: typeScale.copy16,
    lineHeight: typeScale.copy16Lh,
    color: colors.heading,
    margin: 0,
  },
  lede: {
    margin: '0.7rem 0 0',
    maxWidth: '24rem',
    fontSize: typeScale.copy15,
    lineHeight: typeScale.copy15Lh,
    color: colors.body,
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.45rem',
    marginTop: '0.85rem',
    fontFamily: fonts.mono,
    fontSize: typeScale.caption10,
    letterSpacing: '0.04em',
    color: colors.secondary,
  },
  updated: {
    whiteSpace: 'nowrap',
    opacity: 0.7,
  },
  social: {
    marginTop: '0.95rem',
  },
  plate: {
    height: '18rem',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1.35rem',
  },
  bar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    marginTop: '1.5rem',
    paddingTop: '1.1rem',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: colors.separatorSoft,
  },
  pages: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.35rem 1.15rem',
  },
  pageLink: {
    fontFamily: fonts.mono,
    fontSize: typeScale.label12,
    letterSpacing: '0.04em',
    color: colors.body,
  },
})

// UTC so the SSG output and the client agree in every time zone.
const NOW_UPDATED = new Date(NOW_STATUS.updated).toLocaleDateString('en', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

export default function RootPage() {
  return (
    <div {...stylex.props(styles.shell)}>
      <main {...stylex.props(styles.card)}>
        <h1 {...stylex.props(styles.mark)}>zaxh</h1>
        <p {...stylex.props(styles.lede)}>
          Builds small tools for iOS and macOS, and writes code so the cat and
          dog can have a better life.
        </p>
        <p {...stylex.props(styles.status)}>
          <span className="cx-now-dot" aria-hidden="true" />
          <span>
            {NOW_STATUS.text}{' '}
            <time {...stylex.props(styles.updated)} dateTime={NOW_STATUS.updated}>
              · {NOW_UPDATED}
            </time>
          </span>
        </p>
        <SocialLinks style={styles.social} />
        <div {...stylex.props(styles.plate)}>
          <ConstellationMap projects={featuredProjects()} />
        </div>
        <div {...stylex.props(styles.bar)}>
          <nav {...stylex.props(styles.pages)} aria-label="Pages">
            <Link {...stylex.props(shared.inkLink, styles.pageLink)} to="/projects">
              projects
            </Link>
            <Link {...stylex.props(shared.inkLink, styles.pageLink)} to="/about">
              about
            </Link>
          </nav>
          <ThemeSwitcher />
        </div>
      </main>
    </div>
  )
}
