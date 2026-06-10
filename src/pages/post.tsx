import { Reader } from '@/components/reader'
import { FormattedTime } from '@/components/FormattedTime'
import { BackToTop } from '@/components/BackToTop'

export default function PostPage(props: { postModule: PostModule }) {
  const { postModule } = props
  const { metadata, default: contentComponent } = postModule
  const { title, date, tags } = metadata
  const parsedDate = date ? new Date(date) : undefined
  const hasTags = !!tags && tags.length > 0
  const hasMeta = !!parsedDate || hasTags

  return (
    <main className="article">
      <header className="article-head">
        {parsedDate ? (
          <p className="reg-label article-kicker">Writing</p>
        ) : null}

        <h1 className="page-title">{title}</h1>

        {hasMeta ? (
          <div className="article-meta">
            {parsedDate ? (
              <FormattedTime className="reg-label" dateTime={parsedDate} />
            ) : null}
            {parsedDate && hasTags ? <span className="dot" /> : null}
            {hasTags ? (
              <span className="reg-label">{tags!.join(' · ')}</span>
            ) : null}
          </div>
        ) : null}
      </header>

      <article className="md-reader">
        <Reader contentComponent={contentComponent} />
      </article>
      <BackToTop />
    </main>
  )
}
