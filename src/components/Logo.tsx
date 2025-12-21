import { useActivity } from '../hooks/useActivity'
import { ActivityIcon } from './ActivityIcon'

function SpinningLoader() {
  return (
    <div className="h-3.5 w-3.5 animate-spin rounded-full border border-dashed border-current opacity-60" />
  )
}

export function Logo() {
  const { online, processName, isLoading } = useActivity()

  return (
    <div className="flex items-center gap-2">
      <span>ZachSpace</span>
      {isLoading ? (
        <SpinningLoader />
      ) : online && processName ? (
        <ActivityIcon processName={processName} />
      ) : (
        <SpinningLoader />
      )}
    </div>
  )
}
