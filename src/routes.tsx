import { type RouteObject } from 'react-router'
import RootLayout from './pages/layout'
import NotFound from './pages/not-found'
import ErrorBoundary from './pages/error'
import RootPage from './pages/index'

const routes: RouteObject[] = [
  {
    path: '/',
    Component: RootLayout,
    ErrorBoundary,
    children: [
      {
        index: true,
        Component: RootPage,
      },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]

export default routes
