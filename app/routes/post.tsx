import { data, redirect } from 'react-router'
import type { Route } from './+types/post'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { getPostBySlug } from '../data/posts.server'
import { marked } from 'marked'

export async function loader({ params }: Route.LoaderArgs) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    throw redirect('/')
  }

  return data({ post })
}

export function meta({ data }: Route.MetaArgs) {
  if (!data?.post) {
    return [{ title: "Article Not Found - Zach's Blog" }]
  }

  return [
    { title: `${data.post.title} - Zach's Blog` },
    { name: 'description', content: data.post.excerpt },
  ]
}

export default function Post({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData

  // Configure marked options
  marked.setOptions({
    breaks: true,
    gfm: true,
  })

  const htmlContent = marked(post.content)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12 pt-32">
        <article className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>

            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>{post.readTime} min read</span>
            </div>
          </header>

          <div
            className="prose prose-gray dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>
      </main>

      <Footer />
    </div>
  )
}
