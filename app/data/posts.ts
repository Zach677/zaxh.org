import type { BlogPost } from '../types/blog'

export const posts: BlogPost[] = [
  {
    slug: 'welcome-to-my-blog',
    title: '欢迎来到我的博客',
    excerpt: '这是我的第一篇博客文章，分享一些关于技术和生活的思考。',
    content: `
# 欢迎来到我的博客

这是我的第一篇博客文章。在这里，我将分享一些关于技术、编程和生活的思考。

## 为什么写博客

写博客可以帮助我：
- 整理和记录学习过程
- 分享有用的技术知识
- 与同行交流和讨论
- 提升写作和表达能力

## 博客内容

这个博客将主要包含：
- 前端开发技术分享
- 项目实践经验
- 学习笔记和心得
- 生活感悟

感谢你的阅读，希望我的分享对你有所帮助！
    `,
    date: '2024-01-15',
    tags: ['随笔', '开始'],
    readTime: 3,
  },
  {
    slug: 'react-router-v7-guide',
    title: 'React Router v7 实践指南',
    excerpt:
      '深入了解 React Router v7 的新特性和最佳实践，构建现代化的单页应用。',
    content: `
# React Router v7 实践指南

React Router v7 带来了许多令人兴奋的新特性，让我们一起探索这些改进。

## 主要新特性

### 1. 简化的路由配置
新版本提供了更简洁的路由配置方式：

\`\`\`typescript
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
] satisfies RouteConfig;
\`\`\`

### 2. 改进的类型支持
v7 提供了更好的 TypeScript 支持，包括自动生成的类型定义。

### 3. 性能优化
- 更好的代码分割
- 优化的预加载机制
- 减少的包体积

## 最佳实践

1. **使用文件系统路由**：利用约定优于配置的原则
2. **合理使用 Loader**：在路由级别预加载数据
3. **错误边界**：为每个路由添加适当的错误处理

React Router v7 是一个强大的升级，值得每个 React 开发者学习和使用。
    `,
    date: '2024-01-10',
    tags: ['React', 'Router', '前端'],
    readTime: 8,
  },
  {
    slug: 'modern-css-techniques',
    title: '现代 CSS 技巧分享',
    excerpt:
      '探索 CSS Grid、Flexbox、自定义属性等现代 CSS 技术，提升网页设计能力。',
    content: `
# 现代 CSS 技巧分享

CSS 在过去几年中发展迅速，让我们看看一些现代化的技巧。

## CSS Grid 布局

CSS Grid 是构建复杂布局的强大工具：

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
\`\`\`

## CSS 自定义属性

使用 CSS 变量让样式更加灵活：

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

## 容器查询

响应式设计的新维度：

\`\`\`css
@container (min-width: 400px) {
  .card {
    display: flex;
  }
}
\`\`\`

这些现代 CSS 技术让我们能够创建更加灵活和强大的用户界面。
    `,
    date: '2024-01-05',
    tags: ['CSS', '前端', '设计'],
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
