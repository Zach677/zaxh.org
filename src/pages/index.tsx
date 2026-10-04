import * as stylex from '@stylexjs/stylex'
import { Link } from 'react-router'

import { Inventory } from '@/components/Inventory'
import { colors, fonts, typeScale } from '../design-system/tokens.stylex'
import { shared } from '../design-system/shared.stylex'
import { projects, type Project, type ProjectLink } from '../../data/projects'
import { NOW_STATUS } from '../../data/now-status'

const MOBILE = '@media (max-width: 639px)'
const MOTION = '@media (prefers-reduced-motion: no-preference)'

const blink = stylex.keyframes({
  '50%': { opacity: 0.35 },
})

const styles = stylex.create({
  intro: {
    paddingTop: 'clamp(3rem, 12vh, 8rem)',
  },
  name: {
    margin: 0,
    fontFamily: fonts.serif,
    fontStyle: 'italic',
    fontWeight: 500,
    fontSize: 'clamp(3.25rem, 2rem + 4.5vw, 5rem)',
    lineHeight: 1,
    letterSpacing: '-0.02em',
    color: colors.heading,
  },
  statement: {
    margin: '1.5rem 0 0',
    maxWidth: '30rem',
    fontSize: 'clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem)',
    lineHeight: 1.6,
    color: colors.body,
  },
  status: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',
    margin: '1.25rem 0 0',
  },
  dot: {
    flexShrink: 0,
    width: '7px',
    height: '7px',
    marginTop: '0.45em',
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
  section: {
    marginTop: 'clamp(4rem, 10vh, 6rem)',
  },
  heading: {
    margin: '0 0 1.25rem',
  },
  // Rows share the list's columns through subgrid, so the name column
  // fits the longest name instead of a fixed width.
  list: {
    display: {
      default: 'grid',
      [MOBILE]: 'block',
    },
    gridTemplateColumns: 'max-content 1fr',
    columnGap: '1.5rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: colors.border,
  },
  row: {
    display: 'grid',
    gridColumn: '1 / -1',
    gridTemplateColumns: {
      default: 'subgrid',
      [MOBILE]: '1fr',
    },
    alignItems: 'baseline',
    gap: '0.25rem 1.5rem',
    paddingBlock: '0.85rem',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.separatorSoft,
  },
  title: {
    fontSize: typeScale.copy15,
    lineHeight: typeScale.copy15Lh,
    fontWeight: 500,
    color: colors.heading,
    borderRadius: '2px',
    outline: {
      default: 'none',
      ':focus-visible': `2px solid ${colors.accent}`,
    },
    outlineOffset: '3px',
  },
  arrow: {
    display: 'inline-block',
    marginLeft: '0.25em',
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
  pausedLabel: {
    display: 'block',
  },
  description: {
    margin: 0,
    fontSize: typeScale.copy14,
    lineHeight: typeScale.copy14Lh,
    color: colors.secondary,
  },
  extraLink: {
    color: colors.body,
  },
  prose: {
    maxWidth: '34rem',
    fontSize: typeScale.copy15,
    lineHeight: 1.8,
    color: colors.body,
  },
  p: {
    margin: '0 0 1.25rem',
  },
  motto: {
    margin: '2rem 0',
    fontFamily: fonts.serif,
    fontStyle: 'italic',
    fontSize: typeScale.title20,
    lineHeight: typeScale.title20Lh,
    color: colors.heading,
  },
})

// UTC so the SSG output and the client agree in every time zone.
const NOW_UPDATED = new Date(NOW_STATUS.updated).toLocaleDateString('en', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

// Active work first; sort is stable, so data order holds inside each group.
const WORK = [...projects].sort(
  (a, b) => Number(a.status === 'paused') - Number(b.status === 'paused'),
)

function ExtraLink({ link }: { link: ProjectLink }) {
  const props = stylex.props(shared.inkLink, styles.extraLink)
  return link.url.startsWith('/') ? (
    <Link to={link.url} {...props}>
      {link.label}
    </Link>
  ) : (
    <a href={link.url} target="_blank" rel="noopener noreferrer" {...props}>
      {link.label}
    </a>
  )
}

function WorkRow({ project }: { project: Project }) {
  // The first link is the project's home; the name carries it.
  const [home, ...extra] = project.links

  return (
    <li {...stylex.props(styles.row)}>
      <div>
        {home ? (
          <a
            href={home.url}
            target="_blank"
            rel="noopener noreferrer"
            {...stylex.props(shared.inkLink, styles.title, stylex.defaultMarker())}
          >
            {project.name}
            <span {...stylex.props(styles.arrow)} aria-hidden="true">
              ↗
            </span>
          </a>
        ) : (
          <span {...stylex.props(styles.title)}>{project.name}</span>
        )}
        {project.status === 'paused' ? (
          <span {...stylex.props(shared.regLabel, styles.pausedLabel)}>paused</span>
        ) : null}
      </div>
      <p {...stylex.props(styles.description)}>
        {project.oneLiner}
        {extra.map((link) => (
          <span key={link.label}>
            {' · '}
            <ExtraLink link={link} />
          </span>
        ))}
      </p>
    </li>
  )
}

export default function RootPage() {
  return (
    <main>
      <section {...stylex.props(styles.intro)}>
        <h1 {...stylex.props(styles.name)}>Zach</h1>
        <p {...stylex.props(styles.statement)}>
          Builds small tools for iOS and macOS, and writes code so the cat and
          dog can have a better life.
        </p>
        <p {...stylex.props(shared.regLabel, styles.status)}>
          <span {...stylex.props(styles.dot)} aria-hidden="true" />
          <span>
            {NOW_STATUS.text}{' '}
            <time {...stylex.props(styles.updated)} dateTime={NOW_STATUS.updated}>
              · {NOW_UPDATED}
            </time>
          </span>
        </p>
      </section>

      <section id="work" {...stylex.props(styles.section)}>
        <h2 {...stylex.props(shared.pageTitle, styles.heading)}>Work</h2>
        {/* role="list": Safari drops list semantics when list-style is none. */}
        <ul {...stylex.props(styles.list)} role="list">
          {WORK.map((project) => (
            <WorkRow key={project.slug} project={project} />
          ))}
        </ul>
      </section>

      <section id="about" {...stylex.props(styles.section)}>
        <h2 {...stylex.props(shared.pageTitle, styles.heading)}>About</h2>
        <div {...stylex.props(styles.prose)}>
          <p {...stylex.props(styles.p)}>
            Most of what I ship is small Apple-platform tooling: a menu bar app
            for Apple ID credit, a Swift rewrite of ipatool, and starter kits
            for UIKit and AppKit. When something needs a server, it usually
            ends up on Cloudflare Workers.
          </p>
          <p {...stylex.props(styles.motto)}>Slow is fast.</p>
          <p {...stylex.props(styles.p)}>
            I&apos;m still learning, so I take the time to understand a problem
            before I write the fix.
          </p>
        </div>
        <Inventory
          items={[
            { what: 'iPhone 16 Pro Max' },
            { what: 'iPhone 12', retired: true },
            { what: 'MacBook Pro 2023' },
            { what: 'Apple Watch Series 4' },
            { what: 'iPad Pro 11" (2022)' },
            { what: 'AirPods Pro 2', retired: true, note: 'lost… fuck!' },
            { what: 'EarPods' },
            { what: 'Nuphy Node 75' },
            { what: 'FL980' },
            { what: 'Kzzi K75' },
            { what: 'Redmi A27U Type-C 2026' },
          ]}
        />
      </section>
    </main>
  )
}
