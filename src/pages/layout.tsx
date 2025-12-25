import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import { Footer } from '@/components/Footer'
import { NavBar } from '@/components/NavBar'
import { ReadableArea } from '@/components/ReadableArea'
import { Snowfall } from '@/components/Snowfall'

export default function RootLayout() {
  const location = useLocation()
  const isRootPage = location.pathname === '/'

  return (
    <>
      <Snowfall />
      <ReadableArea>
        <NavBar hideHome={isRootPage} />
      </ReadableArea>
      <ReadableArea className="mt-12 mb-20">
        <Outlet />
      </ReadableArea>
      <ReadableArea>
        <Footer />
      </ReadableArea>
      <ScrollRestoration />
    </>
  )
}
