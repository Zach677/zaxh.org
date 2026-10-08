import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import * as stylex from '@stylexjs/stylex'
import { useLocation } from 'react-router'

import { colors, fonts } from '../../design-system/tokens.stylex'
import { shared } from '../../design-system/shared.stylex'

// Below this size there is no room for a two-page spread: the cover lifts
// off once and the pages stack in reading order.
const NARROW_QUERY = '(max-width: 860px), (max-height: 540px)'
const NARROW = `@media ${NARROW_QUERY}`
const REDUCE = '@media (prefers-reduced-motion: reduce)'
const SEEN_KEY = 'book-open'
const TURN_MS = 1000
const AUTO_OPEN_MS = 700
// A critically damped spring sampled into linear(): it moves at once and
// lands softly, with no overshoot (a hard cover cannot pass flat).
const SPRING =
  'linear(0, 0.021, 0.072, 0.141, 0.218, 0.299, 0.378, 0.453, 0.522, 0.585, 0.642, 0.693, 0.737, 0.776, 0.81, 0.839, 0.864, 0.886, 0.904, 0.919, 0.932, 0.943, 0.953, 0.961, 0.967, 0.973, 0.977, 0.981, 0.984, 0.987, 0.989, 0.991, 1)'
const FLAT = 'perspective(2400px) rotateY(0deg)'
// Pages are set for a 680px-tall book and scale with it as a whole, like a
// printed page: what fits on a page fits at every size. Sizes inside a page
// are in em; this is the page's 14px base at the design height.
const PAGE_TYPE = {
  default: 'calc(100cqh * 14 / 680)',
  [NARROW]: '14px',
}
const TURNED = 'perspective(2400px) rotateY(-180deg)'

const TurnContext = createContext<(by: number) => void>(() => {})

