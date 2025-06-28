#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 获取命令行参数
const args = process.argv.slice(2)
if (args.length < 2) {
  console.log('Usage: node scripts/add-post.js <title> <excerpt> [tags...]')
  console.log(
    'Example: node scripts/add-post.js "My New Post" "This is a great post about..." React JavaScript',
  )
  process.exit(1)
}

const title = args[0]
const excerpt = args[1]
const tags = args.slice(2)

// 生成 slug
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
  .replace(/^-+|-+$/g, '')

// 生成当前日期
const date = new Date().toISOString().split('T')[0]

// 创建新文章对象
const newPost = {
  slug,
  title,
  excerpt,
  content: `# ${title}

这里是文章的主要内容。你可以使用 Markdown 语法来编写文章。

## 子标题

在这里添加更多内容...

### 小标题

- 列表项 1
- 列表项 2
- 列表项 3

可以使用 \`代码\` 来高亮代码片段。

\`\`\`javascript
// 代码块示例
function hello() {
  console.log("Hello, World!");
}
\`\`\`

继续添加你的内容...
`,
  date,
  tags: tags.length > 0 ? tags : ['未分类'],
  readTime: 5,
}

// 读取现有的 posts.ts 文件
const postsPath = join(__dirname, '../app/data/posts.ts')
let postsContent = readFileSync(postsPath, 'utf-8')

// 找到 posts 数组的位置并插入新文章
const postsArrayMatch = postsContent.match(
  /export const posts: BlogPost\[\] = \[([\s\S]*?)\];/,
)
if (!postsArrayMatch) {
  console.error('无法找到 posts 数组')
  process.exit(1)
}

// 将新文章插入到数组开头
const newPostString = `  ${JSON.stringify(newPost, null, 2).replace(
  /\n/g,
  '\n  ',
)},`
const updatedPostsArray = `export const posts: BlogPost[] = [
${newPostString}
${postsArrayMatch[1]}];`

// 替换文件内容
postsContent = postsContent.replace(
  /export const posts: BlogPost\[\] = \[[\s\S]*?\];/,
  updatedPostsArray,
)

// 写回文件
writeFileSync(postsPath, postsContent, 'utf-8')

console.log(`✅ 成功添加新文章: "${title}"`)
console.log(`📝 Slug: ${slug}`)
console.log(`🏷️  Tags: ${tags.join(', ') || '未分类'}`)
console.log(`📅 Date: ${date}`)
console.log(`\n现在你可以编辑 app/data/posts.ts 来完善文章内容！`)
