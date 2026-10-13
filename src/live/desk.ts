// Shared by the Worker and the page: the public shape of the live desk and
// the ledger, and the rules that read them.

// What the page may see of a Companion report. Window titles, icons, and
// the key never leave the Worker.
export type Desk = {
  app: string | null
  media: { title: string; artist: string | null } | null
  // When the Worker received the report, in ms.
  at: number
}

// Companion reports every 10 to 60 s. After this long without a report,
// the desk is empty.
export const LEASE_MS = 3 * 60_000

function text(value: unknown, max: number) {
  return typeof value === 'string' && value.trim() ? value.trim().slice(0, max) : null
}

// Reads the MixSpace HTTP Bridge payload of YohakuCompanion.
export function readReport(body: unknown, at: number): Desk | null {
  if (!body || typeof body !== 'object') return null
  const { process, media } = body as {
    process?: { name?: unknown }
    media?: { title?: unknown; artist?: unknown } | null
  }
  const app = text(process?.name, 60)
  const title = text(media?.title, 120)
  if (!app && !title) return null
  return { app, media: title ? { title, artist: text(media?.artist, 120) } : null, at }
}

export type DeskView =
  | { here: true; app: string | null; media: Desk['media']; since: number }
  | { here: false; lastApp: string | null; since: number | null }

export function viewDesk(desk: Desk | null, now: number): DeskView {
  if (desk && now - desk.at < LEASE_MS) return { here: true, app: desk.app, media: desk.media, since: desk.at }
  return { here: false, lastApp: desk?.app ?? null, since: desk?.at ?? null }
}

export function ago(ms: number) {
  const minutes = Math.floor(ms / 60_000)
  if (minutes < 1) return 'now'
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} h ago`
  return `${Math.floor(hours / 24)} d ago`
}

export type Ledger = {
  tokens: number
  days: number
  // The newest day with usage, as tokens.ci dates it (YYYY-MM-DD).
  latest: { date: string; tokens: number } | null
  // 52 weeks, oldest first, each 0 to 1 of the busiest week.
  weeks: number[]
}

type Contribution = { date: string; totals: { tokens: number } }

// Reads the public profile of tokens.ci (/api/users/<name>).
export function readLedger(profile: {
  stats: { totalTokens: number; activeDays: number }
  chartRange: { end: string }
  contributions: Contribution[]
}): Ledger {
  const end = Date.parse(profile.chartRange.end)
  const start = end - (52 * 7 - 1) * 86_400_000
  const weeks = Array<number>(52).fill(0)
  for (const day of profile.contributions) {
    const time = Date.parse(day.date)
    if (time >= start && time <= end) weeks[Math.floor((time - start) / (7 * 86_400_000))] += day.totals.tokens
  }
  const busiest = Math.max(...weeks) || 1
  const last = profile.contributions.at(-1)
  return {
    tokens: profile.stats.totalTokens,
    days: profile.stats.activeDays,
    latest: last ? { date: last.date, tokens: last.totals.tokens } : null,
    weeks: weeks.map((week) => Math.round((week / busiest) * 1000) / 1000),
  }
}
