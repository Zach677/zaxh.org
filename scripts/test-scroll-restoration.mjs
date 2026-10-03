import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import console from 'node:console'
import process from 'node:process'

// Requires OpenCLI, Chrome, Browser Bridge, and `pnpm preview` on port 4173.
const session = `scroll-test-${process.pid}`
const browser = (...args) => execFileSync(
  'opencli', ['browser', session, ...args],
  { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] },
)
const state = () => JSON.parse(browser('eval',
  'JSON.stringify({ path: location.pathname, y: scrollY, origin: performance.timeOrigin })',
))

try {
  browser('open', 'http://127.0.0.1:4173/projects', '--window', 'background')
  browser('state')
  browser('eval', 'sessionStorage.setItem("react-router-scroll-positions", "{}")')
  const origin = state().origin

  for (const path of ['/about', '/']) {
    browser('eval', 'window.scrollTo(0, 700)')
    assert.equal(state().y, 700, 'The project page must be scrollable')
    browser('eval', `document.querySelector('a[href="${path}"]').click()`)
    assert.deepEqual(state(), { path, y: 0, origin })
    browser('eval', 'history.back()')
    assert.deepEqual(state(), { path: '/projects', y: 700, origin },
      `Back navigation from ${path} must restore the project page`)
  }

  console.log('PASS: Back navigation restores 700px after inner-page and home navigation.')
} finally {
  browser('close')
}
