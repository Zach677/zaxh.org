import path from 'node:path'
import { writeFileSync } from 'node:fs'
import { Feed } from 'feed'

import type * as ssgModule from '../src/main.ssg'

const BASE_URL = 'https://zaxh.org'
const dirname = import.meta.dirname

// eslint-disable-next-line @typescript-eslint/no-explicit-any
import('../dist/server/main.ssg.js' as any).then(
  async (entry: typeof ssgModule) => {
    const { renderRSS } = entry
    const renderedItems = await renderRSS()

    if (renderedItems.length === 0) {
      console.log('No posts to generate RSS feed.')
      return
    }

    renderedItems.sort((a, b) => +b.metadata.date - +a.metadata.date)

    const feed = new Feed({
      title: 'ZachSpace',
      description: 'Zach\'s personal blog',
      id: BASE_URL,
      link: BASE_URL,
      feed: `${BASE_URL}/rss.xml`,
      image: `${BASE_URL}/apple-touch-icon.png`,
      favicon: `${BASE_URL}/favicon.ico`,
      copyright: `© ${new Date().getFullYear()} Zach`,
      author: {
        name: 'Zach',
        link: BASE_URL,
      },
    })

    for (const item of renderedItems) {
      const { contents, metadata } = item
      feed.addItem({
        title: metadata.title,
        description: metadata.description,
        date: new Date(metadata.date),
        content: contents,
        id: `${BASE_URL}/post/${metadata.slug}`,
        link: `${BASE_URL}/post/${metadata.slug}`,
      })
    }

    writeFileSync(path.resolve(dirname, '../dist/rss.xml'), feed.rss2())
    console.log(`\nRSS feed generated with ${renderedItems.length} items.`)
  },
)
