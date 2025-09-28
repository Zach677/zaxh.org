---
title: "前端自学者的自检清单"
summary: "帮你确认是否真正掌握了一个知识点，并给出下一步的实践方向。"
date: "2025-01-02"
tags:
  - learning
  - checklist
  - productivity
---

学习的陷阱在于“看懂了”不等于“会做”。这份清单覆盖三个维度，帮助自学者判断是否可以进入下一阶段。

## 语言基础

- [ ] 理解事件循环、宏任务/微任务的执行顺序
- [ ] 可以手写 `Promise.all`、`Array.prototype.map`
- [ ] 熟悉浏览器渲染流程，知道重排与重绘的区别

延伸练习：用原生 JS 实现一个带节流/防抖的搜索框，记录调试思路。

## 框架实践

- [ ] 能解释 React 中受控组件 vs 非受控组件的差异
- [ ] 会使用 React Router 的错误边界与懒加载路由
- [ ] 熟悉状态管理策略（Context、Zustand 或 Redux Toolkit）

延伸练习：将一个多步骤表单拆分为嵌套路由，使用 loader 提前准备数据。

## 工程能力

- [ ] 项目中配置了 ESLint + Prettier + TypeScript 的组合
- [ ] 至少为核心逻辑写过 10+ 条 Vitest 单元测试
- [ ] 了解打包产物分析，知道如何优化首屏加载

延伸练习：

```bash
pnpm dlx @vercel/speed-insights
```

使用 Vercel 提供的工具分析网站性能，并写一份行动计划。

> 小贴士：把 checklist 写进项目的 README，并定期更新，能帮助你回顾不同阶段的进步。
