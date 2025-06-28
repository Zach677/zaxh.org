import { Link } from 'react-router'
import type { BlogPost } from '../types/blog'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="mb-4">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">
        <Link
          to={`/posts/${post.slug}`}
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {post.title}
        </Link>
      </h2>
    </article>
  )
}
