import { Link } from 'react-router'
import type { BlogPost } from '../types/blog'

interface BlogCardProps {
  post: BlogPost
}

export const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <article className="mb-4 pb-2">
      <h2 className="text-h5 text-gray-900 dark:text-white mb-2">
        <Link
          to={`/posts/${post.slug}`}
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block py-1"
        >
          {post.title}
        </Link>
      </h2>
      <time
        className="text-body-sm text-gray-500 dark:text-gray-500"
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
