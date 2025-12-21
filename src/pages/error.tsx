import { useRouteError } from 'react-router'

import { ReadableArea } from '@/components/ReadableArea'
import { NavBar } from '@/components/NavBar'

export default function ErrorBoundary() {
  const error = useRouteError() as Error
  return (
    <ReadableArea>
      <NavBar />
      <h1 className="mt-12 font-bold">Something is wrong:(</h1>
      <div className="mt-4 font-mono text-sm text-secondary">
        {error.toString()}
      </div>
    </ReadableArea>
  )
}
