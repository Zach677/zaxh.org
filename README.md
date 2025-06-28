# Zach's Blog

一个基于 React Router v7 和 Tailwind CSS 构建的现代化简约博客。

## 功能特性

- 🎨 现代化简约设计
- 📱 完全响应式布局
- 🌙 支持深色模式
- 📝 内置博客文章管理
- 🔗 社交媒体链接
- ⚡ 基于 React Router v7 的快速路由
- 🎯 TypeScript 支持
- 🎨 Tailwind CSS 样式

## 页面结构

- **首页** (`/`) - 显示博客文章列表
- **关于页** (`/about`) - 个人介绍和技能展示
- **文章详情** (`/posts/:slug`) - 单篇文章的详细内容

## 技术栈

- **框架**: React 19 + React Router v7
- **样式**: Tailwind CSS v4
- **语言**: TypeScript
- **构建工具**: Vite
- **部署**: Docker 支持

## 快速开始

### 安装依赖

```bash
npm install
# 或
pnpm install
```

### 开发模式

```bash
npm run dev
```

访问 `http://localhost:5173` 查看博客。

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## 自定义配置

### 添加新文章

1. 在 `app/data/posts.ts` 中添加新的文章对象
2. 文章对象包含以下字段：
   - `slug`: URL 路径标识符
   - `title`: 文章标题
   - `excerpt`: 文章摘要
   - `content`: 文章内容（支持简单的 Markdown 语法）
   - `date`: 发布日期
   - `tags`: 标签数组
   - `readTime`: 预计阅读时间（分钟）

### 更新个人信息

1. **博客标题**: 在 `app/components/Header.tsx` 中修改
2. **社交媒体链接**: 在 `app/data/social.ts` 中更新
3. **关于页内容**: 在 `app/routes/about.tsx` 中修改

### 自定义样式

项目使用 Tailwind CSS，你可以：
1. 在 `app/app.css` 中添加自定义样式
2. 修改 Tailwind 配置（如需要）
3. 在组件中使用 Tailwind 类名

## 项目结构

```
app/
├── components/          # 可复用组件
│   ├── Header.tsx      # 导航头部
│   ├── Footer.tsx      # 页脚和社交链接
│   └── BlogCard.tsx    # 博客文章卡片
├── data/               # 数据文件
│   ├── posts.ts        # 博客文章数据
│   └── social.ts       # 社交媒体链接
├── routes/             # 页面路由
│   ├── home.tsx        # 首页
│   ├── about.tsx       # 关于页
│   └── post.tsx        # 文章详情页
├── types/              # TypeScript 类型定义
│   └── blog.ts         # 博客相关类型
├── app.css            # 全局样式
├── root.tsx           # 根布局
└── routes.ts          # 路由配置
```

## 部署

### 使用 Docker

项目包含 Dockerfile，可以直接构建 Docker 镜像：

```bash
docker build -t zach-blog .
docker run -p 3000:3000 zach-blog
```

### 其他部署选项

- **Vercel**: 支持 React Router v7
- **Netlify**: 需要配置重定向规则
- **传统服务器**: 构建后部署 `build` 目录

## 开发说明

### 添加新路由

1. 在 `app/routes.ts` 中添加路由配置
2. 创建对应的路由组件文件
3. 确保组件导出正确的函数（meta, loader, default）

### 样式开发

- 使用 Tailwind CSS 类名进行样式开发
- 支持深色模式，使用 `dark:` 前缀
- 响应式设计使用 `md:`, `lg:` 等前缀

### 类型安全

项目使用 TypeScript，确保：
- 为新的数据结构定义类型
- 使用 React Router 提供的类型定义
- 运行 `npm run typecheck` 检查类型错误

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个博客模板！

## 许可证

MIT License
