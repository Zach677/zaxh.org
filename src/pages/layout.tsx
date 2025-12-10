import { Outlet, ScrollRestoration } from 'react-router'
import { Footer } from '@/components/Footer'
import { ReadableArea } from '@/components/ReadableArea'

export default function RootLayout() {
  return (
    <>
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
