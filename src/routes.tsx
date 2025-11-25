import { type RouteObject } from 'react-router'
import RootLayout from './pages/layout'
import postPages from './pages/post'

const routes: RouteObject[] = [
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: postPages,
      },
    ],
  },
]

export default routes
