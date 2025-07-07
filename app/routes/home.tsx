import type { Route } from './+types/home'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { BlogCard } from '../components/BlogCard'
import { getAllPosts } from '../data/posts.server'
import {
  LiquidHero,
  LiquidButton,
  LiquidCard,
  LiquidTag,
} from '../components/LiquidGlass'

export const meta = ({}: Route.MetaArgs) => {
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

const Home = ({ loaderData }: Route.ComponentProps) => {
  const { posts } = loaderData

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 relative">
      <Header />

      {/* 英雄区域 */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <LiquidHero
          subtitle="Frontend Developer & Tech Enthusiast"
          title="Hello, I'm Zach"
          description="Welcome to my digital space where I share insights about frontend development, explore cutting-edge technologies, and document my journey in the ever-evolving world of web development."
          actions={
            <>
              <LiquidButton
                variant="primary"
                size="lg"
                onClick={() =>
                  document
                    .getElementById('posts')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Explore My Work
              </LiquidButton>
              <LiquidButton
                variant="secondary"
                size="lg"
                onClick={() => (window.location.href = '/about')}
              >
                About Me
              </LiquidButton>
            </>
          }
          className="max-w-4xl mx-auto"
        />
      </section>

      {/* 技能标签区域 */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <LiquidCard
          title="Tech Stack & Interests"
          subtitle="Technologies I work with and topics I'm passionate about"
          className="text-center"
        >
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <LiquidTag color="blue">React</LiquidTag>
            <LiquidTag color="purple">TypeScript</LiquidTag>
            <LiquidTag color="pink">Next.js</LiquidTag>
            <LiquidTag color="green">Node.js</LiquidTag>
            <LiquidTag color="orange">Tailwind CSS</LiquidTag>
            <LiquidTag color="blue">Vite</LiquidTag>
            <LiquidTag color="purple">GraphQL</LiquidTag>
            <LiquidTag color="pink">UI/UX Design</LiquidTag>
            <LiquidTag color="green">Web Performance</LiquidTag>
            <LiquidTag color="orange">Modern CSS</LiquidTag>
          </div>
        </LiquidCard>
      </section>

      {/* 博客文章区域 */}
      <main id="posts" className="max-w-4xl mx-auto px-6 pb-20">
        <LiquidCard
          title="Latest Posts"
          subtitle="Thoughts, tutorials, and insights from my development journey"
          className="mb-8"
        >
          <div className="space-y-6 mt-6">
            {posts.map((post) => (
              <LiquidCard
                key={post.slug}
                className="p-6 hover:scale-[1.02] transition-transform duration-300"
                interactive={true}
                onClick={() => (window.location.href = `/posts/${post.slug}`)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-h5 text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
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
                  <div className="flex-shrink-0">
                    <LiquidButton variant="ghost" size="sm">
                      Read More →
                    </LiquidButton>
                  </div>
                </div>
              </LiquidCard>
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
              <LiquidButton
                variant="secondary"
                onClick={() => (window.location.href = '/about')}
              >
                Learn more about me
              </LiquidButton>
            </div>
          </LiquidCard>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Home
