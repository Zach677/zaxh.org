import * as stylex from '@stylexjs/stylex'
import { Link } from 'react-router'

import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { SocialLinks } from '@/components/SocialLinks'
import { colors, fonts, typeScale } from '../design-system/tokens.stylex'
import { shared } from '../design-system/shared.stylex'
import { featuredProjects, projects } from '../../data/projects'
import { NOW_STATUS } from '../../data/now-status'

const MOBILE = '@media (max-width: 639px)'
const MOTION = '@media (prefers-reduced-motion: no-preference)'

const rise = stylex.keyframes({
  from: { opacity: 0, transform: 'translateY(6px)' },
  to: { opacity: 1, transform: 'none' },
})

const blink = stylex.keyframes({
  '50%': { opacity: 0.35 },
})

const styles = stylex.create({
  // The page is a printed sheet: running heads in the corners, text set on
  // the left third, and the empty space reads as page margin.
  page: {
    minHeight: '100dvh',
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    padding: 'clamp(1.25rem, 3.5vw, 2.5rem)',
    boxSizing: 'border-box',
    fontFamily: fonts.mono,
    fontSize: typeScale.label12,
    lineHeight: typeScale.label12Lh,
  },
  head: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1.5rem',
  },
  status: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',
    minWidth: 0,
    margin: 0,
    letterSpacing: '0.02em',
    color: colors.secondary,
  },
  dot: {
    flexShrink: 0,
    width: '7px',
    height: '7px',
    marginTop: '0.4em',
    borderRadius: '50%',
    borderWidth: '1.25px',
    borderStyle: 'solid',
    borderColor: colors.accent,
    animationName: {
      default: null,
      [MOTION]: blink,
    },
    animationDuration: '3.2s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
  },
  updated: {
    whiteSpace: 'nowrap',
    color: colors.icon,
  },
  nav: {
    display: 'flex',
    gap: '1.25rem',
    flexShrink: 0,
  },
  navLink: {
    letterSpacing: '0.04em',
    color: colors.body,
  },
  main: {
    alignSelf: 'center',
    // Content box: the left margin must not eat into the text measure.
    boxSizing: 'content-box',
    maxWidth: '36rem',
    paddingInlineStart: {
      default: 'clamp(0rem, 9vw, 10rem)',
      [MOBILE]: 0,
    },
    paddingBlock: '3rem',
  },
  name: {
    margin: 0,
    fontFamily: fonts.serif,
    fontStyle: 'italic',
    fontWeight: 500,
    fontSize: 'clamp(3.25rem, 2rem + 4.5vw, 5.5rem)',
    lineHeight: 1,
    letterSpacing: '-0.02em',
    color: colors.heading,
  },
  rule: {
    width: '2rem',
    height: '1px',
    marginBlock: '1.5rem 1.25rem',
    backgroundColor: colors.accent,
  },
  statement: {
    margin: 0,
    maxWidth: '30rem',
    fontFamily: fonts.sans,
    fontSize: 'clamp(1rem, 0.9rem + 0.4vw, 1.125rem)',
    lineHeight: 1.65,
    color: colors.body,
  },
  contents: {
    listStyle: 'none',
    margin: '2.75rem 0 0',
    padding: 0,
  },
  item: {
    animationName: {
      default: null,
      [MOTION]: rise,
    },
    animationDuration: '0.5s',
    animationTimingFunction: 'var(--ease)',
    animationFillMode: 'both',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: {
      default: '2ch auto 1fr auto',
      [MOBILE]: '2ch 1fr',
    },
    alignItems: 'baseline',
    columnGap: '0.9rem',
    paddingBlock: '0.5rem',
    textDecoration: 'none',
    color: colors.body,
    transition: 'transform 0.2s var(--ease)',
    transform: {
      default: null,
      ':active': 'translateX(2px)',
    },
    borderRadius: '2px',
    outline: {
      default: 'none',
      ':focus-visible': `2px solid ${colors.accent}`,
    },
    outlineOffset: '4px',
  },
  num: {
    color: colors.icon,
  },
  // Hover keeps the title dark for contrast; the accent goes on the arrow.
  title: {
    fontSize: typeScale.copy14,
    color: colors.heading,
    backgroundImage: 'linear-gradient(currentColor, currentColor)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0 100%',
    backgroundSize: {
      default: '0% 1px',
      [stylex.when.ancestor(':hover')]: '100% 1px',
    },
    transition: 'background-size 0.35s var(--ease)',
  },
  arrow: {
    display: 'inline-block',
    marginLeft: '0.3em',
    fontSize: '0.8em',
    color: {
      default: colors.icon,
      [stylex.when.ancestor(':hover')]: colors.accent,
    },
    transition: 'transform 0.2s var(--ease), color 0.2s var(--ease)',
    transform: {
      default: null,
      [stylex.when.ancestor(':hover')]: 'translate(2px, -2px)',
    },
  },
  // Same dotted leader as the device inventory on /about.
  leader: {
    display: {
      default: null,
      [MOBILE]: 'none',
    },
    borderBottomWidth: '1px',
    borderBottomStyle: 'dotted',
    borderBottomColor: colors.strongFill,
  },
  note: {
    gridColumn: {
      default: null,
      [MOBILE]: '2',
    },
    color: colors.secondary,
    whiteSpace: {
      default: 'nowrap',
      [MOBILE]: 'normal',
    },
  },
  more: {
    display: 'inline-block',
    marginTop: '1rem',
    marginLeft: 'calc(2ch + 0.9rem)',
    color: colors.secondary,
  },
  foot: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
  },
})

