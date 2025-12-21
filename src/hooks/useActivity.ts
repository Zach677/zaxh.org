import { useCallback, useEffect, useState } from 'react'

interface Activity {
  online: boolean
  processName: string | null
  timestamp?: number
}

const POLL_INTERVAL = 30000 // 30 seconds

export function useActivity() {
  const [activity, setActivity] = useState<Activity>({ online: false, processName: null })
  const [isLoading, setIsLoading] = useState(true)

  const fetchActivity = useCallback(async () => {
    try {
      const response = await fetch('/api/activity')
      if (response.ok) {
        const data = await response.json()
        setActivity({
          online: data.online,
          processName: data.processName,
          timestamp: data.timestamp,
        })
      }
    } catch {
      setActivity({ online: false, processName: null })
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // Initial fetch
    fetchActivity()

    // Set up polling
    const interval = setInterval(() => {
      // Only poll when page is visible
      if (document.visibilityState === 'visible') {
        fetchActivity()
      }
    }, POLL_INTERVAL)

    // Also fetch when page becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchActivity()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [fetchActivity])

  return {
    ...activity,
    isLoading,
  }
}
