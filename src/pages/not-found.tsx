import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { ReadableArea } from '@/components/ReadableArea'

export default function NotFound() {
  return (
    <main className="relative flex min-h-[720px] h-screen flex-col items-center justify-center">
      <div className="relative text-4xl md:text-6xl font-bold select-none">
        <div>Sorrrry, it&apos;s 404</div>
      </div>

      <div className="absolute top-0 w-full h-full flex flex-col justify-between pointer-events-none">
        <ReadableArea className="w-full pointer-events-auto">
          <NavBar />
        </ReadableArea>
        <ReadableArea className="w-full pointer-events-auto">
          <Footer />
        </ReadableArea>
      </div>
    </main>
  )
}
