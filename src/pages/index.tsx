import type { ReactNode } from 'react'
import * as stylex from '@stylexjs/stylex'
import { Link } from 'react-router'

import { Book, Page, TurnButton } from '@/components/book/Book'
import { SocialLinks } from '@/components/SocialLinks'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { colors, fonts } from '../design-system/tokens.stylex'
import { shared } from '../design-system/shared.stylex'
import { projects, type Project } from '../../data/projects'

const DEVICES: { what: string; retired?: boolean; note?: string }[] = [
  { what: 'iPhone 16 Pro Max' },
  { what: 'iPhone 12', retired: true },
  { what: 'MacBook Pro 2023' },
  { what: 'Apple Watch Series 4' },
  { what: 'Fitbit Air' },
  { what: 'iPad Pro 11" (2022)' },
  { what: 'AirPods Pro 2', retired: true, note: 'lost… fuck!' },
  { what: 'EarPods' },
  { what: 'Nuphy Node 75' },
  { what: 'FL980' },
  { what: 'Kzzi K75', retired: true },
  { what: 'Redmi A27U Type-C 2026' },
]

// How many contents entries fit on one page, with one-liners of two lines at
// most (about 80 characters). More projects continue on the next page, and
// the rest of the book moves along.
const ENTRIES_PER_PAGE = 5

const ACTIVE = projects.filter((p) => p.status === 'active')
const SHELVED = projects.filter((p) => p.status === 'paused')

// Book sizes are em of the page's 14px base, which scales with the book
// (see PAGE_TYPE in Book.tsx). Nested sizes note their parent.
const styles = stylex.create({
  // Cover: title above, a foil device in the middle, the author below.
  coverLayout: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24% 2em 14% calc(9% + 2em)',
  },
  title: {
    fontFamily: fonts.serif,
    fontStyle: 'italic',
    fontWeight: 500,
    fontSize: '4.5em',
    lineHeight: 1,
    letterSpacing: '-0.02em',
  },
  subtitle: {
    marginTop: '1.4em',
    fontFamily: fonts.mono,
    fontSize: '0.7857em',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    opacity: 0.8,
  },
  emblem: {
    width: '3.4em',
    height: '3.4em',
    opacity: 0.9,
  },
  author: {
    fontFamily: fonts.serif,
    fontWeight: 500,
    fontSize: '1.15em',
    letterSpacing: '0.32em',
    textTransform: 'uppercase',
  },
  // Frontispiece: set at the optical center, as on a title page.
  titlePage: {
    marginBlock: 'auto',
    paddingBottom: '8%',
  },
  name: {
    margin: 0,
    fontFamily: fonts.serif,
    fontStyle: 'italic',
    fontWeight: 500,
    fontSize: '5em',
    lineHeight: 0.95,
    letterSpacing: '-0.03em',
    color: colors.heading,
  },
  rule: {
    width: '2em',
    height: '1px',
    marginBlock: '1.5em 1.25em',
    backgroundColor: colors.accent,
  },
  lede: {
    margin: 0,
    maxWidth: '19em',
    fontSize: '1.1429em',
    lineHeight: 1.65,
    color: colors.bodyAlt,
  },
  social: {
    marginTop: '1.5em',
  },
  // Shared page parts
  heading: {
    margin: 0,
    fontFamily: fonts.serif,
    fontStyle: 'italic',
    fontWeight: 500,
    fontSize: '2em',
    lineHeight: 1.2,
    color: colors.heading,
  },
  // In the 28px heading.
  continued: {
    marginLeft: '0.3em',
    fontFamily: fonts.mono,
    fontStyle: 'normal',
    fontSize: '0.3929em',
    color: colors.icon,
  },
  // Contents
  toc: {
    listStyle: 'none',
    margin: '1.25em 0 0',
    padding: 0,
  },
  entry: {
    paddingBlock: '0.7em',
  },
  line: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '0.6em',
  },
  // 1.6em of the page base, in its own 11px.
  number: {
    flex: 'none',
    width: '2.036em',
    fontFamily: fonts.mono,
    fontSize: '0.7857em',
    color: colors.accent,
  },
  entryTitle: {
    fontFamily: fonts.serif,
    fontSize: '1.357em',
    lineHeight: 1.3,
    color: colors.heading,
  },
  // Only titles with a destination behave as links.
  entryLink: {
    color: {
      default: colors.heading,
      ':hover': colors.accent,
    },
    transition: 'color 0.2s var(--ease)',
    borderRadius: '2px',
    outline: {
      default: 'none',
      ':focus-visible': `2px solid ${colors.accent}`,
    },
    outlineOffset: '2px',
  },
  leader: {
    flex: 1,
    minWidth: '1em',
    transform: 'translateY(-0.286em)',
    borderBottomWidth: '1px',
    borderBottomStyle: 'dotted',
    borderBottomColor: colors.strongFill,
  },
  kind: {
    fontFamily: fonts.mono,
    fontSize: '0.7857em',
    color: colors.icon,
  },
  // Indented past the number column, in its own 12.5px.
  description: {
    margin: '0.25em 0 0 2.464em',
    fontSize: '0.8929em',
    lineHeight: 1.55,
    color: colors.secondary,
  },
  inlineLink: {
    color: colors.body,
  },
  shelf: {
    margin: '1.12em 0 0',
    fontSize: '0.8929em',
    lineHeight: 1.6,
    color: colors.secondary,
  },
  // In the 12.5px shelf line.
  shelfLabel: {
    marginRight: '0.636em',
    fontFamily: fonts.mono,
    fontSize: '0.88em',
    color: colors.icon,
  },
  // About
  prose: {
    marginTop: '1.25em',
    fontSize: '1.0714em',
    lineHeight: 1.75,
    color: colors.bodyAlt,
  },
  // In the 15px prose.
  paragraph: {
    margin: '0 0 0.933em',
  },
  // The statement reads as an epigraph: no drop cap, since a lone "I"
  // makes a poor one.
  // Keeps a hyphenated word on one line.
  nowrap: {
    whiteSpace: 'nowrap',
  },
  lead: {
    fontFamily: fonts.serif,
    fontSize: '1.333em',
    lineHeight: 1.55,
    color: colors.heading,
  },
  motto: {
    margin: 0,
    marginTop: 'auto',
    paddingTop: '1.273em',
    fontFamily: fonts.serif,
    fontStyle: 'italic',
    fontSize: '1.571em',
    color: colors.heading,
  },
  // Appendix
  devices: {
    listStyle: 'none',
    margin: '1.25em 0 0',
    padding: 0,
    columnCount: 2,
    columnGap: '1.5em',
    fontSize: '1em',
    lineHeight: 1.95,
    color: colors.body,
  },
  retired: {
    textDecoration: 'line-through',
    color: colors.icon,
  },
  note: {
    marginLeft: '0.4em',
    fontStyle: 'italic',
    fontSize: '0.857em',
    color: colors.secondary,
  },
  colophon: {
    margin: 0,
    marginTop: 'auto',
    paddingTop: '1.5em',
    fontFamily: fonts.serif,
    fontStyle: 'italic',
    fontSize: '1em',
    lineHeight: 1.6,
    color: colors.secondary,
  },
  blank: {
    margin: 'auto',
    fontFamily: fonts.serif,
    fontStyle: 'italic',
    fontSize: '1em',
    color: colors.icon,
  },
})

