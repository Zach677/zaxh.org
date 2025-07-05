import type { BlogPost } from '../types/blog'

// This is the client version, used for static data at build time
// Server-side should use posts.server.ts
export const posts: BlogPost[] = [
  {
    slug: 'welcome-to-my-blog',
    title: 'Welcome to My Blog',
    excerpt:
      'This is my first blog post, sharing some thoughts about technology and life.',
    content: `# Welcome to My Blog

This is my first blog post. Here, I will share some thoughts about technology, programming, and life.

## Why Write a Blog

Writing a blog can help me:
- Organize and record the learning process
- Share useful technical knowledge
- Communicate and discuss with peers
- Improve writing and expression skills

## Blog Content

This blog will mainly include:
- Frontend development technology sharing
- Project practice experience
- Study notes and insights
- Life reflections

Thank you for reading, I hope my sharing is helpful to you!`,
    date: '2024-01-15',
    readTime: 3,
  },
  {
    slug: 'react-router-v7-guide',
    title: 'React Router v7 Practical Guide',
    excerpt:
      'Deep dive into React Router v7 new features and best practices for building modern single-page applications.',
    content: `# React Router v7 Practical Guide

React Router v7 brings many exciting new features, let's explore these improvements together.

## Main New Features

### 1. Simplified Route Configuration
The new version provides a more concise way to configure routes:

\`\`\`typescript
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
] satisfies RouteConfig;
\`\`\`

### 2. Improved Type Support
v7 provides better TypeScript support, including auto-generated type definitions.

### 3. Performance Optimizations
- Better code splitting
- Optimized preloading mechanism
- Reduced bundle size

## Best Practices

1. **Use File System Routing**: Leverage convention over configuration principles
2. **Proper Use of Loaders**: Preload data at the route level
3. **Error Boundaries**: Add appropriate error handling for each route

React Router v7 is a powerful upgrade, worth learning and using for every React developer.`,
    date: '2024-01-10',
    readTime: 8,
  },
  {
    slug: 'modern-css-techniques',
    title: 'Modern CSS Techniques Sharing',
    excerpt:
      'Explore modern CSS technologies like CSS Grid, Flexbox, custom properties, and improve web design capabilities.',
    content: `# Modern CSS Techniques Sharing

CSS has evolved rapidly in recent years, let's look at some modern techniques.

## CSS Grid Layout

CSS Grid is a powerful tool for building complex layouts:

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
\`\`\`

## CSS Custom Properties

Using CSS variables makes styles more flexible:

\`\`\`css
:root {
  --primary-color: #3b82f6;
  --border-radius: 0.5rem;
}

.button {
  background-color: var(--primary-color);
  border-radius: var(--border-radius);
}
\`\`\`

## Container Queries

A new dimension of responsive design:

\`\`\`css
@container (min-width: 400px) {
  .card {
    display: flex;
  }
}
\`\`\`

These modern CSS technologies allow us to create more flexible and powerful user interfaces.`,
    date: '2024-01-05',
    readTime: 6,
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getAllPosts(): BlogPost[] {
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}