function subscribeNarrow(onChange: () => void) {
  const query = matchMedia(NARROW_QUERY)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

const subscribeNothing = () => () => {}

// The prerendered book is open, so it reads without JavaScript. index.html
// sets html[data-book="closed"] when this visit should play the opening.
function startsOpen() {
  return typeof document === 'undefined' || document.documentElement.dataset.book !== 'closed'
}

const shade = stylex.keyframes({
  '0%': { opacity: 0 },
  '50%': { opacity: 1 },
  '100%': { opacity: 0 },
})

const motion = {
  transitionDuration: {
    default: `${TURN_MS}ms`,
    [REDUCE]: '0s',
  },
  transitionTimingFunction: SPRING,
} as const

const styles = stylex.create({
  desk: {
    minHeight: '100svh',
    display: {
      default: 'grid',
      [NARROW]: 'block',
    },
    placeItems: 'center',
    padding: {
      default: '3rem 1rem 4rem',
      [NARROW]: 0,
    },
    // A turning leaf bulges toward the reader. Clip it, so it never adds a
    // scrollbar mid-turn. `clip` keeps no scroll container, unlike hidden.
    overflow: {
      default: 'clip',
      [NARROW]: 'visible',
    },
  },
  book: {
    position: 'relative',
    width: {
      default: 'min(94vw, calc(min(100svh - 7rem, 680px) * 1.42))',
      [NARROW]: 'auto',
    },
    height: {
      default: 'min(100svh - 7rem, 680px)',
      [NARROW]: 'auto',
    },
    // Size container for PAGE_TYPE. Off when narrow: containment would trap
    // the fixed cover inside the book.
    containerType: {
      default: 'size',
      [NARROW]: 'normal',
    },
    transitionProperty: 'transform',
    ...motion,
  },
  // Closed, the cover (the right half) sits in the middle of the desk.
  closed: {
    transform: {
      default: 'translateX(-25%)',
      [NARROW]: 'none',
    },
  },
  instant: {
    transitionDuration: '0s',
    transitionDelay: '0s',
  },
  wide: {
    display: {
      default: null,
      [NARROW]: 'none',
    },
  },
  // The page block under the leaves gives the book its thickness.
  blockLeft: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '50%',
    borderRadius: '4px 0 0 4px',
    backgroundColor: colors.page,
    boxShadow: `-1px 1px 0 ${colors.fill}, -2px 2px 0 ${colors.page}, -3px 3px 0 ${colors.fill}, -4px 4px 0 ${colors.page}, -5px 5px 0 ${colors.strongFill}, 0 24px 50px -24px rgba(20, 19, 18, 0.45)`,
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: '0.2s',
  },
  blockLeftOpen: {
    opacity: 1,
    transitionDelay: `${TURN_MS * 0.4}ms`,
  },
  blockRight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: '50%',
    borderRadius: '0 4px 4px 0',
    backgroundColor: colors.page,
    boxShadow: `1px 1px 0 ${colors.fill}, 2px 2px 0 ${colors.page}, 3px 3px 0 ${colors.fill}, 4px 4px 0 ${colors.page}, 5px 5px 0 ${colors.strongFill}, 0 24px 50px -24px rgba(20, 19, 18, 0.45)`,
  },
  ribbon: {
    position: 'absolute',
    left: 'calc(50% + 2.2rem)',
    bottom: '-38px',
    width: '13px',
    height: '70px',
    backgroundColor: colors.accent,
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)',
  },
  // A leaf turns around the spine; its two faces are two pages.
  leaf: {
    position: {
      default: 'absolute',
      [NARROW]: 'static',
    },
    top: 0,
    left: '50%',
    width: {
      default: '50%',
      [NARROW]: 'auto',
    },
    height: {
      default: '100%',
      [NARROW]: 'auto',
    },
    transformOrigin: 'left center',
    transformStyle: 'preserve-3d',
    transform: {
      default: FLAT,
      [NARROW]: 'none',
    },
    transitionProperty: 'transform',
    ...motion,
  },
  turned: {
    transform: {
      default: TURNED,
      [NARROW]: 'none',
    },
  },
  face: {
    position: {
      default: 'absolute',
      [NARROW]: 'static',
    },
    inset: 0,
    overflow: {
      default: 'hidden',
      [NARROW]: 'visible',
    },
    backfaceVisibility: 'hidden',
  },
  back: {
    transform: {
      default: 'rotateY(180deg)',
      [NARROW]: 'none',
    },
  },
  // A page darkens as it lifts toward the reader, then clears as it lands.
  shade: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    opacity: 0,
    backgroundImage: 'linear-gradient(to right, rgba(20, 19, 18, 0.28), rgba(20, 19, 18, 0.06))',
  },
  shading: {
    animationName: {
      default: shade,
      [REDUCE]: 'none',
    },
    animationDuration: `${TURN_MS * 0.8}ms`,
    animationTimingFunction: 'ease-in-out',
  },
  lastPage: {
    position: {
      default: 'absolute',
      [NARROW]: 'static',
    },
    zIndex: 0,
    top: 0,
    left: '50%',
    width: {
      default: '50%',
      [NARROW]: 'auto',
    },
    height: {
      default: '100%',
      [NARROW]: 'auto',
    },
  },
  cover: {
    position: {
      default: 'absolute',
      [NARROW]: 'fixed',
    },
    zIndex: {
      default: null,
      [NARROW]: 10,
    },
    display: 'grid',
    placeItems: 'center',
    textAlign: 'center',
    fontSize: PAGE_TYPE,
    color: colors.foil,
    borderRadius: {
      default: '0 6px 6px 0',
      [NARROW]: 0,
    },
    backgroundImage:
      'linear-gradient(90deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0) 5%, rgba(255, 255, 255, 0.06) 6%, rgba(0, 0, 0, 0) 9%), repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.025) 0 2px, rgba(0, 0, 0, 0.03) 2px 4px)',
    backgroundColor: colors.cloth,
    boxShadow:
      'inset 0 0 0 1px rgba(255, 255, 255, 0.05), 0 30px 60px -30px rgba(20, 19, 18, 0.6)',
    transformOrigin: 'left center',
    transitionProperty: 'transform, opacity',
    ...motion,
  },
  // Narrow screens have no leaf to turn: the cover itself swings away.
  coverAway: {
    transform: {
      default: null,
      [NARROW]: 'perspective(1400px) rotateY(-100deg)',
    },
    opacity: {
      default: null,
      [NARROW]: 0,
    },
    pointerEvents: {
      default: null,
      [NARROW]: 'none',
    },
  },
  coverFrame: {
    position: 'absolute',
    inset: '22px 22px 22px 34px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: `color-mix(in oklab, ${colors.foil} 55%, transparent)`,
    borderRadius: '2px',
    pointerEvents: 'none',
  },
  coverButton: {
    position: 'absolute',
    inset: 0,
    cursor: 'pointer',
    borderRadius: 'inherit',
    outline: {
      default: 'none',
      ':focus-visible': `2px solid ${colors.foil}`,
    },
    outlineOffset: '-8px',
  },
  hint: {
    position: 'fixed',
    left: '50%',
    bottom: '1.25rem',
    transform: 'translateX(-50%)',
    margin: 0,
    fontFamily: fonts.mono,
    fontSize: '12px',
    color: colors.secondary,
  },
  corner: {
    position: {
      default: 'fixed',
      [NARROW]: 'static',
    },
    right: '1.5rem',
    bottom: '1.25rem',
    display: 'flex',
    justifyContent: 'center',
    padding: {
      default: 0,
      [NARROW]: '1.5rem 0 2.5rem',
    },
  },
})

