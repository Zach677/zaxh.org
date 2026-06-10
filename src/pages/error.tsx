import { useRouteError } from 'react-router'

import { ReadableArea } from '@/components/ReadableArea'
import { NavBar } from '@/components/NavBar'

export default function ErrorBoundary() {
  const error = useRouteError() as Error
  return (
    <ReadableArea>
      <NavBar />
      <main className="article mt-12">
        <header className="article-head">
          <p className="reg-label article-kicker">Error</p>
          <h1 className="page-title">Something went sideways</h1>
        </header>
        <div className="error-detail">{error.toString()}</div>
      </main>
    </ReadableArea>
  )
}
