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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            欢迎来到我的博客
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            在这里，我分享关于前端开发、编程技术和生活感悟的文章。
            希望我的经验和思考能对你有所帮助。
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            最新文章
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1">
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
