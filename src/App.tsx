import { Suspense } from 'react'
import { RouterProvider } from 'react-router'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

import { ThemeClientInitializer } from './theme'
import { MetadataUpdater } from './metadata'
import { IntlProvider } from './components/IntlProvider'

// Each route declares its own canonical `url`; routes without one (e.g. 404)
// intentionally emit no canonical/og:url.
export const appMetadata = {
  title: 'ZachSpace',
  description: 'Zach\'s personal blog',
}

export function App(props: {
  router: Parameters<typeof RouterProvider>[0]['router']
}) {
  const { router } = props
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <ThemeClientInitializer />
      <MetadataUpdater router={router} initialMetadata={appMetadata} />
      <Suspense>
        <IntlProvider>
          <RouterProvider router={router} />
        </IntlProvider>
      </Suspense>
    </>
  )
}
