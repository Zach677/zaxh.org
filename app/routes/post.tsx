import { data, redirect } from 'react-router'
import type { Route } from './+types/post'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { getPostBySlug } from '../data/posts'

export async function loader({ params }: Route.LoaderArgs) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    throw redirect('/')
  }

  return data({ post })
}

export function meta({ data }: Route.MetaArgs) {
  if (!data?.post) {
    return [{ title: "文章未找到 - Zach's Blog" }]
  }

  return [
    { title: `${data.post.title} - Zach's Blog` },
    { name: 'description', content: data.post.excerpt },
  ]
}

export default function Post({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData

  // Simple markdown-like content renderer
  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      // Headers
      if (line.startsWith('# ')) {
        return (
          <h1
            key={index}
            className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4"
          >
            {line.replace('# ', '')}
          </h1>
        )
      }
      if (line.startsWith('## ')) {
        return (
          <h2
            key={index}
            className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-3"
          >
            {line.replace('## ', '')}
          </h2>
        )
      }
      if (line.startsWith('### ')) {
        return (
          <h3
            key={index}
            className="text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-2"
          >
            {line.replace('### ', '')}
          </h3>
        )
      }

      // Code blocks
      if (line.startsWith('```')) {
        return null // Handle in a more sophisticated way if needed
      }

      // Lists
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="text-gray-600 dark:text-gray-300 ml-4">
            {line.replace('- ', '')}
          </li>
        )
      }

      // Regular paragraphs
      if (line.trim() === '') {
        return <br key={index} />
      }

      // Code inline
      const codeRegex = /`([^`]+)`/g
      if (codeRegex.test(line)) {
        const parts = line.split(codeRegex)
        return (
          <p
            key={index}
            className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed"
          >
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <code
                  key={i}
                  className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono"
                >
                  {part}
                </code>
              ) : (
                part
              ),
            )}
          </p>
        )
      }

      return (
        <p
          key={index}
          className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed"
        >
          {line}
        </p>
      )
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>

            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>{post.readTime} 分钟阅读</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            {renderContent(post.content)}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
