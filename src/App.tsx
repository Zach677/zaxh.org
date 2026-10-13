import { Suspense } from 'react'
import { RouterProvider } from 'react-router'

import { ThemeClientInitializer } from './theme'
import { MetadataUpdater } from './metadata'

// Each route declares its own canonical `url`; routes without one (e.g. 404)
// intentionally emit no canonical/og:url.
export const appMetadata = {
  title: 'zaxh',
  description: 'Zach\'s personal hub',
}

export function App(props: {
  router: Parameters<typeof RouterProvider>[0]['router']
}) {
  const { router } = props
  return (
    <>
      <ThemeClientInitializer />
      <MetadataUpdater router={router} initialMetadata={appMetadata} />
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </>
  )
}
