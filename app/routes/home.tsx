import type { Route } from './+types/home'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { BlogCard } from '../components/BlogCard'
import { getAllPosts } from '../data/posts.server'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Zach's Blog - Tech Sharing & Life Insights" },
    {
      name: 'description',
      content:
        'Personal blog sharing frontend development technology, programming experience, and life insights',
    },
  ]
}

export async function loader() {
  const posts = getAllPosts()
  return { posts }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-2">
        <section>
          <h2 className="text-h2 text-gray-900 dark:text-white mb-8">
            All Posts
          </h2>
          <div>
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
