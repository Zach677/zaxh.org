import { type ReactNode } from 'react'
import { prerenderToNodeStream } from 'react-dom/static'
import { type RouteObject, createMemoryRouter } from 'react-router'

import { App, appMetadata } from './App'
import { collectMetadata, renderMetadataToString } from './metadata'
import routes from './routes'

export interface RenderedPage {
  path: string
  contents: string
  metadata: string
}

async function renderReactNode(node: ReactNode) {
  const { prelude } = await prerenderToNodeStream(node)
  return await new Promise<string>((resolve, reject) => {
    let data = ''
    prelude.on('data', (chunk) => {
      data += chunk
    })
    prelude.on('end', () => resolve(data))
    prelude.on('error', reject)
  })
}

async function renderPage(path: string) {
  console.log(`Rendering ${path}`)

  const router = createMemoryRouter(routes)
  await router.navigate(path)

  const root = <App router={router} />

  const contents = await renderReactNode(root)
  const metadata = renderMetadataToString(collectMetadata(router, appMetadata))

  return { path, contents, metadata }
}

export async function render() {
  const renderedPages: RenderedPage[] = []

  async function walkRoutes(routes: RouteObject[], pathSegments: string[]) {
    for (const route of routes) {
      const thisPath = route.path ? route.path : route.index ? '' : undefined
      if (thisPath === '*') {
        continue
      }
      if (thisPath !== undefined) {
        pathSegments.push(thisPath)
      }

      if (route.children && route.children.length > 0) {
        await walkRoutes(route.children, pathSegments)
      } else {
        // Only render leaf routes.
        const path = '/' + pathSegments.filter(Boolean).join('/')
        renderedPages.push(await renderPage(path))
      }

      if (thisPath !== undefined) {
        pathSegments.pop()
      }
    }
  }

  await walkRoutes(routes, [])
  renderedPages.push(await renderPage('/404'))

  return renderedPages
}
