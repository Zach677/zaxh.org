import { useEffect, useState } from 'react'

import { daypart, fmtTime, moonPhase } from '@/lib/almanac'

interface Now {
  part: string
  time: string
  glyph: string
  phase: string
}

// The almanac's living footer line: refreshes every 30s and remembers how many
// times this browser has opened the page. SSG-safe — renders static placeholders
// on the server, fills in real values only after mount.
export function AboutNow() {
  const [now, setNow] = useState<Now | null>(null)
  const [visits, setVisits] = useState(0)

  useEffect(() => {
    function tick() {
      const d = new Date()
      const moon = moonPhase(d)
      setNow({
        part: daypart(d).en.toLowerCase(),
        time: fmtTime.format(d),
        glyph: moon.glyph,
        phase: moon.en.toLowerCase(),
      })
    }
    tick()
    const id = setInterval(tick, 30000)

    try {
      const KEY = 'zaxh-almanac-visits'
      let n = parseInt(localStorage.getItem(KEY) || '0', 10)
      if (!sessionStorage.getItem(KEY)) {
        n += 1
        localStorage.setItem(KEY, String(n))
        sessionStorage.setItem(KEY, '1')
      }
      setVisits(n)
    } catch {
      /* storage unavailable — skip the visit counter */
    }

    return () => clearInterval(id)
  }, [])

  return (
    <p className="now-line">
      Right now it’s {now ? now.part : '—'} here — {now ? now.time : '--:--'},
      under a <span className="moon">{now ? now.glyph : '☽'}</span>{' '}
      {now ? now.phase : 'crescent'}.{' '}
      {visits > 1
        ? `You’ve opened this almanac ${visits} times now. `
        : ''}
      To be continued…
    </p>
  )
}
