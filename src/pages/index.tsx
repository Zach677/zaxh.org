import { Link } from 'react-router'

import { FormattedTime } from '@/components/FormattedTime'
import postIndex from 'virtual:postIndex'

const WORDMARK = 'zaxh'

function PostItem({ post }: { post: PostMetadata }) {
  const date = new Date(post.date!)

  return (
    <li className="index-item">
      <Link to={`/post/${post.slug}`}>
        <span className="title">{post.title}</span>
        <FormattedTime className="date" dateTime={date} />
      </Link>
    </li>
  )
}

export default function RootPage() {
  return (
    <main className="masthead-block">
      <h1 className="masthead" aria-label={WORDMARK}>
        {WORDMARK.split('').map((ch, i) => (
          <span key={i} className="L" aria-hidden="true">
            {ch}
          </span>
        ))}
      </h1>

      <p className="tagline">
        I write code so my <em>cat</em> and <em>dog</em> can have a better life.
      </p>

      <section className="index">
        <div className="index-head">
          <span className="reg-label">Recent writing</span>
          <span className="reg-label">
            {postIndex.length} {postIndex.length === 1 ? 'entry' : 'entries'}
          </span>
        </div>

        {postIndex.length > 0 ? (
          <ul className="index-list">
            {postIndex.map((post) => (
              <PostItem key={post.slug} post={post} />
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-secondary italic">No posts yet. Stay tuned!</p>
        )}
      </section>
    </main>
  )
}
