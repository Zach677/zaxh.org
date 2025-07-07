import type { Route } from './+types/posts'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { Link } from 'react-router'
import { getAllPosts } from '../data/posts.server'

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "All Posts - Zach's Blog" },
    {
      name: 'description',
      content:
        'Browse all blog posts about frontend development, technology insights, and programming experience',
    },
  ]
}

export async function loader() {
  const posts = getAllPosts()
  return { posts }
}

const Posts = ({ loaderData }: Route.ComponentProps) => {
  const { posts } = loaderData

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 relative">
      {/* 动态背景 */}
      <div className="liquid-background" />

      <Header />

      <main className="max-w-2xl mx-auto px-6 py-12 pt-32 relative z-10">
        {/* 文章总数 */}
        <div className="mb-12">
          <p className="text-body text-gray-500 dark:text-gray-400">
            {posts.length} posts
          </p>
        </div>

        {/* 文章列表 */}
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link
                to={`/posts/${post.slug}`}
                className="block transition-all duration-200 hover:translate-x-1"
              >
                <h2 className="text-h4 text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                <time
                  className="text-body text-gray-500 dark:text-gray-400"
                  dateTime={post.date}
                >
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
              </Link>
            </article>
          ))}
        </div>

        {/* 空状态 */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400">
              <h3 className="text-h4 mb-4">No posts yet</h3>
              <p className="text-body mb-6">
                I'm working on some amazing content. Check back soon!
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Posts
