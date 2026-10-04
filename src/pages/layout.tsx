import { Outlet, ScrollRestoration } from 'react-router'
import * as stylex from '@stylexjs/stylex'
import { Footer } from '@/components/Footer'
import { NavBar } from '@/components/NavBar'
import { ReadableArea } from '@/components/ReadableArea'

const styles = stylex.create({
  mainPad: {
    marginTop: '1.5rem',
    marginBottom: '6rem',
  },
})

export default function RootLayout() {
  return (
    <>
      <ReadableArea>
        <NavBar />
      </ReadableArea>
      <ReadableArea style={styles.mainPad}>
        <Outlet />
      </ReadableArea>
      <ReadableArea>
        <Footer />
      </ReadableArea>
      <ScrollRestoration />
    </>
  )
}
