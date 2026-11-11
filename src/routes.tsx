import { Outlet, ScrollRestoration, type RouteObject } from 'react-router'

import RootLayout from './pages/layout'
import RootPage from './pages/index'
import MitoriPrivacyPage from './pages/mitori-privacy'
import XiaorichangPrivacyPage from './pages/xiaorichang-privacy'
import SoonerPrivacyPage from './pages/sooner-privacy'
import { soonerPrivacyMetadata } from './pages/sooner-privacy-content'
import SoonerSupportPage from './pages/sooner-support'
import { soonerSupportMetadata } from './pages/sooner-support-content'
import NotFound from './pages/not-found'
import ErrorBoundary from './pages/error'
import type { RouteObjectWithMetadata } from './metadata/types'

// The home page is a book with its own chrome; other pages share RootLayout.
function Root() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  )
}

const routes: RouteObject[] = [
  {
    Component: Root,
    ErrorBoundary,
    children: [
      {
        index: true,
        Component: RootPage,
        metadata: {
          description:
            'Zach builds small tools for iOS and macOS. A small book of projects, notes, and devices.',
          url: 'https://zaxh.org',
        },
      } as RouteObjectWithMetadata,
      {
        Component: RootLayout,
        children: [
        {
          path: 'mitori/privacy',
          Component: MitoriPrivacyPage,
          metadata: {
            title: 'Mitori Privacy Policy',
            description:
              'How Mitori handles Apple ID credentials, account data, network requests, and website analytics.',
            url: 'https://zaxh.org/mitori/privacy',
          },
        } as RouteObjectWithMetadata,
        {
          path: 'sooner/privacy',
          Component: SoonerPrivacyPage,
          metadata: soonerPrivacyMetadata,
        } as RouteObjectWithMetadata,
        {
          path: 'sooner/support',
          Component: SoonerSupportPage,
          metadata: soonerSupportMetadata,
        } as RouteObjectWithMetadata,
        {
          path: 'xiaorichang/privacy',
          Component: XiaorichangPrivacyPage,
          metadata: {
            title: '校日常隐私政策',
            description:
              '了解校日常 iPhone 版如何处理学校账号、热水与洗衣数据、本机存储和主动提交的反馈，以及第三方服务、数据清除和本网页的统计与字体服务。',
            url: 'https://zaxh.org/xiaorichang/privacy',
          },
        } as RouteObjectWithMetadata,
        ],
      },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]

export default routes
