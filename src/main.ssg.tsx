import { text } from 'node:stream/consumers'
import { prerenderToNodeStream } from 'react-dom/static'

import { App } from './App'

/** The book as HTML, in the form main.tsx hydrates. */
export async function render() {
  const { prelude } = await prerenderToNodeStream(<App />)
  return text(prelude)
}
