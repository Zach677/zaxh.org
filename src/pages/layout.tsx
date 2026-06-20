import { Outlet, ScrollRestoration } from 'react-router'
import { Footer } from '@/components/Footer'
import { NavBar } from '@/components/NavBar'
import { ReadableArea } from '@/components/ReadableArea'

export default function RootLayout() {
  return (
    <>
      <ReadableArea>
        <NavBar />
      </ReadableArea>
      <ReadableArea className="mt-6 mb-24">
        <Outlet />
      </ReadableArea>
      <ReadableArea>
        <Footer />
      </ReadableArea>
      <ScrollRestoration />
    </>
  )
}
