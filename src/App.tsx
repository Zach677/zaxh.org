import { RouterProvider } from 'react-router'

export function App(props: {
  router: Parameters<typeof RouterProvider>[0]['router']
}) {
  const { router } = props
  return <RouterProvider router={router} />
}
