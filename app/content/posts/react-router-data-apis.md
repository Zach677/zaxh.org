---
title: "React Router 7 的数据 API 实战指南"
summary: "理解 loader 与 action 的协作方式，并用渐进式增强提升用户体验。"
date: "2025-01-15"
tags:
  - react-router
  - data
  - progressive-enhancement
---

React Router 7 的核心亮点是数据 API：`loader` 负责读取数据，`action` 负责提交数据，并且两者都运行在路由模块之外的服务端环境。这意味着你可以在保持组件纯粹的同时，把副作用逻辑集中管理。

## 什么时候应该使用 loader/action？

- **需要在渲染前获取数据时**：例如博客文章详情页，提前把 Markdown 转成 HTML 并返回。
- **需要提交表单并返回结果时**：使用 action 可以避免手写 `fetch`，直接在组件使用 `<Form>` 即可获取结果。
- **希望拥有一致的错误处理体验**：`throw new Response()` 会自动进入 ErrorBoundary。

## 组合 loader + action 的延伸玩法

1. **Optimistic UI**：在 action 中返回最新状态，在组件中用 `useActionData()` 暂存，待 loader 再次执行后回归真实数据。
2. **渐进式增强**：action 中仍然返回 JSON，但组件里用 `<fetcher.Form>`，即便 JS 失效，表单也能回落到原生体验。
3. **流式渲染**：结合 `defer` 返回部分数据，组件里用 `<Await>` 做骨架屏，减轻首屏压力。

## 代码片段

```tsx
// routes/notes.tsx
export async function loader() {
  return data({ notes: await db.note.findMany() });
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const content = String(formData.get("content"));
  await db.note.create({ data: { content } });
  return redirect("/notes");
}
```

延伸思考：当项目规模增大时，可以把数据逻辑抽离到 `app/services`，并结合 Zod 做请求参数校验，这样前后端就能共享一份类型定义。
