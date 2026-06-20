// Living details for the almanac: a Shanghai clock, the time-of-day word, and
// a moon phase computed from the synodic month. Ported from the design prototype.

const TZ = 'Asia/Shanghai'

export const fmtTime = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: TZ,
})

function hourInShanghai(d: Date): number {
  return parseInt(
    new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      hour12: false,
      timeZone: TZ,
    }).format(d),
    10,
  )
}

export function daypart(d: Date): { en: string; cn: string } {
  const h = hourInShanghai(d)
  if (h < 5) return { en: 'Small hours', cn: '凌晨' }
  if (h < 12) return { en: 'Morning', cn: '上午' }
  if (h < 14) return { en: 'Midday', cn: '正午' }
  if (h < 18) return { en: 'Afternoon', cn: '下午' }
  if (h < 23) return { en: 'Evening', cn: '夜晚' }
  return { en: 'Late night', cn: '深夜' }
}

const MOON_GLYPHS = ['●', '☽', '◐', '◑', '○', '◑', '◐', '☾']
const MOON_NAMES = [
  { en: 'New moon', cn: '朔' },
  { en: 'Waxing crescent', cn: '娥眉月' },
  { en: 'First quarter', cn: '上弦' },
  { en: 'Waxing gibbous', cn: '盈凸' },
  { en: 'Full moon', cn: '望' },
  { en: 'Waning gibbous', cn: '亏凸' },
  { en: 'Last quarter', cn: '下弦' },
  { en: 'Waning crescent', cn: '残月' },
]

export function moonPhase(d: Date): { glyph: string; en: string; cn: string } {
  const synodic = 29.530588853
  const knownNewMoon = Date.UTC(2000, 0, 6, 18, 14)
  const days = (d.getTime() - knownNewMoon) / 86400000
  const phase = ((((days % synodic) + synodic) % synodic) / synodic) // 0..1
  const i = Math.round(phase * 8) % 8
  return { glyph: MOON_GLYPHS[i], en: MOON_NAMES[i].en, cn: MOON_NAMES[i].cn }
}
