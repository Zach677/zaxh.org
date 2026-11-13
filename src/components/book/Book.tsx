import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import * as stylex from '@stylexjs/stylex'

import { colors, fonts } from '../../design-system/tokens.stylex'
import { shared } from '../../design-system/shared.stylex'
import { PRERENDERED, reduce } from './turn'

// Below this size there is no room for a two-page spread: the cover lifts
// off once and the pages stack in reading order.
const NARROW_QUERY = '(max-width: 860px), (max-height: 540px)'
const NARROW = `@media ${NARROW_QUERY}`
const REDUCE = '@media (prefers-reduced-motion: reduce)'
const SEEN_KEY = 'book-open'
// A page is light; the cover is a board, and takes longer.
const TURN_MS = 750
const COVER_MS = 1000
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
  [NARROW]: '1rem',
}
// Narrow screens show the closed book in its own proportions (0.71), with
// the desk around it. This is its height.
const PHONE_COVER = 'min(100svh - 9rem, 80vw / 0.71)'
const SPREAD_WIDTH = 'min(94vw, min(100svh - 7rem, 680px) * 1.42)'
const TURNED = 'perspective(2400px) rotateY(-180deg)'

const TurnContext = createContext<(by: number) => void>(() => {})

function subscribeNarrow(onChange: () => void) {
  const query = matchMedia(NARROW_QUERY)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

const subscribeNothing = () => () => {}

// SPRING stands the leaf upright at about 27% of the turn; the shade is
// darkest there and clears as the leaf settles.
const shade = stylex.keyframes({
  '0%': { opacity: 0 },
  '27%': { opacity: 1 },
  '100%': { opacity: 0 },
})

const motion = {
  transitionDuration: {
    default: `${TURN_MS}ms`,
    [REDUCE]: '0s',
  },
  transitionTimingFunction: SPRING,
} as const

const coverMotion = {
  transitionDuration: {
    default: `${COVER_MS}ms`,
    [REDUCE]: '0s',
  },
  transitionTimingFunction: SPRING,
} as const

const styles = stylex.create({
  desk: {
    // Positioned, so its overflow also clips the screen-reader-only status.
    position: 'relative',
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
  // Narrow: the pages do not scroll under the closed cover.
  deskClosed: {
    height: {
      default: null,
      [NARROW]: '100svh',
    },
    overflow: {
      default: 'clip',
      [NARROW]: 'hidden',
    },
  },
  // Narrow: the desk, drawn over the stacked pages until the cover opens.
  veil: {
    display: {
      default: 'none',
      [NARROW]: 'block',
    },
    position: 'fixed',
    inset: 0,
    zIndex: 9,
    backgroundColor: colors.paper,
    transitionProperty: 'opacity',
    transitionDuration: {
      default: `${COVER_MS / 2}ms`,
      [REDUCE]: '0s',
    },
    // The pages show after the cover has lifted, not around a closed cover.
    transitionDelay: {
      default: `${COVER_MS / 5}ms`,
      [REDUCE]: '0s',
    },
  },
  veilGone: {
    opacity: 0,
    pointerEvents: 'none',
  },
  book: {
    position: 'relative',
    width: {
      default: SPREAD_WIDTH,
      [NARROW]: 'auto',
    },
    // The width limit is in the height too, so the spread keeps its
    // proportions and PAGE_TYPE follows whichever limit applies.
    height: {
      default: 'min(100svh - 7rem, 680px, 94vw / 1.42)',
      [NARROW]: 'auto',
    },
    // Size container for PAGE_TYPE. Off when narrow: containment would trap
    // the fixed cover inside the book.
    containerType: {
      default: 'size',
      [NARROW]: 'normal',
    },
    transitionProperty: 'transform',
    ...coverMotion,
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
    transitionDelay: `${COVER_MS * 0.4}ms`,
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
    // Flat when narrow: preserve-3d makes the leaf the containing block of
    // the fixed cover, which then covers only the first page.
    transformStyle: {
      default: 'preserve-3d',
      [NARROW]: 'flat',
    },
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
  // Leaf 0 carries the cover, and its shade keeps the same time.
  coverPace: {
    transitionDuration: {
      default: `${COVER_MS}ms`,
      [REDUCE]: '0s',
    },
    animationDuration: `${COVER_MS}ms`,
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
    animationDuration: `${TURN_MS}ms`,
    animationTimingFunction: 'ease-out',
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
    margin: {
      default: null,
      [NARROW]: 'auto',
    },
    width: {
      default: null,
      [NARROW]: `calc(${PHONE_COVER} * 0.71)`,
    },
    height: {
      default: null,
      [NARROW]: PHONE_COVER,
    },
    // A phone holds the cover closer: its type is set for a 520px cover.
    fontSize: {
      default: 'calc(100cqh * 14 / 680)',
      [NARROW]: `calc(${PHONE_COVER} * 14 / 520)`,
    },
    color: colors.foil,
    borderRadius: '0 6px 6px 0',
    // Spine shadow, the hinge groove of a hardcover, then a linen weave.
    backgroundImage:
      'linear-gradient(90deg, rgba(0, 0, 0, 0.38), rgba(0, 0, 0, 0) 5%), ' +
      'linear-gradient(90deg, transparent 7.4%, rgba(0, 0, 0, 0.3) 7.9%, rgba(255, 255, 255, 0.07) 8.5%, transparent 9.2%), ' +
      'repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.035) 0 1px, transparent 1px 3px), ' +
      'repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.06) 0 1px, transparent 1px 3px)',
    backgroundColor: colors.cloth,
    // Foil is pressed into the cloth: lit below, shaded above.
    textShadow: '0 1px 0 rgba(255, 255, 255, 0.1), 0 -1px 0 rgba(0, 0, 0, 0.45)',
    boxShadow:
      'inset 0 0 0 1px rgba(255, 255, 255, 0.05), 0 30px 60px -30px rgba(20, 19, 18, 0.6)',
    transformOrigin: 'left center',
    transitionProperty: 'transform',
    ...coverMotion,
  },
  // Narrow screens have no leaf to turn: the cover itself swings away. It
  // stays solid and ends past edge-on, where its hidden back faces the reader.
  // Its hinge moves left and is at the screen's edge when the cover is edge-on
  // (90 of the 100 degrees), so the cover leaves there and not across the page.
  coverAway: {
    transform: {
      default: null,
      [NARROW]: `translateX(calc((${PHONE_COVER} * 0.71 - 100vw) / 2 * 100 / 90)) perspective(1400px) rotateY(-100deg)`,
    },
    pointerEvents: {
      default: null,
      [NARROW]: 'none',
    },
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
    zIndex: 11,
    left: '50%',
    bottom: '1.25rem',
    transform: 'translateX(-50%)',
    margin: 0,
    fontFamily: fonts.mono,
    fontSize: '0.857rem',
    whiteSpace: 'nowrap',
    color: colors.secondary,
    transitionProperty: 'opacity',
    transitionDuration: '0.4s',
  },
  // Open, the hint sits under the left page, clear of the ribbon.
  hintOpen: {
    left: `calc(50% - ${SPREAD_WIDTH} / 4)`,
  },
  hintGone: {
    opacity: 0,
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
 * A book of spreads. The cover waits for the reader and opens onto the first
 * spread; each further leaf turns to the next. `pages` is in reading order
 * and must be even: page 0 is printed on the back of the cover, the last page
 * lies under all leaves. `sections` maps a URL hash (without #) to a spread
 * index.
 */
export function Book({
  cover,
  pages,
  sections,
  corner,
}: {
  cover: ReactNode
  pages: ReactNode[]
  sections: Record<string, number>
  corner?: ReactNode
}) {
  const spreads = pages.length / 2
  const narrow = useSyncExternalStore(
    subscribeNarrow,
    () => matchMedia(NARROW_QUERY).matches,
    () => false,
  )
  // Prerendered HTML has no inert pages, so it reads in full without JS.
  const mounted = useSyncExternalStore(subscribeNothing, () => true, () => false)
  const [{ open, spread, moving, instant, turned }, dispatch] = useReducer(reduce, PRERENDERED)

  const turn = useCallback(
    (by: number) => {
      // The cover waits once per session; index.html reads this.
      if (!open && by > 0) sessionStorage.setItem(SEEN_KEY, '1')
      dispatch({ type: 'turn', by, spreads })
    },
    [open, spreads],
  )

  // The first paint is the prerendered, open book. Before the next paint,
  // close it if index.html asked for the cover, or go to the URL's section.
  // After that React owns the book, so drop the flag.
  useLayoutEffect(() => {
    const root = document.documentElement
    const section = sections[location.hash.slice(1)]
    if (root.dataset.book === 'closed') dispatch({ type: 'jump', open: false })
    else if (section !== undefined) dispatch({ type: 'jump', open: true, spread: section })
    delete root.dataset.book
  }, [sections])

  // A layout switch (rotation, resize) jumps to the new layout. The media
  // query has already started the turns between the two; land them. Only
  // transitions: finish() throws on an infinite animation, like a page's
  // breathing dot.
  useLayoutEffect(() => {
    for (const animation of document.getElementById('book')?.getAnimations({ subtree: true }) ?? []) {
      if (animation instanceof CSSTransition) animation.finish()
    }
  }, [narrow])

  useEffect(() => {
    if (!instant) return undefined
    const id = requestAnimationFrame(() => dispatch({ type: 'settle' }))
    return () => cancelAnimationFrame(id)
  }, [instant])

  useEffect(() => {
    if (moving === null) return undefined
    const id = setTimeout(() => dispatch({ type: 'land' }), moving === 0 ? COVER_MS : TURN_MS)
    return () => clearTimeout(id)
  }, [moving, spread])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // A focused control that used the key (the theme switcher) keeps it.
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return
      if (!open) {
        // Enter opens the cover only when no control has the focus.
        if (e.key === 'ArrowRight' || (e.key === 'Enter' && e.target === document.body)) turn(1)
        return
      }
      if (narrow) return
      if (e.key === 'ArrowRight') turn(1)
      if (e.key === 'ArrowLeft') turn(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [turn, open, narrow])

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
      {...stylex.props(
        styles.shade,
        styles.wide,
        leaf === moving && styles.shading,
        leaf === 0 && styles.coverPace,
      )}
      aria-hidden="true"
    />
  )

  return (
    <TurnContext value={turn}>
      <div {...stylex.props(styles.desk, !open && styles.deskClosed)}>
        <div
          {...stylex.props(styles.veil, open && styles.veilGone, instant && styles.instant)}
          aria-hidden="true"
        />
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
                leaf === 0 && styles.coverPace,
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
                  <button
                    type="button"
                    aria-label="Open the book"
                    onClick={() => turn(1)}
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
        {/* Stays until the reader has done what it says. Not prerendered:
            without JavaScript there is nothing to click. */}
        {mounted ? (
          <p
            {...stylex.props(styles.hint, open && styles.wide, open && styles.hintOpen, open && turned && styles.hintGone)}
            aria-hidden={open && turned}
          >
            {open ? '← → to turn pages' : 'click or tap the cover to open'}
          </p>
        ) : null}
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
  // The same paper grain as the desk, so pages read as paper too.
  grain: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    backgroundImage: 'var(--paper-grain-img)',
    backgroundSize: '180px 180px',
    opacity: 'var(--paper-grain-opacity)',
    mixBlendMode: 'var(--paper-grain-blend)',
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
    // A taller tap target that keeps the folio line where pages without a
    // button put it.
    padding: '0.35em 0',
    margin: '-0.35em 0',
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
      <div {...stylex.props(pageStyles.grain)} aria-hidden="true" />
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
