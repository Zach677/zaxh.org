import { useEffect, useState } from 'react'
import * as stylex from '@stylexjs/stylex'

import { ago, viewDesk, type Desk, type Ledger } from '../live/desk'
import { colors, fonts } from '../design-system/tokens.stylex'

// App icons by display name, the set Yohaku uses for its live desk.
const ICONS = 'https://fastly.jsdelivr.net/gh/Innei/reporter-assets@main'
const RETRY_MS = 5_000
const TICK_MS = 30_000

const breathe = stylex.keyframes({
  '50%': { boxShadow: `0 0 0 0.35em ${colors.accentSoft}` },
})

const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })

// The last report, pushed by the Worker. undefined until the first message.
function useDesk() {
  const [desk, setDesk] = useState<Desk | null>()
  useEffect(() => {
    let socket: WebSocket | undefined
    let retry: ReturnType<typeof setTimeout> | undefined
    let stopped = false
    function connect() {
      socket = new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/api/desk`)
      socket.onmessage = (event) => setDesk(JSON.parse(event.data))
      socket.onclose = () => {
        setDesk((last) => last ?? null)
        if (!stopped) retry = setTimeout(connect, RETRY_MS)
      }
    }
    connect()
    return () => {
      stopped = true
      clearTimeout(retry)
      socket?.close()
    }
  }, [])
  return desk
}

// The clock that moves "here" to "away" when reports stop.
function useNow() {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), TICK_MS)
    return () => clearInterval(id)
  }, [])
  return now
}

function useJSON<T>(url: string | null) {
  const [data, setData] = useState<T | null>()
  useEffect(() => {
    if (!url) return
    fetch(url)
      .then((response) => (response.ok ? response.json() : null))
      .then(setData, () => setData(null))
  }, [url])
  return data
}

const styles = stylex.create({
  notes: {
    marginTop: 'auto',
    paddingTop: '1.3em',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: colors.border,
    display: 'grid',
    gap: '1.35em',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: fonts.mono,
    fontSize: '0.7143em',
    lineHeight: 1,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: colors.icon,
  },
  source: {
    letterSpacing: '0.02em',
    textTransform: 'none',
    color: {
      default: colors.secondary,
      ':hover': colors.accent,
    },
    transition: 'color 0.2s var(--ease)',
  },
  dot: {
    display: 'inline-block',
    width: '0.55em',
    height: '0.55em',
    marginRight: '0.7em',
    borderRadius: '50%',
    verticalAlign: '0.05em',
    backgroundColor: colors.accent,
    animationName: {
      default: breathe,
      '@media (prefers-reduced-motion: reduce)': 'none',
    },
    animationDuration: '2.4s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  },
  away: {
    backgroundColor: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.borderSolid,
    animationName: 'none',
  },
  // 18px of the 14px base.
  line: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.45em',
    margin: '0.55em 0 0',
    minHeight: '1.35em',
    fontFamily: fonts.serif,
    fontStyle: 'italic',
    fontSize: '1.2857em',
    lineHeight: 1.35,
    color: colors.heading,
  },
  icon: {
    flex: 'none',
    width: '1.15em',
    height: '1.15em',
  },
  media: {
    margin: '0.35em 0 0',
    minHeight: '1.55em',
    fontSize: '0.8929em',
    lineHeight: 1.55,
    color: colors.secondary,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  note: {
    marginRight: '0.45em',
    color: colors.accent,
  },
  stats: {
    margin: '0.6em 0 0',
    minHeight: '1.6em',
    fontSize: '0.8929em',
    color: colors.bodyAlt,
    fontVariantNumeric: 'tabular-nums',
  },
  // In the 12.5px stats line.
  figure: {
    marginRight: '0.2em',
    fontFamily: fonts.serif,
    fontSize: '1.4em',
    lineHeight: 1,
    color: colors.heading,
  },
  sep: {
    marginInline: '0.5em',
    color: colors.borderSolid,
  },
  closed: {
    fontFamily: fonts.serif,
    fontStyle: 'italic',
    color: colors.icon,
  },
  strip: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '2px',
    height: '1.7em',
    marginTop: '0.7em',
  },
  week: {
    flex: 1,
    minHeight: '1px',
    borderRadius: '1px 1px 0 0',
    backgroundColor: colors.accent,
  },
  blankStrip: {
    borderRadius: '2px',
    backgroundColor: colors.inkWash,
  },
  skeleton: {
    display: 'inline-block',
    width: '7em',
    height: '0.8em',
    borderRadius: '2px',
    backgroundColor: colors.inkWash,
  },
})

function AppIcon({ name }: { name: string }) {
  const icons = useJSON<Record<string, string>>(`${ICONS}/app-icon.json`)
  const asset = icons?.[name]
  if (!asset) return null
  return <img src={`${ICONS}/apps/${asset}.png`} alt="" {...stylex.props(styles.icon)} />
}

function Now() {
  const desk = useDesk()
  const now = useNow()
  if (desk === undefined) {
    return (
      <div>
        <div {...stylex.props(styles.label)}><span><span {...stylex.props(styles.dot, styles.away)} />At the desk</span></div>
        <p {...stylex.props(styles.line)}><span {...stylex.props(styles.skeleton)} /></p>
        <p {...stylex.props(styles.media)} />
      </div>
    )
  }
  const view = viewDesk(desk, now)
  if (!view.here) {
    return (
      <div>
        <div {...stylex.props(styles.label)}>
          <span><span {...stylex.props(styles.dot, styles.away)} />Away</span>
          {view.since ? <span>{ago(now - view.since)}</span> : null}
        </div>
        <p {...stylex.props(styles.line)}>{view.lastApp ? `Last seen in ${view.lastApp}.` : 'Away from the desk.'}</p>
        <p {...stylex.props(styles.media)} />
      </div>
    )
  }
  return (
    <div>
      <div {...stylex.props(styles.label)}>
        <span><span {...stylex.props(styles.dot)} />At the desk</span>
        <span>{ago(now - view.since)}</span>
      </div>
      <p {...stylex.props(styles.line)}>
        {view.app ? <><AppIcon name={view.app} />In {view.app}.</> : 'Listening.'}
      </p>
      <p {...stylex.props(styles.media)}>
        {view.media ? (
          <>
            <span {...stylex.props(styles.note)} aria-hidden="true">♪</span>
            {view.media.artist ? `${view.media.title} — ${view.media.artist}` : view.media.title}
          </>
        ) : null}
      </p>
    </div>
  )
}

function today() {
  return new Date().toLocaleDateString('en-CA')
}

function LedgerNote() {
  const ledger = useJSON<Ledger>('/api/ledger')
  return (
    <div>
      <div {...stylex.props(styles.label)}>
        <span>Ledger</span>
        <a href="https://tokens.ci/u/Zach677" {...stylex.props(styles.source)}>tokens.ci ↗</a>
      </div>
      <p {...stylex.props(styles.stats, ledger === null && styles.closed)}>
        {ledger === undefined ? <span {...stylex.props(styles.skeleton)} /> : null}
        {ledger === null ? 'The ledger is closed for now.' : null}
        {ledger ? (
          <>
            <span {...stylex.props(styles.figure)}>{compact.format(ledger.tokens)}</span>tokens
            <span {...stylex.props(styles.sep)}>·</span>{ledger.days} days
            {ledger.latest?.date === today() ? (
              <><span {...stylex.props(styles.sep)}>·</span>{compact.format(ledger.latest.tokens)} today</>
            ) : null}
          </>
        ) : null}
      </p>
      <div {...stylex.props(styles.strip, !ledger && styles.blankStrip)} aria-hidden="true">
        {ledger?.weeks.map((week, index) => (
          <i
            key={index}
            {...stylex.props(styles.week)}
            style={{ height: `${Math.max(week * 100, 4)}%`, opacity: week === 0 ? 0.18 : 0.35 + week * 0.65 }}
          />
        ))}
      </div>
    </div>
  )
}

/** The frontispiece notes: where Zach is now, and the token ledger. */
export function LiveNotes() {
  return (
    <aside {...stylex.props(styles.notes)} aria-label="Now">
      <Now />
      <LedgerNote />
    </aside>
  )
}
