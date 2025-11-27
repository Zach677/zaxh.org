import { Outlet } from 'react-router'
import { Footer } from '@/components/Footer'

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 font-sans antialiased">
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
