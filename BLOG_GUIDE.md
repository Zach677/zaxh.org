# 博客文章管理指南

## 概述

本博客系统已经重构为使用独立的 Markdown 文件来管理文章，不再使用标签功能。每篇文章都是一个独立的 `.md` 文件，存储在 `app/posts/` 目录中。

## 文章结构

每篇文章都包含以下结构：

```markdown
---
title: 文章标题
excerpt: 文章摘要
date: YYYY-MM-DD
readTime: 阅读时间（分钟）
---

# 文章标题

文章内容使用 Markdown 格式...
```

## 添加新文章

### 方法一：使用脚本（推荐）

运行以下命令来创建新文章：

```bash
node scripts/add-post.cjs
```

脚本会提示您输入：
- 文章标题
- 文章摘要  
- 预估阅读时间

脚本会自动：
- 生成文件名（基于标题）
- 设置当前日期
- 创建带有模板内容的 Markdown 文件

### 方法二：手动创建

1. 在 `app/posts/` 目录中创建新的 `.md` 文件
2. 文件名应该是 URL 友好的格式（如：`my-new-post.md`）
3. 添加前置元数据（frontmatter）
4. 编写文章内容

## 文章管理

### 文件位置
- 所有文章存储在 `app/posts/` 目录
- 文件名即为文章的 slug（URL 路径）
- 例如：`app/posts/welcome-to-my-blog.md` → `/posts/welcome-to-my-blog`

### 修改文章
直接编辑对应的 `.md` 文件即可

### 删除文章
删除对应的 `.md` 文件即可

## 支持的 Markdown 功能

- 标题（H1-H6）
- 段落和换行
- 列表（有序和无序）
- 代码块和行内代码
- 链接和图片
- 强调和加粗
- 引用块

## 注意事项

1. **文件命名**：使用小写字母、数字和连字符，避免空格和特殊字符
2. **日期格式**：使用 `YYYY-MM-DD` 格式
3. **阅读时间**：以分钟为单位的整数
4. **内容编写**：使用标准 Markdown 语法

## 示例文章

```markdown
---
title: 我的第一篇技术博客
excerpt: 分享我在学习 React 过程中的心得体会
date: 2024-01-20
readTime: 8
---

# 我的第一篇技术博客

今天我想分享一些关于 React 学习的心得...

## React 基础概念

React 是一个用于构建用户界面的 JavaScript 库...

### 组件

组件是 React 的核心概念：

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

## 总结

通过这次学习，我对 React 有了更深的理解...
```

## 开发工作流程

1. 运行 `node scripts/add-post.cjs` 创建新文章
2. 编辑生成的 Markdown 文件
3. 运行 `npm run dev` 预览效果
4. 提交代码到版本控制系统

这种方式让文章管理更加简单直观，每篇文章都是独立的文件，便于版本控制和协作。 