import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import type { BlogPost } from '../types/blog'

const postsDirectory = join(process.cwd(), 'app/posts')

function getPostSlugs(): string[] {
  return readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
}

function getPostBySlugFromFile(slug: string): BlogPost | undefined {
  try {
    const fullPath = join(postsDirectory, `${slug}.md`)
    const fileContents = readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      content,
      date: data.date,
      readTime: data.readTime,
    }
  } catch (error) {
    return undefined
  }
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getPostBySlugFromFile(slug)
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlugFromFile(slug))
    .filter((post): post is BlogPost => post !== undefined)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}