function ProjectLinks({ project }: { project: Project }) {
  // The first link is the project's home; the title carries it.
  return project.links.slice(1).map((link) => (
    <span key={link.label}>
      {' · '}
      {link.url.startsWith('/') ? (
        <Link to={link.url} {...stylex.props(shared.inkLink, styles.inlineLink)}>
          {link.label}
        </Link>
      ) : (
        <a href={link.url} {...stylex.props(shared.inkLink, styles.inlineLink)}>
          {link.label}
        </a>
      )}
    </span>
  ))
}

// The first link is the project's home: an App Store page, a site, or the
// source. A project with no public link shows its name as plain text.
function ProjectTitle({ project }: { project: Project }) {
  const home = project.links[0]
  if (!home) return <span {...stylex.props(styles.entryTitle)}>{project.name}</span>
  return (
    <a href={home.url} {...stylex.props(styles.entryTitle, styles.entryLink)}>
      {project.name}
    </a>
  )
}

const cover = (
  <div {...stylex.props(styles.coverLayout)}>
    <div>
      <div {...stylex.props(styles.title)}>zaxh</div>
      <div {...stylex.props(styles.subtitle)}>Tools &amp; Notes</div>
    </div>
    {/* A paw in a ring: for the cat and the dog. */}
    <svg viewBox="0 0 40 40" {...stylex.props(styles.emblem)} aria-hidden="true">
      <circle cx="20" cy="20" r="18.5" fill="none" stroke="currentColor" strokeWidth="1" />
      <g fill="currentColor">
        <ellipse cx="20" cy="24.5" rx="6" ry="5" />
        <ellipse cx="12.4" cy="17.6" rx="2.4" ry="3" transform="rotate(-22 12.4 17.6)" />
        <ellipse cx="17" cy="12.8" rx="2.4" ry="3.1" />
        <ellipse cx="23" cy="12.8" rx="2.4" ry="3.1" />
        <ellipse cx="27.6" cy="17.6" rx="2.4" ry="3" transform="rotate(22 27.6 17.6)" />
      </g>
    </svg>
    <div {...stylex.props(styles.author)}>Zach</div>
  </div>
)

const frontispiece = (
  <div {...stylex.props(styles.titlePage)}>
    <h1 {...stylex.props(styles.name)}>Zach</h1>
    <div {...stylex.props(styles.rule)} aria-hidden="true" />
    <p {...stylex.props(styles.lede)}>
      Writes code so the cat and dog can have a better life.
    </p>
    <SocialLinks style={styles.social} />
  </div>
)

