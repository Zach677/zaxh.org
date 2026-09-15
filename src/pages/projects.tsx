import * as stylex from '@stylexjs/stylex'
import { Link } from 'react-router'

import { colors, fonts, typeScale } from '../design-system/tokens.stylex'
import { shared } from '../design-system/shared.stylex'
import {
  privateProjects,
  publicProjects,
  type Project,
  type ProjectStatus,
} from '../../data/projects'

const styles = stylex.create({
  main: {
    maxWidth: '52rem',
  },
  title: {
    fontFamily: fonts.mono,
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: typeScale.copy16,
    lineHeight: typeScale.copy16Lh,
    letterSpacing: '0.08em',
    textTransform: 'lowercase',
    margin: '1.25rem 0 0.5rem',
    color: colors.heading,
  },
  lede: {
    margin: '0 0 1.75rem',
    maxWidth: '34rem',
    fontSize: typeScale.copy14,
    lineHeight: typeScale.copy14Lh,
    color: colors.secondary,
  },
  sectionHead: {
    marginBottom: '0.75rem',
    paddingBottom: '0.65rem',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.separator,
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
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
  meta: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'baseline',
    flexShrink: 0,
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
    gap: '0.45rem 0.75rem',
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
  privateWrap: {
    marginTop: '1.75rem',
  },
  privateSummary: {
    cursor: 'pointer',
    listStyle: 'none',
  },
})

const STATUS_LABEL: Record<ProjectStatus, string> = {
  active: 'active',
  paused: 'paused',
  archive: 'archive',
}

function ProjectCard({ project }: { project: Project }) {
  const isPrivate = project.visibility === 'private'

  return (
    <li {...stylex.props(styles.card)} id={project.slug}>
      <div {...stylex.props(styles.cardTop)}>
        <h2 {...stylex.props(styles.name)}>{project.name}</h2>
        <div {...stylex.props(styles.meta)}>
          <span {...stylex.props(shared.regLabel)}>
            {STATUS_LABEL[project.status]}
          </span>
          {isPrivate ? (
            <span {...stylex.props(shared.regLabel)}>private</span>
          ) : null}
        </div>
      </div>
      <p {...stylex.props(styles.oneLiner)}>{project.oneLiner}</p>
      {project.tags.length > 0 ? (
        <div {...stylex.props(styles.tags)}>
          {project.tags.map((tag) => (
            <span key={tag} {...stylex.props(shared.regLabel)}>
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      {project.links.length > 0 ? (
        <div {...stylex.props(styles.links)}>
          {project.links.map((link) =>
            link.url.startsWith('/') ? (
              <Link
                key={link.label}
                to={link.url}
                {...stylex.props(shared.inkLink, styles.link)}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                {...stylex.props(shared.inkLink, styles.link)}
              >
                {link.label}
              </a>
            ),
          )}
        </div>
      ) : null}
    </li>
  )
}

export default function ProjectsPage() {
  const publicOnes = publicProjects()
  const privateOnes = privateProjects()

  return (
    <main {...stylex.props(styles.main)}>
      <h1 {...stylex.props(styles.title)}>projects</h1>
      <p {...stylex.props(styles.lede)}>
        Public satellites around zach.
      </p>

      <div {...stylex.props(styles.sectionHead)}>
        <span {...stylex.props(shared.regLabel)}>Public</span>
      </div>
      <ul {...stylex.props(styles.list)}>
        {publicOnes.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ul>

      {privateOnes.length > 0 ? (
        <details {...stylex.props(styles.privateWrap)}>
          <summary {...stylex.props(shared.regLabel, styles.privateSummary)}>
            {privateOnes.length} private tools
          </summary>
          <ul {...stylex.props(styles.list)}>
            {privateOnes.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </ul>
        </details>
      ) : null}
    </main>
  )
}
