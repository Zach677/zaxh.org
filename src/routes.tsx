import { type RouteObject } from 'react-router'

import RootLayout from './pages/layout'
import RootPage from './pages/index'
import MitoriPrivacyPage from './pages/mitori-privacy'
import NotFound from './pages/not-found'
import ErrorBoundary from './pages/error'
import type { RouteObjectWithMetadata } from './metadata/types'

const routes: RouteObject[] = [
  {
    Component: RootLayout,
    ErrorBoundary,
    children: [
      {
        index: true,
        Component: RootPage,
        metadata: {
          description:
            'Zach builds small tools for iOS and macOS. Work, about, and a short status line.',
          url: 'https://zaxh.org',
        },
      } as RouteObjectWithMetadata,
      {
        path: 'mitori/privacy',
        Component: MitoriPrivacyPage,
        metadata: {
          title: 'Mitori Privacy Policy',
          description:
            'How Mitori handles Apple ID credentials, account data, network requests, and website analytics.',
          url: 'https://zaxh.org/mitori/privacy',
        },
      } as RouteObjectWithMetadata,
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]

export default routes
