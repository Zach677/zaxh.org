import { Link } from 'react-router'

import { Logo } from '@/components/Logo'
import { FormattedTime } from '@/components/FormattedTime'
import postIndex from 'virtual:postIndex'

function PostItem({ post, index }: { post: PostMetadata; index: number }) {
  const date = new Date(post.date!)

  return (
    <li className="index-item">
      <span className="no">{String(index + 1).padStart(3, '0')}</span>
      <Link className="ink-link title" to={`/post/${post.slug}`}>
        {post.title}
      </Link>
      <FormattedTime className="date" dateTime={date} />
    </li>
  )
}

export default function RootPage() {
  return (
    <main className="colophon">
      {/* desktop-only left gutter: thin rule + vertical edition line */}
      <div className="colophon-gutter" aria-hidden="true">
        <span className="rule" />
        <span className="edition reg-label">zaxh.org — a quiet website</span>
      </div>

      <div className="colophon-body">
        <p className="reg-label mb-5">Est. — writing &amp; field notes</p>

        <h1 className="masthead">
          <Logo />
        </h1>

        <p className="tagline">
          I write code so my cat and dog can have a better life.
        </p>

        <section className="mt-20">
          <div className="index-head">
            <span className="reg-label">Index of writing</span>
            <span className="reg-label">
              {postIndex.length} {postIndex.length === 1 ? 'entry' : 'entries'}
            </span>
          </div>

          {postIndex.length > 0 ? (
            <ul className="index-list">
              {postIndex.map((post, i) => (
                <PostItem key={post.slug} post={post} index={i} />
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-secondary italic">No posts yet. Stay tuned!</p>
          )}
        </section>
      </div>
    </main>
  )
}
