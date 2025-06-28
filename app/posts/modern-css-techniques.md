---
title: 现代 CSS 技巧分享
excerpt: 探索 CSS Grid、Flexbox、自定义属性等现代 CSS 技术，提升网页设计能力。
date: 2024-01-05
readTime: 6
---

# 现代 CSS 技巧分享

CSS 在过去几年中发展迅速，让我们看看一些现代化的技巧。

## CSS Grid 布局

CSS Grid 是构建复杂布局的强大工具：

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
```

## CSS 自定义属性

使用 CSS 变量让样式更加灵活：

```css
:root {
  --primary-color: #3b82f6;
  --border-radius: 0.5rem;
}

.button {
  background-color: var(--primary-color);
  border-radius: var(--border-radius);
}
```

## 容器查询

响应式设计的新维度：

```css
@container (min-width: 400px) {
  .card {
    display: flex;
  }
}
```

这些现代 CSS 技术让我们能够创建更加灵活和强大的用户界面。 