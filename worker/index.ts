import { DurableObject } from 'cloudflare:workers'

import { readLedger, readReport, type Desk } from '../src/live/desk'

const TOKENS_PROFILE = 'https://tokens.ci/api/users/Zach677'
const MAX_REPORT_BYTES = 16_384

// One desk, one object: it keeps the last report and pushes each new one to
// every open page. Pages hibernate with it between reports.
export class DeskRoom extends DurableObject<Env> {
  report(desk: Desk) {
    this.ctx.storage.kv.put('desk', desk)
    const message = JSON.stringify(desk)
    for (const socket of this.ctx.getWebSockets()) socket.send(message)
  }

  async fetch() {
    const [client, server] = Object.values(new WebSocketPair())
    this.ctx.acceptWebSocket(server)
    server.send(JSON.stringify(this.ctx.storage.kv.get<Desk>('desk') ?? null))
    return new Response(null, { status: 101, webSocket: client })
  }
}

async function sameKey(given: unknown, expected: string) {
  if (typeof given !== 'string' || !expected) return false
  const encoder = new TextEncoder()
  const [a, b] = await Promise.all([given, expected].map((value) => crypto.subtle.digest('SHA-256', encoder.encode(value))))
  return crypto.subtle.timingSafeEqual(a, b)
}

// YohakuCompanion posts here through its MixSpace HTTP Bridge, with the key
// in the body.
async function postReport(request: Request, env: Env) {
  if (Number(request.headers.get('content-length') ?? MAX_REPORT_BYTES + 1) > MAX_REPORT_BYTES) {
    return new Response('Too large', { status: 413 })
  }
  const body = await request.json().catch(() => null)
  if (!(await sameKey((body as { key?: unknown } | null)?.key, env.PRESENCE_KEY))) {
    return new Response('Unauthorized', { status: 401 })
  }
  const desk = readReport(body, Date.now())
  if (!desk) return new Response('Empty report', { status: 422 })
  await env.DESK.getByName('desk').report(desk)
  return new Response(null, { status: 204 })
}

async function getLedger() {
  // shortcut: tokens.ci has no documented API; if it changes, the page shows
  // the ledger as closed.
  const response = await fetch(TOKENS_PROFILE, { cf: { cacheTtl: 300, cacheEverything: true } })
  if (!response.ok) return new Response('Ledger closed', { status: 502 })
  return Response.json(readLedger(await response.json()), {
    headers: { 'cache-control': 'public, max-age=300' },
  })
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (url.hostname === 'www.zaxh.org') {
      url.hostname = 'zaxh.org'
      return Response.redirect(url.href, 308)
    }
    const { pathname } = url
    if (pathname === '/api/desk') {
      if (request.method === 'POST') return postReport(request, env)
      if (request.headers.get('upgrade') === 'websocket') return env.DESK.getByName('desk').fetch(request)
      return new Response('Expected a WebSocket', { status: 426 })
    }
    if (pathname === '/api/ledger') return getLedger()
    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
