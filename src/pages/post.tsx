import { Link } from 'react-router'

import { Reader } from '@/components/reader'
import { FormattedTime } from '@/components/FormattedTime'
import { BackToTop } from '@/components/BackToTop'
import postIndex from 'virtual:postIndex'

function Pager({ slug }: { slug: string }) {
  const idx = postIndex.findIndex((p) => p.slug === slug)
  if (idx === -1) return null

  const newer = idx > 0 ? postIndex[idx - 1] : undefined
  const older = idx < postIndex.length - 1 ? postIndex[idx + 1] : undefined
  if (!newer && !older) return null

  return (
    <nav className="pager">
      {older ? (
        <Link className="ink-link" to={`/post/${older.slug}`}>
          <span className="t">← {older.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {newer ? (
        <Link className="ink-link" to={`/post/${newer.slug}`}>
          <span className="t">{newer.title} →</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  )
}

export default function PostPage(props: {
  postModule: PostModule
  slug: string
}) {
  const { postModule, slug } = props
  const { metadata, default: contentComponent } = postModule
  const { title, description, date, tags } = metadata
  const parsedDate = date ? new Date(date) : undefined
  const hasTags = !!tags && tags.length > 0

  // A "page" (about / friends) isn't in the post index — it owns its own hero,
  // so we render only the article body and skip the editorial header + pager.
  const isPost = postIndex.some((p) => p.slug === slug)

  if (!isPost) {
    return (
      <main className="article">
        <Reader contentComponent={contentComponent} />
        <BackToTop />
      </main>
    )
  }

  return (
    <main className="article">
      <div className="crumb">
        <Link className="ink-link reg-label" to="/">
          ← Index
        </Link>
      </div>

      {parsedDate || hasTags ? (
        <div className="folio">
          {parsedDate ? (
            <FormattedTime className="reg-label" dateTime={parsedDate} />
          ) : null}
          {hasTags ? (
            <span className="reg-label">{tags!.join(' · ')}</span>
          ) : null}
        </div>
      ) : null}

      <h1 className="a-title">{title}</h1>
      {description ? <p className="a-lede">{description}</p> : null}

      <article className="md-reader">
        <Reader contentComponent={contentComponent} />
      </article>

      <Pager slug={slug} />
      <BackToTop />
    </main>
  )
}
