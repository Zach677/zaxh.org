import { useMemo, useState, type CSSProperties } from 'react'
import * as stylex from '@stylexjs/stylex'

import type { Project } from '../../../data/projects'
import { colors, fonts, typeScale } from '../../design-system/tokens.stylex'
import {
  CENTER,
  calloutSide,
  layoutEdges,
  layoutProjects,
  nodeWeight,
  pickPinned,
  polarAngle,
  projectCallout,
  projectHref,
  type MapPoint,
} from './layout'

const STAR_FIELD: { x: number; y: number; cross?: boolean }[] = [
  { x: 8, y: 12 },
  { x: 18, y: 40, cross: true },
  { x: 12, y: 72 },
  { x: 28, y: 88 },
  { x: 42, y: 8, cross: true },
  { x: 55, y: 18 },
  { x: 88, y: 14 },
  { x: 92, y: 38, cross: true },
  { x: 85, y: 68 },
  { x: 72, y: 90 },
  { x: 48, y: 92 },
  { x: 6, y: 52 },
  { x: 96, y: 82 },
  { x: 64, y: 6 },
  { x: 36, y: 48, cross: true },
]

const styles = stylex.create({
  fallback: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  fallbackItem: {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.separatorSoft,
    paddingBlock: '0.85rem',
  },
  fallbackName: {
    fontFamily: fonts.mono,
    fontSize: typeScale.copy14,
    color: colors.heading,
    textDecoration: 'none',
  },
  fallbackOne: {
    marginTop: '0.25rem',
    marginBottom: 0,
    fontSize: typeScale.copy13,
    lineHeight: typeScale.copy13Lh,
    color: colors.secondary,
  },
  centerFallback: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.55rem',
    marginBottom: '1.25rem',
    fontFamily: fonts.mono,
    fontSize: typeScale.label12,
    letterSpacing: '0.08em',
    color: colors.secondary,
  },
  centerDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    backgroundColor: colors.accent,
  },
})

type Mode = 'featured' | 'dense'
type HrefMode = 'external' | 'anchor'

export function ConstellationMap({
  projects,
  mode = 'featured',
  showArc = true,
  mobileFallback = true,
  hrefMode = 'external',
  pinNotes = false,
  showLegend = false,
}: {
  projects: Project[]
  mode?: Mode
  showArc?: boolean
  /** When false, skip the stacked list used on small screens (e.g. projects page already lists). */
  mobileFallback?: boolean
  /** Home opens the project URL; /projects jumps to the card. */
  hrefMode?: HrefMode
  /** Always-on atlas notes. Too loud inside a small plate. */
  pinNotes?: boolean
  showLegend?: boolean
}) {
  const [active, setActive] = useState<string | null>(null)

  const nodes = useMemo(() => {
    const points = layoutProjects(projects, mode)
    return projects
      .map((project, index) => ({
        project,
        point: points[index] ?? CENTER,
        href:
          hrefMode === 'anchor' ? `#${project.slug}` : projectHref(project),
        callout: projectCallout(project),
        weight: nodeWeight(project.featured, project.status),
      }))
      .sort((a, b) => polarAngle(a.point) - polarAngle(b.point))
  }, [projects, mode, hrefMode])

  const edges = useMemo(
    () =>
      layoutEdges(
        CENTER,
        nodes.map((n) => ({
          slug: n.project.slug,
          point: n.point,
          featured: n.project.featured,
        })),
      ),
    [nodes],
  )

  const pinned = useMemo(
    () => (pinNotes ? pickPinned(nodes, 2) : []),
    [pinNotes, nodes],
  )
  const pinnedSlugs = useMemo(
    () => new Set(pinned.map((n) => n.project.slug)),
    [pinned],
  )
  const activeNode = nodes.find((n) => n.project.slug === active)

  return (
    <>
      <div
        className="cx-map"
        role="group"
        aria-label="Project constellation map"
      >
        <div className="cx-stars" aria-hidden="true">
          {STAR_FIELD.map((s, i) => (
            <span
              key={i}
              className={`cx-star${s.cross ? ' cross' : ''}`}
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
            />
          ))}
        </div>

        {showArc ? (
          <>
            <div className="cx-arc" aria-hidden="true" />
            <span className="cx-arc-label" aria-hidden="true">
              DEC −23°
            </span>
          </>
        ) : null}

        {showLegend ? (
          <div className="cx-legend" aria-hidden="true">
            <span className="cx-legend-item">
              <i className="cx-ring" />
              active
            </span>
            <span className="cx-legend-item">
              <i className="cx-ring is-sm" />
              paused
            </span>
          </div>
        ) : null}

        <div className="cx-graph cx-drift">
          <svg className="cx-edges" aria-hidden="true">
            {edges.map((e, i) => (
              <line
                key={e.key}
                className="cx-edge"
                x1={`${e.from.x}%`}
                y1={`${e.from.y}%`}
                x2={`${e.to.x}%`}
                y2={`${e.to.y}%`}
                style={{ animationDelay: `${40 + i * 60}ms` }}
              />
            ))}
          </svg>

          <div
            className="cx-node cx-center"
            style={{
              left: `${CENTER.x}%`,
              top: `${CENTER.y}%`,
            }}
            aria-hidden="true"
          >
            <span className="cx-pulse" />
            <span className="cx-pulse" />
            <span className="cx-dot" />
            <span className="cx-label">zach</span>
          </div>

          {nodes.map((n) => {
            const Tag = n.href ? 'a' : 'button'
            const external = hrefMode === 'external' && n.href?.startsWith('http')
            return (
              <Tag
                key={n.project.slug}
                className={`cx-node is-${n.weight}${active === n.project.slug ? ' is-active' : ''}`}
                style={{
                  left: `${n.point.x}%`,
                  top: `${n.point.y}%`,
                }}
                href={n.href}
                type={n.href ? undefined : 'button'}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                aria-label={`${n.project.name}: ${n.callout}`}
                onMouseEnter={() => setActive(n.project.slug)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(n.project.slug)}
                onBlur={() => setActive(null)}
              >
                <span className="cx-ring" />
                <span className="cx-label">{n.project.name}</span>
              </Tag>
            )
          })}

          {pinned.map((n) => (
            <Callout
              key={`pin-${n.project.slug}`}
              point={n.point}
              text={n.callout}
              pinned
              hot={active === n.project.slug}
            />
          ))}

          {activeNode && !pinnedSlugs.has(activeNode.project.slug) ? (
            <Callout
              key={activeNode.project.slug}
              point={activeNode.point}
              text={activeNode.callout}
            />
          ) : null}
        </div>
      </div>

      {mobileFallback ? <MobileFallback projects={projects} /> : null}
    </>
  )
}

