# 博客使用指南

## 快速开始

### 1. 个性化设置

在开始写博客之前，请先更新以下信息：

#### 更新博客标题和导航
编辑 `app/components/Header.tsx`：
```typescript
<Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
  你的博客名称  {/* 修改这里 */}
</Link>
```

#### 更新社交媒体链接
编辑 `app/data/social.ts`：
```typescript
export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/你的用户名",  // 修改这里
    icon: "github",
  },
  // ... 其他链接
];
```

#### 更新关于页面
编辑 `app/routes/about.tsx` 中的个人信息。

### 2. 添加新文章

#### 方法一：使用脚本（推荐）
```bash
npm run add-post "文章标题" "文章摘要" 标签1 标签2
```

例如：
```bash
npm run add-post "学习 TypeScript" "TypeScript 的基础知识和实践经验" TypeScript JavaScript 前端
```

#### 方法二：手动添加
在 `app/data/posts.ts` 中添加新的文章对象：

```typescript
{
  slug: "your-post-slug",
  title: "你的文章标题",
  excerpt: "文章摘要...",
  content: `
# 你的文章标题

文章内容...
  `,
  date: "2024-01-20",
  tags: ["标签1", "标签2"],
  readTime: 5,
}
```

### 3. 编写文章内容

文章内容支持简单的 Markdown 语法：

- `# 标题` - 一级标题
- `## 标题` - 二级标题  
- `### 标题` - 三级标题
- `- 列表项` - 无序列表
- `` `代码` `` - 行内代码
- 普通段落

### 4. 运行和预览

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 运行生产版本
npm start
```

## 自定义样式

### 修改主题色
在 `app/app.css` 中添加自定义 CSS 变量或修改 Tailwind 类名。

### 添加新组件
在 `app/components/` 目录下创建新的 React 组件。

### 修改布局
编辑相应的页面文件：
- `app/routes/home.tsx` - 首页
- `app/routes/about.tsx` - 关于页
- `app/routes/post.tsx` - 文章详情页

## 部署

### Vercel 部署
1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

### Docker 部署
```bash
docker build -t my-blog .
docker run -p 3000:3000 my-blog
```

## 常见问题

### Q: 如何修改博客的 favicon？
A: 替换 `public/favicon.ico` 文件。

### Q: 如何添加 Google Analytics？
A: 在 `app/root.tsx` 的 `<head>` 部分添加 GA 脚本。

### Q: 如何支持更复杂的 Markdown？
A: 可以集成 `react-markdown` 或其他 Markdown 解析库。

### Q: 如何添加评论系统？
A: 可以集成 Disqus、Gitalk 或其他评论系统。

## 技术支持

如果遇到问题，请：
1. 检查控制台错误信息
2. 确保所有依赖都已正确安装
3. 查看 React Router v7 官方文档
4. 提交 Issue 到项目仓库 