import { Link } from 'react-router'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { ReadableArea } from '@/components/ReadableArea'

export default function NotFound() {
  return (
    <main className="relative flex min-h-[720px] h-screen flex-col items-center justify-center">
      <div className="error-stack text-center select-none">
        <p className="reg-label">Error · Page not found</p>
        <div className="error-code">404</div>
        <p className="error-msg">Sorrrry, this leaf isn’t in the index.</p>
        <Link to="/" className="ink-link error-back">
          ← Return to the index
        </Link>
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
