import { RouterProvider } from 'react-router'
import { IntlProvider } from './components/IntlProvider'

export function App(props: {
  router: Parameters<typeof RouterProvider>[0]['router']
}) {
  const { router } = props
  return (
    <IntlProvider>
      <RouterProvider router={router} />
    </IntlProvider>
  )
}
