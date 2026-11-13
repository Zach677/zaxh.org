import RootPage from './pages/index'
import { ThemeClientInitializer } from './theme'

/** The book: the only page that runs React. */
export function App() {
  return (
    <>
      <ThemeClientInitializer />
      <RootPage />
    </>
  )
}