function contents(entries: Project[], start: number, first: boolean, last: boolean) {
  return (
    <>
      <h2 id={first ? 'work' : undefined} {...stylex.props(styles.heading)}>
        Contents
        {first ? null : <span {...stylex.props(styles.continued)}>continued</span>}
      </h2>
      {/* role="list": Safari drops list semantics when list-style is none. */}
      <ol {...stylex.props(styles.toc)} role="list" start={start + 1}>
        {entries.map((project, index) => (
          <li key={project.slug} {...stylex.props(styles.entry)}>
            <div {...stylex.props(styles.line)}>
              <span {...stylex.props(styles.number)} aria-hidden="true">
                {String(start + index + 1).padStart(2, '0')}
              </span>
              <ProjectTitle project={project} />
              <span {...stylex.props(styles.leader)} aria-hidden="true" />
              <span {...stylex.props(styles.kind)}>{project.kind}</span>
            </div>
            <p {...stylex.props(styles.description)}>
              {project.oneLiner}
              <ProjectLinks project={project} />
            </p>
          </li>
        ))}
      </ol>
      {last && SHELVED.length > 0 ? (
        <p {...stylex.props(styles.shelf)}>
          <span {...stylex.props(styles.shelfLabel)}>shelved</span>
          {SHELVED.map((project, index) => (
            <span key={project.slug}>
              {index > 0 ? ', ' : null}
              {project.links[0] ? (
                <a href={project.links[0].url} {...stylex.props(shared.inkLink)}>
                  {project.name}
                </a>
              ) : (
                project.name
              )}
            </span>
          ))}
        </p>
      ) : null}
    </>
  )
}

const about = (
  <>
    <h2 id="about" {...stylex.props(styles.heading)}>
      About
    </h2>
    <div {...stylex.props(styles.prose)}>
      <p {...stylex.props(styles.paragraph, styles.lead)}>
        I&apos;m passionate about building elegant and efficient software. I
        believe in clean code, simple design, and the power of{' '}
        <span {...stylex.props(styles.nowrap)}>open-source</span>.
      </p>
    </div>
    <p {...stylex.props(styles.motto)}>Slow is fast.</p>
  </>
)

const appendix = (
  <>
    <h2 {...stylex.props(styles.heading)}>Devices</h2>
    <ul {...stylex.props(styles.devices)} role="list">
      {DEVICES.map((device) => (
        <li key={device.what}>
          <span {...stylex.props(device.retired && styles.retired)}>{device.what}</span>
          {device.note ? <span {...stylex.props(styles.note)}>{device.note}</span> : null}
        </li>
      ))}
    </ul>
    <p {...stylex.props(styles.colophon)}>
      Set in Source Serif and Inter. Built with React, Vite, and StyleX. ©{' '}
      {new Date().getFullYear()} Zach.
    </p>
  </>
)

type Sheet = { title: string; body: ReactNode; blank?: boolean }

// The book in reading order. Contents grows with the project list.
const SHEETS: Sheet[] = (() => {
  const chunks: Project[][] = []
  for (let i = 0; i < ACTIVE.length; i += ENTRIES_PER_PAGE) {
    chunks.push(ACTIVE.slice(i, i + ENTRIES_PER_PAGE))
  }
  const sheets: Sheet[] = [
    { title: 'Frontispiece', body: frontispiece },
    ...chunks.map((entries, i) => ({
      title: 'Contents',
      body: contents(entries, i * ENTRIES_PER_PAGE, i === 0, i === chunks.length - 1),
    })),
  ]
  // Spreads need pairs of pages; a blank page keeps the count even.
  if (sheets.length % 2 === 1) {
    sheets.push({
      title: 'Blank',
      blank: true,
      body: <p {...stylex.props(styles.blank)}>This page is intentionally left blank.</p>,
    })
  }
  sheets.push({ title: 'About', body: about }, { title: 'Appendix', body: appendix })
  return sheets
})()

// Hash targets for the nav links: #work opens on contents, #about on about.
const SECTIONS = {
  work: 0,
  about: Math.floor(SHEETS.findIndex((s) => s.title === 'About') / 2),
}

// A back-turn is named after the last real page it returns to.
function titleBefore(index: number) {
  return SHEETS.slice(0, index + 1).reverse().find((sheet) => !sheet.blank)?.title
}

const PAGES = SHEETS.map((sheet, index) => {
  const side = index % 2 === 0 ? 'left' : 'right'
  const last = index === SHEETS.length - 1
  const bare = index === 0 || sheet.blank
  let action: ReactNode = null
  if (side === 'right' && !last) {
    action = <TurnButton by={1}>{SHEETS[index + 1]?.title} →</TurnButton>
  } else if (side === 'left' && index > 0) {
    action = <TurnButton by={-1}>← {titleBefore(index - 1)}</TurnButton>
  }
  return (
    <Page
      key={index}
      side={side}
      // As in print, the frontispiece and blank pages carry no running head
      // or folio.
      head={
        bare ? ['', ''] : side === 'left' ? ['zaxh.org', sheet.title] : [sheet.title, 'zaxh']
      }
      folio={bare ? '' : String(index)}
      action={action}
      blank={sheet.blank}
    >
      {sheet.body}
    </Page>
  )
})

export default function RootPage() {
  return <Book cover={cover} pages={PAGES} sections={SECTIONS} corner={<ThemeSwitcher />} />
}