/**
 * A book of spreads. The cover opens onto the first spread; each further
 * leaf turns to the next. `pages` is in reading order and must be even:
 * page 0 is printed on the back of the cover, the last page lies under all
 * leaves. `sections` maps a URL hash (without #) to a spread index.
 */
export function Book({
  cover,
  pages,
  sections = {},
  corner,
}: {
  cover: ReactNode
  pages: ReactNode[]
  sections?: Record<string, number>
  corner?: ReactNode
}) {
  const spreads = pages.length / 2
  const { hash } = useLocation()
  const narrow = useSyncExternalStore(
    subscribeNarrow,
    () => matchMedia(NARROW_QUERY).matches,
    () => false,
  )
  // Prerendered HTML has no inert pages, so it reads in full without JS.
  const mounted = useSyncExternalStore(subscribeNothing, () => true, () => false)
  const [open, setOpen] = useState(startsOpen)
  // Skip transitions for the first frame when the book starts open.
  const [instant, setInstant] = useState(open)
  const [spread, setSpread] = useState(() => sections[hash.slice(1)] ?? 0)
  // The leaf in motion rides above both stacks until it lands.
  const [moving, setMoving] = useState<number | null>(null)

  const openBook = useCallback(() => {
    if (open) return
    setOpen(true)
    setMoving(0)
    sessionStorage.setItem(SEEN_KEY, '1')
  }, [open])

  const turn = useCallback(
    (by: number) => {
      if (!open) {
        openBook()
        return
      }
      const to = Math.min(Math.max(spread + by, 0), spreads - 1)
      if (to === spread) return
      // Forward lifts the next leaf; back lowers the current one.
      setMoving(to > spread ? to : spread)
      setSpread(to)
    },
    [open, openBook, spread, spreads],
  )

  // React owns the book now; drop the pre-paint flag from index.html.
  useLayoutEffect(() => {
    delete document.documentElement.dataset.book
  }, [])

  useEffect(() => {
    if (!instant) return undefined
    const id = requestAnimationFrame(() => setInstant(false))
    return () => cancelAnimationFrame(id)
  }, [instant])

  useEffect(() => {
    if (open) return undefined
    const id = setTimeout(openBook, AUTO_OPEN_MS)
    return () => clearTimeout(id)
  }, [open, openBook])

  useEffect(() => {
    if (moving === null) return undefined
    const id = setTimeout(() => setMoving(null), TURN_MS)
    return () => clearTimeout(id)
  }, [moving, spread])

  // Section links jump straight to their spread, without a turn.
  useEffect(() => {
    const target = sections[hash.slice(1)]
    if (target === undefined) return
    setInstant(true)
    setOpen(true)
    setSpread(target)
  }, [hash, sections])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey || narrow) return
      if (e.key === 'ArrowRight') turn(1)
      if (e.key === 'ArrowLeft') turn(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [turn, narrow])

  // Leaf 0 is the cover. A leaf is turned once the book is open past it.
  const isTurned = (leaf: number) => (leaf === 0 ? open : leaf <= spread)

  // Turned leaves stack on the left (latest on top), the rest on the right
  // (earliest on top).
  const zIndex = (leaf: number) => {
    if (leaf === moving) return spreads + 2
    return isTurned(leaf) ? leaf + 1 : spreads - leaf + 1
  }

  // Pages that are face down or covered must not take focus.
  const inert = (page: number) =>
    mounted && !(open && (narrow || Math.floor(page / 2) === spread))

  const shading = (leaf: number) => (
    <div
      {...stylex.props(styles.shade, styles.wide, leaf === moving && styles.shading)}
      aria-hidden="true"
    />
  )

  return (
    <TurnContext value={turn}>
      <div {...stylex.props(styles.desk)}>
        <div
          id="book"
          {...stylex.props(styles.book, !open && styles.closed, instant && styles.instant)}
        >
          <div {...stylex.props(styles.ribbon, styles.wide)} aria-hidden="true" />
          <div
            {...stylex.props(
              styles.blockLeft,
              styles.wide,
              open && styles.blockLeftOpen,
              instant && styles.instant,
            )}
            aria-hidden="true"
          />
          <div {...stylex.props(styles.blockRight, styles.wide)} aria-hidden="true" />

          {Array.from({ length: spreads }, (_, leaf) => (
            <div
              key={leaf}
              {...stylex.props(
                styles.leaf,
                isTurned(leaf) && styles.turned,
                instant && styles.instant,
              )}
              style={{ zIndex: zIndex(leaf) }}
            >
              {leaf === 0 ? (
                <div
                  {...stylex.props(
                    styles.face,
                    styles.cover,
                    open && styles.coverAway,
                    instant && styles.instant,
                  )}
                  inert={mounted && open}
                >
                  {cover}
                  <div {...stylex.props(styles.coverFrame)} aria-hidden="true" />
                  <button
                    type="button"
                    aria-label="Open the book"
                    onClick={openBook}
                    {...stylex.props(styles.coverButton)}
                  />
                </div>
              ) : (
                <div {...stylex.props(styles.face)} inert={inert(leaf * 2 - 1)}>
                  {pages[leaf * 2 - 1]}
                  {shading(leaf)}
                </div>
              )}
              <div {...stylex.props(styles.face, styles.back)} inert={inert(leaf * 2)}>
                {pages[leaf * 2]}
                {shading(leaf)}
              </div>
            </div>
          ))}

          <div {...stylex.props(styles.lastPage)} inert={inert(pages.length - 1)}>
            {pages[pages.length - 1]}
          </div>
        </div>

        <p {...stylex.props(shared.srOnly)} aria-live="polite">
          {open ? `Spread ${spread + 1} of ${spreads}` : 'The book is closed'}
        </p>
        {open ? null : (
          <p {...stylex.props(styles.hint, styles.wide)}>
            click the cover to open · ← → to turn pages
          </p>
        )}
        {corner ? <div {...stylex.props(styles.corner)}>{corner}</div> : null}
      </div>
    </TurnContext>
  )
}

