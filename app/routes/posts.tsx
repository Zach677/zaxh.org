import type { Route } from './+types/posts'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { BlogCard } from '../components/BlogCard'
import { getAllPosts } from '../data/posts.server'
import { LiquidCard } from '../components/LiquidGlass'

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

      <main className="max-w-4xl mx-auto px-6 py-12 pt-32 relative z-10">
        <LiquidCard
          title="All Posts"
          subtitle="Thoughts, tutorials, and insights from my development journey"
          className="mb-8"
        >
          <div className="space-y-6 mt-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </LiquidCard>

        {/* 空状态 */}
        {posts.length === 0 && (
          <LiquidCard className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400">
              <h3 className="text-h4 mb-4">No posts yet</h3>
              <p className="text-body mb-6">
                I'm working on some amazing content. Check back soon!
              </p>
            </div>
          </LiquidCard>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Posts
