import { Reader } from '@/components/reader'
import { FormattedTime } from '@/components/FormattedTime'
import { BackToTop } from '@/components/BackToTop'

export default function PostPage(props: { postModule: PostModule }) {
  const { postModule } = props
  const { metadata, default: contentComponent } = postModule
  const { title, date } = metadata
  const parsedDate = date ? new Date(date) : undefined

  return (
    <main>
      <h1 className="page-title">{title}</h1>
      {parsedDate ? (
        <p className="page-subtitle">
          <FormattedTime dateTime={parsedDate} />
        </p>
      ) : null}
      <article className="md-reader mt-16">
        <Reader contentComponent={contentComponent} />
      </article>
      <BackToTop />
    </main>
  )
}
