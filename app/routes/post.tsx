import { data, redirect } from 'react-router'
import type { Route } from './+types/post'
import { Header } from '@/components/header'
import { getPostBySlug } from '@/data/posts.server'
import { marked } from 'marked'

export async function loader({ params }: Route.LoaderArgs) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    throw redirect('/')
  }

  return data({ post })
}

export const meta = ({ data }: Route.MetaArgs) => {
  if (!data?.post) {
    return [{ title: "Article Not Found - Zach's Blog" }]
  }

  return [
    { title: `${data.post.title} - Zach's Blog` },
    { name: 'description', content: data.post.excerpt },
  ]
}

const Post = ({ loaderData }: Route.ComponentProps) => {
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

      <main className="max-w-3xl mx-auto px-6 py-12 pt-32">
        <article>
          <Header className="mb-8">
            <h1 className="text-h1 text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>

            <div className="flex items-center justify-between text-body-sm text-gray-500 dark:text-gray-400 mb-4">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </time>
              <span>{post.readTime} min read</span>
            </div>
          </Header>

          <div
            className="prose-enhanced max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>
      </main>
    </div>
  )
}

export default Post
