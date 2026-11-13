import assert from 'node:assert/strict'
import { test } from 'node:test'

import { PRERENDERED, reduce, type BookState } from './turn.ts'

const closed = reduce(PRERENDERED, { type: 'jump', open: false })
const turn = (state: BookState, by: number) => reduce(state, { type: 'turn', by, spreads: 3 })

test('the cover waits: only a forward turn opens it, and that is not a page turn', () => {
  assert.equal(closed.open, false)
  assert.equal(turn(closed, -1), closed)
  assert.deepEqual(turn(closed, 1), { ...closed, open: true, moving: 0 })
  assert.equal(turn(closed, 1).turned, false)
})

test('a turn moves the leaf between the two spreads and stops at both ends', () => {
  const second = turn(PRERENDERED, 1)
  assert.deepEqual([second.spread, second.moving, second.turned], [1, 1, true])
  // Back lowers the same leaf that forward lifted.
  assert.deepEqual([turn(second, -1).spread, turn(second, -1).moving], [0, 1])
  assert.equal(turn(PRERENDERED, -1), PRERENDERED)
  const last = turn(second, 1)
  assert.equal(turn(last, 1), last)
})

test('a jump lands at once; land and settle clear only their own flag', () => {
  const jumped = reduce(turn(PRERENDERED, 1), { type: 'jump', open: true, spread: 2 })
  assert.deepEqual([jumped.spread, jumped.moving, jumped.instant], [2, null, true])
  const settled = reduce(jumped, { type: 'settle' })
  assert.equal(settled.instant, false)
  assert.equal(reduce(settled, { type: 'settle' }), settled)
  assert.equal(reduce(settled, { type: 'land' }), settled)
  assert.equal(reduce(turn(settled, -1), { type: 'land' }).moving, null)
})
