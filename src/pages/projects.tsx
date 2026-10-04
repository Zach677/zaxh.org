import type { ReactNode } from 'react'
import * as stylex from '@stylexjs/stylex'
import { Link } from 'react-router'

import { colors, fonts, typeScale } from '../design-system/tokens.stylex'
import { shared } from '../design-system/shared.stylex'
import {
  projects,
  type Project,
  type ProjectLink as ProjectLinkData,
} from '../../data/projects'

const styles = stylex.create({
  main: {
    maxWidth: '52rem',
  },
  title: {
    margin: '1.25rem 0 0.5rem',
  },
  lede: {
    margin: '0 0 1.75rem',
    maxWidth: '34rem',
    fontSize: typeScale.copy14,
    lineHeight: typeScale.copy14Lh,
    color: colors.secondary,
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: colors.separator,
  },
  card: {
    paddingBlock: '1.15rem',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.separatorSoft,
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  name: {
    fontFamily: fonts.mono,
    fontSize: typeScale.copy15,
    fontWeight: 500,
    lineHeight: 1.35,
    color: colors.heading,
    margin: 0,
  },
  nameLink: {
    color: 'inherit',
  },
  arrow: {
    marginLeft: '0.3em',
    fontSize: '0.8em',
    color: colors.secondary,
  },
  tag: {
    fontFamily: fonts.mono,
    fontSize: typeScale.label12,
    lineHeight: typeScale.label12Lh,
    color: colors.secondary,
  },
  oneLiner: {
    marginTop: '0.35rem',
    marginBottom: 0,
    fontSize: typeScale.copy14,
    lineHeight: typeScale.copy14Lh,
    color: colors.body,
    maxWidth: '36rem',
  },
  tags: {
    marginTop: '0.55rem',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.25rem 0.9rem',
  },
  links: {
    marginTop: '0.65rem',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.65rem 1.1rem',
  },
  link: {
    fontSize: typeScale.copy13,
    lineHeight: typeScale.copy13Lh,
    color: colors.body,
  },
})

function ProjectCard({ project }: { project: Project }) {
  // The first link is the project's home; the name carries it.
  const [home, ...extra] = project.links

  return (
    <li {...stylex.props(styles.card)} id={project.slug}>
      <div {...stylex.props(styles.cardTop)}>
        <h2 {...stylex.props(styles.name)}>
          {home ? (
            <ProjectLink link={home} style={styles.nameLink}>
              {project.name}
              <span {...stylex.props(styles.arrow)} aria-hidden="true">
                ↗
              </span>
            </ProjectLink>
          ) : (
            project.name
          )}
        </h2>
        {project.status === 'paused' ? (
          <span {...stylex.props(shared.regLabel)}>paused</span>
        ) : null}
      </div>
      <p {...stylex.props(styles.oneLiner)}>{project.oneLiner}</p>
      {project.tags.length > 0 ? (
        <div {...stylex.props(styles.tags)}>
          {project.tags.map((tag) => (
            <span key={tag} {...stylex.props(styles.tag)}>
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      {extra.length > 0 ? (
        <div {...stylex.props(styles.links)}>
          {extra.map((link) => (
            <ProjectLink key={link.label} link={link} style={styles.link}>
              {link.label}
            </ProjectLink>
          ))}
        </div>
      ) : null}
    </li>
  )
}

function ProjectLink({
  link,
  style,
  children,
}: {
  link: ProjectLinkData
  style: stylex.StyleXStyles
  children: ReactNode
}) {
  const props = stylex.props(shared.inkLink, style)
  return link.url.startsWith('/') ? (
    <Link to={link.url} {...props}>
      {children}
    </Link>
  ) : (
    <a href={link.url} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  )
}

export default function ProjectsPage() {
  return (
    <main {...stylex.props(styles.main)}>
      <h1 {...stylex.props(shared.pageTitle, styles.title)}>Projects</h1>
      <p {...stylex.props(styles.lede)}>
        Things I build and maintain.
      </p>

      {/* role="list": Safari drops list semantics when list-style is none. */}
      <ul {...stylex.props(styles.list)} role="list">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ul>
    </main>
  )
}
