#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve))
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim()
}

async function main() {
  console.log('📝 创建新博客文章\n')

  const title = await question('文章标题: ')
  const excerpt = await question('文章摘要: ')
  const readTime = await question('预估阅读时间（分钟）: ')

  const slug = slugify(title)
  const date = new Date().toISOString().split('T')[0]

  const frontmatter = `---
title: ${title}
excerpt: ${excerpt}
date: ${date}
readTime: ${parseInt(readTime) || 5}
---

# ${title}

在这里写文章内容...

## 章节标题

文章内容...
`

  const postsDir = path.join(process.cwd(), 'app', 'posts')
  const filePath = path.join(postsDir, `${slug}.md`)

  // 确保posts目录存在
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true })
  }

  // 检查文件是否已存在
  if (fs.existsSync(filePath)) {
    console.log(`❌ 文件 ${slug}.md 已存在！`)
    process.exit(1)
  }

  fs.writeFileSync(filePath, frontmatter)

  console.log(`✅ 成功创建文章: ${filePath}`)
  console.log(`📄 文件名: ${slug}.md`)
  console.log(`🔗 URL: /posts/${slug}`)

  rl.close()
}

main().catch(console.error)