function MobileFallback({ projects }: { projects: Project[] }) {
  const root = stylex.props(styles.fallback)
  const list = stylex.props(styles.fallback)
  return (
    <div
      className={`cx-mobile-fallback ${root.className ?? ''}`.trim()}
      style={root.style}
    >
      <div {...stylex.props(styles.centerFallback)}>
        <span {...stylex.props(styles.centerDot)} aria-hidden="true" />
        zach
      </div>
      <ul className={list.className} style={list.style}>
        {projects.map((project) => {
          const href = projectHref(project)
          const callout = projectCallout(project)
          return (
            <li key={project.slug} {...stylex.props(styles.fallbackItem)}>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    href.startsWith('http') ? 'noopener noreferrer' : undefined
                  }
                  {...stylex.props(styles.fallbackName)}
                >
                  {project.name}
                </a>
              ) : (
                <span {...stylex.props(styles.fallbackName)}>{project.name}</span>
              )}
              <p {...stylex.props(styles.fallbackOne)}>{callout}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function Callout({
  point,
  text,
  pinned = false,
  hot = false,
}: {
  point: MapPoint
  text: string
  pinned?: boolean
  hot?: boolean
}) {
  const side = calloutSide(point)
  const leaderW = 28
  const drop = 14
  const pad = 12

  const wrapStyle: CSSProperties =
    side === 'right'
      ? {
        left: `calc(${point.x}% + ${pad}px)`,
        top: `calc(${point.y}% - 2px)`,
      }
      : {
        right: `calc(${100 - point.x}% + ${pad}px)`,
        top: `calc(${point.y}% - 2px)`,
        textAlign: 'right',
      }

  const className = [
    'cx-callout',
    pinned ? 'is-pinned' : '',
    hot ? 'is-hot' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={className} style={wrapStyle}>
      <span
        className="cx-leader"
        style={
          side === 'right'
            ? { left: 0, width: leaderW, top: 0 }
            : { right: 0, width: leaderW, top: 0 }
        }
        aria-hidden="true"
      />
      <span
        className="cx-leader-v"
        style={
          side === 'right'
            ? { left: leaderW, top: 0, height: drop }
            : { right: leaderW, top: 0, height: drop }
        }
        aria-hidden="true"
      />
      <span
        className="cx-leader-dot"
        style={
          side === 'right'
            ? { left: leaderW - 1, top: drop - 1 }
            : { right: leaderW - 1, top: drop - 1 }
        }
        aria-hidden="true"
      />
      <span
        className="cx-callout-text"
        style={
          side === 'right'
            ? { display: 'block', marginLeft: leaderW + 8, marginTop: drop - 6 }
            : {
              display: 'block',
              marginRight: leaderW + 8,
              marginTop: drop - 6,
            }
        }
      >
        {text}
      </span>
    </div>
  )
}
