import { Navigate, type RouteObject } from 'react-router'

import RootLayout from './pages/layout'
import RootPage from './pages/index'
import ProjectsPage from './pages/projects'
import AboutPage from './pages/about'
import MitoriPrivacyPage from './pages/mitori-privacy'
import NotFound from './pages/not-found'
import ErrorBoundary from './pages/error'
import type { RouteObjectWithMetadata } from './metadata/types'

function RedirectHome() {
  return <Navigate to="/" replace />
}

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
            'Zach\'s personal hub — projects, about, and a quiet status line.',
          url: 'https://zaxh.org',
        },
      } as RouteObjectWithMetadata,
      {
        path: 'projects',
        Component: ProjectsPage,
        metadata: {
          title: 'Projects',
          description: 'Things Zach builds and maintains.',
          url: 'https://zaxh.org/projects',
        },
      } as RouteObjectWithMetadata,
      {
        path: 'about',
        Component: AboutPage,
        metadata: {
          title: 'About',
          description: 'About Zach — contact, and a few devices.',
          url: 'https://zaxh.org/about',
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
    path: 'now',
    Component: RedirectHome,
  },
  {
    path: '*',
    Component: NotFound,
  },
]

export default routes
