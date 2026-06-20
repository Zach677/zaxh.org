import { Link } from 'react-router'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { ReadableArea } from '@/components/ReadableArea'

export default function NotFound() {
  return (
    <>
      <ReadableArea>
        <NavBar />
      </ReadableArea>
      <ReadableArea>
        <main className="lost-wrap select-none">
          <span className="reg-label">Unrecorded entry</span>
          <h1 className="lost-num" aria-label="404">
            <span aria-hidden="true">4</span>
            <span aria-hidden="true">0</span>
            <span aria-hidden="true">4</span>
          </h1>
          <p className="lost-cap">
            This page was never recorded in the almanac — or the cat sat on it.
          </p>
          <p className="lost-back">
            <Link to="/" className="ink-link reg-label">
              ← Back to the index
            </Link>
          </p>
        </main>
      </ReadableArea>
      <ReadableArea>
        <Footer />
      </ReadableArea>
    </>
  )
}
