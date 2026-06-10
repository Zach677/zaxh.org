import pageIndex from 'virtual:pageIndex'
import { loadPage } from './content-loader'
import { loadPostPage } from './routes'

interface NetworkInformation {
  saveData?: boolean
  effectiveType?: string
}

function prefetchRouteChunks() {
  void loadPostPage()
  for (const page of pageIndex) {
    void loadPage(page.slug!)
  }
}

function scheduleIdle() {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(prefetchRouteChunks, { timeout: 5000 })
  } else {
    setTimeout(prefetchRouteChunks, 2000)
  }
}

/**
 * Warm up lazy route chunks (PostPage + standalone pages) after the initial
 * load settles, so the first navigation doesn't pay the network roundtrips.
 */
export function schedulePrefetch() {
  const { connection } = navigator as { connection?: NetworkInformation }
  if (connection?.saveData || connection?.effectiveType?.endsWith('2g')) {
    return
  }

  if (document.readyState === 'complete') {
    scheduleIdle()
  } else {
    window.addEventListener('load', scheduleIdle, { once: true })
  }
}