// UTC so the SSG output and the client agree in every time zone.
const NOW_UPDATED = new Date(NOW_STATUS.updated).toLocaleDateString('en', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

export default function RootPage() {
  const featured = featuredProjects()
  const more = projects.length - featured.length

  return (
    <div {...stylex.props(styles.page)}>
      <header {...stylex.props(styles.head)}>
        <p {...stylex.props(styles.status)}>
          <span {...stylex.props(styles.dot)} aria-hidden="true" />
          <span>
            {NOW_STATUS.text}{' '}
            <time {...stylex.props(styles.updated)} dateTime={NOW_STATUS.updated}>
              · {NOW_UPDATED}
            </time>
          </span>
        </p>
        <nav {...stylex.props(styles.nav)} aria-label="Pages">
          <Link {...stylex.props(shared.inkLink, styles.navLink)} to="/projects">
            projects
          </Link>
          <Link {...stylex.props(shared.inkLink, styles.navLink)} to="/about">
            about
          </Link>
        </nav>
      </header>

      <main {...stylex.props(styles.main)}>
        <h1 {...stylex.props(styles.name)}>Zach</h1>
        <div {...stylex.props(styles.rule)} aria-hidden="true" />
        <p {...stylex.props(styles.statement)}>
          Builds small tools for iOS and macOS, and writes code so the cat and
          dog can have a better life.
        </p>

        {/* role="list": Safari drops list semantics when list-style is none. */}
        <ol
          {...stylex.props(styles.contents)}
          role="list"
          aria-label="Selected projects"
        >
          {featured.map((project, index) => (
            <li
              key={project.slug}
              {...stylex.props(styles.item)}
              style={{ animationDelay: `${120 + index * 50}ms` }}
            >
              <a
                href={project.links[0]?.url}
                target="_blank"
                rel="noopener noreferrer"
                {...stylex.props(styles.row, stylex.defaultMarker())}
              >
                <span {...stylex.props(styles.num)} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span {...stylex.props(styles.title)}>
                  {project.name}
                  <span {...stylex.props(styles.arrow)} aria-hidden="true">
                    ↗
                  </span>
                </span>
                <span {...stylex.props(styles.leader)} aria-hidden="true" />
                <span {...stylex.props(styles.note)}>
                  {project.callout ?? project.oneLiner}
                </span>
              </a>
            </li>
          ))}
        </ol>
        {more > 0 ? (
          <Link {...stylex.props(shared.inkLink, styles.more)} to="/projects">
            and {more} more →
          </Link>
        ) : null}
      </main>

      <footer {...stylex.props(styles.foot)}>
        <SocialLinks />
        <ThemeSwitcher />
      </footer>
    </div>
  )
}
