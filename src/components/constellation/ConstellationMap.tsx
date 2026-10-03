import { useRef, useState, type MouseEvent } from 'react'

import type { Project } from '../../../data/projects'

type Point = { x: number; y: number }
type Star = Project & { star: Point }

const CENTER: Point = { x: 50, y: 50 }

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

/** Clockwise from 12 o'clock, so Tab walks the map like a clock face. */
function clockAngle(p: Point): number {
  const a = Math.atan2(p.y - CENTER.y, p.x - CENTER.x)
  return (a + Math.PI * 2.5) % (Math.PI * 2)
}

function edgesFor(stars: Star[]) {
  const bySlug = new Map(stars.map((s) => [s.slug, s]))
  const spokes = stars.map((s) => ({
    key: `zach~${s.slug}`,
    from: CENTER,
    to: s.star,
    related: false,
  }))
  const links = stars.flatMap((s) =>
    (s.related ?? []).flatMap((slug) => {
      const other = bySlug.get(slug)
      return other
        ? [{ key: `${s.slug}~${slug}`, from: s.star, to: other.star, related: true }]
        : []
    }),
  )
  return [...spokes, ...links]
}

export function ConstellationMap({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string | null>(null)
  // Touch has no hover: the first tap shows the note, the second opens the link.
  const firstTap = useRef(false)

  const stars = projects
    .filter((p): p is Star => p.star != null)
    .sort((a, b) => clockAngle(a.star) - clockAngle(b.star))
  const edges = edgesFor(stars)
  const activeStar = stars.find((s) => s.slug === active)

  function onClick(e: MouseEvent, slug: string) {
    if (!firstTap.current) return
    firstTap.current = false
    e.preventDefault()
    setActive(slug)
  }

  return (
    <>
      <div className="cx-map" role="group" aria-label="Project map">
        <div className="cx-stars" aria-hidden="true">
          {STAR_FIELD.map((s, i) => (
            <span
              key={i}
              className={`cx-star${s.cross ? ' cross' : ''}`}
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
            />
          ))}
        </div>

        <div className="cx-graph cx-drift">
          <svg className="cx-edges" aria-hidden="true">
            {edges.map((e, i) => (
              <line
                key={e.key}
                className={`cx-edge${e.related ? ' is-related' : ''}`}
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
            style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%` }}
            aria-hidden="true"
          >
            <span className="cx-pulse" />
            <span className="cx-pulse" />
            <span className="cx-dot" />
            <span className="cx-label">zach</span>
          </div>

          {stars.map((s) => {
            const href = s.links[0]?.url
            const note = s.callout ?? s.oneLiner
            return (
              <a
                key={s.slug}
                className={`cx-node${active === s.slug ? ' is-active' : ''}`}
                style={{ left: `${s.star.x}%`, top: `${s.star.y}%` }}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.name}: ${note}`}
                onPointerDown={(e) => {
                  firstTap.current = e.pointerType === 'touch' && active !== s.slug
                }}
                onClick={(e) => onClick(e, s.slug)}
                onMouseEnter={() => setActive(s.slug)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(s.slug)}
                onBlur={() => setActive(null)}
              >
                <span className="cx-ring" />
                <span className="cx-label">{s.name}</span>
              </a>
            )
          })}
        </div>
      </div>

      {/* Links carry the note in aria-label; this line is visual only. */}
      <p className="cx-caption" aria-hidden="true">
        {activeStar ? (
          <span key={activeStar.slug} className="cx-caption-text">
            <b>{activeStar.name}</b> · {activeStar.callout ?? activeStar.oneLiner}
          </span>
        ) : (
          <span className="cx-hint">tap a star · tap again to open</span>
        )}
      </p>
    </>
  )
}
