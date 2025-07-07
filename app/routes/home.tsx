import type { Route } from './+types/home'
import { Header } from '../components/Header'
import { getAllPosts } from '../data/posts.server'
import { LiquidHero } from '../components/LiquidGlass'

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Zach's Blog - Tech Sharing & Life Insights" },
    {
      name: 'description',
      content:
        'Personal blog sharing software architecture, backend development technology, programming experience, and life insights',
    },
  ]
}

export async function loader() {
  const posts = getAllPosts()
  return { posts }
}

const Home = ({ loaderData }: Route.ComponentProps) => {
  const { posts } = loaderData

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 relative">
      <Header />

      {/* 英雄区域 - 全屏展示 */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <LiquidHero
          subtitle="Software & Backend Engineer & Tech Enthusiast"
          title="Hello, I'm Zach"
          description="Welcome to my digital space where I share insights about software architecture, backend development, and system design. Join me as I explore scalable solutions and document my journey in building robust, high-performance applications."
          className="max-w-4xl mx-auto"
        />
      </section>
    </div>
  )
}

export default Home
