import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

import { App } from './App'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// The build prerenders the book into #root; the dev server leaves it empty.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
