---
title: "Tailwind CSS 4 安装与主题定制全流程"
summary: "从安装到 @theme 定制，让原子化样式与设计语言保持一致。"
date: "2025-01-08"
tags:
  - tailwind
  - design-system
  - tooling
---

Tailwind CSS 4 改变了以往的配置方式：`@tailwind base` 等指令被 `@import "tailwindcss";` 取代，同时提供了 `@theme`、`@utility` 等原生指令，让你在 CSS 文件里就能定义设计令牌。

## 安装步骤

1. 安装核心依赖：
   ```bash
   pnpm add tailwindcss @tailwindcss/vite -D
   ```
2. 在 `vite.config.ts` 中启用插件：
   ```ts
   import tailwindcss from "@tailwindcss/vite";
   export default defineConfig({
     plugins: [tailwindcss()],
   });
   ```
3. 在入口 CSS 中引入：
   ```css
   @import "tailwindcss";
   ```

## 为什么要用 @theme

`@theme` 允许我们声明自定义的颜色、字体或阴影，并自动生成对应的 CSS 变量：

```css
@theme {
  --color-brand-500: #2563eb;
  --shadow-card: 0 20px 45px -20px rgb(37 99 235 / 0.35);
}
```

之后就可以直接在类名中使用：

```html
<button class="bg-(--color-brand-500) shadow-[--shadow-card] text-white">立即体验</button>
```

## 延伸：让设计系统更具可维护性

- **多主题支持**：结合 `:root[data-theme="dark"]` 可以一键切换到暗色主题。
- **团队协作**：把 `@theme` 内容拆分到独立文件，与设计师共享一份色板。
- **组件封装**：使用 `@utility` 写出复用按钮、卡片等结构，在项目间迁移更轻松。

Tailwind 4 不再依赖 PostCSS，也意味着构建速度更快。拥抱这一套新语法，可以显著缩短设计到落地的距离。
