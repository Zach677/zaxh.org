import { lazy, use } from 'react'
import { type RouteObject } from 'react-router'

import RootLayout from './pages/layout'
import NotFound from './pages/not-found'
import ErrorBoundary from './pages/error'
import type { RouteObjectWithMetadata } from './metadata/types'
import { loadPost, loadPage } from './content-loader'
import postIndex from 'virtual:postIndex'
import pageIndex from 'virtual:pageIndex'

const RootPage = lazy(() => import('./pages/index'))

export const loadPostPage = () => import('./pages/post')
const PostPage = lazy(loadPostPage)

function wrapPostPage(
  slug: string,
  loader: (slug: string) => Promise<PostModule>,
) {
  function WrappedPostPage() {
    // Kick off the PostPage chunk fetch in parallel with the content chunk,
    // instead of waiting for `use` to resolve before <PostPage> suspends.
    void loadPostPage()
    const postModule = use(loader(slug))
    return <PostPage postModule={postModule} />
  }
  return WrappedPostPage
}

const routes: RouteObject[] = [
  {
    Component: RootLayout,
    ErrorBoundary,
    children: [
      {
        index: true,
        Component: RootPage,
        metadata: {
          url: 'https://zaxh.org',
        },
      } as RouteObjectWithMetadata,
      ...postIndex.map((post) => ({
        path: `post/${post.slug}`,
        Component: wrapPostPage(post.slug!, loadPost),
        metadata: {
          title: post.title,
          description: post.description,
          url: `https://zaxh.org/post/${post.slug}`,
        },
      })),
      ...pageIndex.map((page) => ({
        path: `page/${page.slug}`,
        Component: wrapPostPage(page.slug!, loadPage),
        metadata: {
          title: page.title,
          description: page.description,
          url: `https://zaxh.org/page/${page.slug}`,
        },
      })),
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]

export default routes
