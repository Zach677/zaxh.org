import assert from 'node:assert/strict'
import { test } from 'node:test'

import { ago, LEASE_MS, readLedger, readReport, viewDesk } from './desk.ts'

test('a report keeps only the public fields', () => {
  const desk = readReport({
    key: 'secret',
    timestamp: 1,
    process: { name: ' Xcode ', description: '编辑\nSecret.swift', iconUrl: 'https://x/y.png' },
    media: { title: 'Kid A', artist: 'Radiohead', duration: 300, processName: 'Music' },
  }, 42)
  assert.deepEqual(desk, { app: 'Xcode', media: { title: 'Kid A', artist: 'Radiohead' }, at: 42 })
})

test('a report without media or without app still reads', () => {
  assert.deepEqual(readReport({ process: { name: 'Cursor' }, media: { title: null } }, 1), {
    app: 'Cursor', media: null, at: 1,
  })
  assert.deepEqual(readReport({ process: {}, media: { title: 'Kid A' } }, 1), {
    app: null, media: { title: 'Kid A', artist: null }, at: 1,
  })
})

test('an empty or malformed report is refused', () => {
  assert.equal(readReport(null, 1), null)
  assert.equal(readReport('x', 1), null)
  assert.equal(readReport({ process: { name: '  ' }, media: null }, 1), null)
  assert.equal(readReport({ process: { name: 42 } }, 1), null)
})

test('the desk is empty once the lease runs out', () => {
  const desk = { app: 'Xcode', media: null, at: 0 }
  assert.deepEqual(viewDesk(desk, LEASE_MS - 1), { here: true, app: 'Xcode', media: null, since: 0 })
  assert.deepEqual(viewDesk(desk, LEASE_MS), { here: false, lastApp: 'Xcode', since: 0 })
  assert.deepEqual(viewDesk(null, 0), { here: false, lastApp: null, since: null })
})

test('ago rounds down to the largest unit', () => {
  assert.equal(ago(59_000), 'now')
  assert.equal(ago(2 * 60_000), '2 min ago')
  assert.equal(ago(3 * 3_600_000 + 1), '3 h ago')
  assert.equal(ago(50 * 3_600_000), '2 d ago')
})

test('the ledger folds days into 52 weeks, scaled to the busiest', () => {
  const ledger = readLedger({
    stats: { totalTokens: 900, activeDays: 3 },
    chartRange: { end: '2026-10-13' },
    contributions: [
      { date: '2024-01-01', totals: { tokens: 5000 } },
      { date: '2025-10-15', totals: { tokens: 100 } },
      { date: '2026-10-12', totals: { tokens: 300 } },
      { date: '2026-10-13', totals: { tokens: 100 } },
    ],
  })
  assert.equal(ledger.weeks.length, 52)
  assert.equal(ledger.weeks[0], 0.25)
  assert.equal(ledger.weeks[51], 1)
  assert.deepEqual(ledger.latest, { date: '2026-10-13', tokens: 100 })
  assert.equal(ledger.weeks.reduce((sum, week) => sum + week, 0), 1.25)
})
