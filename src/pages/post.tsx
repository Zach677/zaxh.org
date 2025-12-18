import { Reader } from '@/components/reader'

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
          <time dateTime={parsedDate.toISOString()}>
            {parsedDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </p>
      ) : null}
      <article className="md-reader mt-16">
        <Reader contentComponent={contentComponent} />
      </article>
    </main>
  )
}
