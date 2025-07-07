import { Link } from 'react-router'
import type { BlogPost } from '../types/blog'
import { LiquidCard, LiquidTag, LiquidButton } from './LiquidGlass'

interface BlogCardProps {
  post: BlogPost
  variant?: 'default' | 'featured' | 'compact'
}

export const BlogCard = ({ post, variant = 'default' }: BlogCardProps) => {
  if (variant === 'compact') {
    return (
      <Link to={`/posts/${post.slug}`} className="block">
        <LiquidCard
          className="p-4 hover:scale-[1.02] transition-all duration-300 group"
          interactive={true}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-body font-medium text-gray-900 dark:text-white mb-1 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {post.title}
              </h3>
              <time
                className="text-body-sm text-gray-500 dark:text-gray-400"
                dateTime={post.date}
              >
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </time>
            </div>
            <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </LiquidCard>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link to={`/posts/${post.slug}`} className="block">
        <LiquidCard
          className="p-8 hover:scale-[1.02] transition-all duration-300 group"
          interactive={true}
        >
          <div className="text-center">
            <LiquidTag color="blue" className="mb-4">
              Featured
            </LiquidTag>
            <h2 className="text-h3 text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {post.title}
            </h2>
            <p className="text-body-lg text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-center gap-6 text-body-sm text-gray-500 dark:text-gray-400 mb-6">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>•</span>
              <span>{post.readTime} min read</span>
            </div>
            <LiquidButton variant="primary" size="md">
              Read Full Article
            </LiquidButton>
          </div>
        </LiquidCard>
      </Link>
    )
  }

  // Default variant
  return (
    <Link to={`/posts/${post.slug}`} className="block">
      <LiquidCard
        className="p-6 hover:scale-[1.01] transition-all duration-300 group"
        interactive={true}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-h5 text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {post.title}
            </h3>
            <p className="text-body text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 text-body-sm text-gray-500 dark:text-gray-400">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </time>
              <span>•</span>
              <span>{post.readTime} min read</span>
            </div>
          </div>
          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <LiquidButton variant="ghost" size="sm">
              Read More →
            </LiquidButton>
          </div>
        </div>
      </LiquidCard>
    </Link>
  )
}

// 方式2: 原来的 export function 写法
// export function BlogCard({ post }: BlogCardProps) {
//   return (
//     <article className="mb-4 pb-2">
//       <h2 className="text-h5 text-gray-900 dark:text-white mb-2">
//         <Link
//           to={`/posts/${post.slug}`}
//           className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block py-1"
//         >
//           {post.title}
//         </Link>
//       </h2>
//       <time
//         className="text-body-sm text-gray-500 dark:text-gray-500"
//         dateTime={post.date}
//       >
//         {new Date(post.date).toLocaleDateString('en-US', {
//           year: 'numeric',
//           month: 'short',
//           day: 'numeric',
//         })}
//       </time>
//     </article>
//   )
// }

// 方式3: 先定义再导出
// const BlogCard = ({ post }: BlogCardProps) => {
//   return (
//     // ... 组件内容
//   )
// }
// export { BlogCard }

// 方式4: 默认导出
// const BlogCard = ({ post }: BlogCardProps) => {
//   return (
//     // ... 组件内容
//   )
// }
// export default BlogCard
