import type { Route } from './+types/home'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { BlogCard } from '../components/BlogCard'
import { getAllPosts } from '../data/posts'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Zach's Blog - 技术分享与生活感悟" },
    {
      name: 'description',
      content: '分享前端开发技术、编程经验和生活感悟的个人博客',
    },
  ]
}

export default function Home() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            最新文章
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