const pageStyles = stylex.create({
  paper: {
    position: 'relative',
    height: {
      default: '100%',
      [NARROW]: 'auto',
    },
    display: 'flex',
    flexDirection: 'column',
    fontSize: PAGE_TYPE,
    padding: {
      default: '2.25em 2.75em',
      [NARROW]: '2rem 1.5rem 1.5rem',
    },
    backgroundColor: colors.page,
    color: colors.body,
    borderBottomWidth: {
      default: 0,
      [NARROW]: '1px',
    },
    borderBottomStyle: 'solid',
    borderBottomColor: colors.fill,
  },
  // Shade toward the spine, as on a real spread.
  left: {
    borderRadius: {
      default: '4px 0 0 4px',
      [NARROW]: 0,
    },
    backgroundImage: {
      default: `linear-gradient(to left, ${colors.gutter}, transparent 8%)`,
      [NARROW]: 'none',
    },
  },
  right: {
    borderRadius: {
      default: '0 4px 4px 0',
      [NARROW]: 0,
    },
    backgroundImage: {
      default: `linear-gradient(to right, ${colors.gutter}, transparent 8%)`,
      [NARROW]: 'none',
    },
  },
  // Filler pages exist only to complete a spread.
  blank: {
    display: {
      default: 'flex',
      [NARROW]: 'none',
    },
  },
  running: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    fontFamily: fonts.mono,
    fontSize: '0.7857em',
    letterSpacing: '0.04em',
    color: colors.icon,
  },
  body: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginTop: '2em',
  },
  foot: {
    paddingTop: {
      default: '1.3em',
      [NARROW]: '1.5rem',
    },
  },
  turnButton: {
    display: {
      default: null,
      [NARROW]: 'none',
    },
    color: {
      default: colors.bodyAlt,
      ':hover': colors.accent,
    },
    cursor: 'pointer',
    padding: '0.35em 0',
    borderRadius: '2px',
    outline: {
      default: 'none',
      ':focus-visible': `2px solid ${colors.accent}`,
    },
    outlineOffset: '3px',
  },
})

/** One printed page: running head, body, and a folio line. */
export function Page({
  side,
  head,
  folio,
  action,
  blank = false,
  children,
}: {
  side: 'left' | 'right'
  head: [ReactNode, ReactNode]
  folio: string
  action?: ReactNode
  blank?: boolean
  children: ReactNode
}) {
  return (
    <article {...stylex.props(pageStyles.paper, pageStyles[side], blank && pageStyles.blank)}>
      <header {...stylex.props(pageStyles.running)}>
        <span>{head[0]}</span>
        <span>{head[1]}</span>
      </header>
      <div {...stylex.props(pageStyles.body)}>{children}</div>
      <footer {...stylex.props(pageStyles.running, pageStyles.foot)}>
        <span>{side === 'left' ? folio : null}</span>
        {action ?? <span />}
        <span>{side === 'right' ? folio : null}</span>
      </footer>
    </article>
  )
}

/** Turns the book by `by` spreads (+1 forward, -1 back). Hidden when narrow. */
export function TurnButton({ by, children }: { by: number; children: ReactNode }) {
  const turn = useContext(TurnContext)
  return (
    <button type="button" onClick={() => turn(by)} {...stylex.props(pageStyles.turnButton)}>
      {children}
    </button>
  )
}
