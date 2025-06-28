import { Link } from 'react-router'
import type { BlogPost } from '../types/blog'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="mb-4 pb-2">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        <Link
          to={`/posts/${post.slug}`}
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block py-1"
        >
          {post.title}
        </Link>
      </h2>
      <time
        className="text-xs text-gray-500 dark:text-gray-500"
        dateTime={post.date}
      >
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </time>
    </article>
  )
}
