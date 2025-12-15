import { type RouteObject } from 'react-router'
import RootLayout from './pages/layout'
import NotFound from './pages/not-found'
import ErrorBoundary from './pages/error'
import postPages from './pages/post'

const routes: RouteObject[] = [
  {
    path: '/',
    Component: RootLayout,
    ErrorBoundary,
    children: [
      {
        index: true,
        Component: postPages,
      },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]

export default routes
