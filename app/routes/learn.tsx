import type { Route } from "./+types/learn";

const phases = [
  {
    title: "阶段 1：语言与浏览器基础",
    focus: "掌握 HTML/CSS/JavaScript 的核心语法与运行环境",
    items: [
      "用语义化标签与可访问性属性构建页面骨架",
      "理解 Flex/Grid 布局与响应式断点设计",
      "使用 fetch/async await 与浏览器存储 API",
    ],
    projects: [
      "纯原生 JS 实现 ToDo List，并支持状态持久化",
      "用 CSS Grid 搭建多栏布局的博客首页",
    ],
    resources: [
      {
        title: "MDN Web Docs",
        url: "https://developer.mozilla.org/zh-CN/",
        note: "最权威的浏览器与语言文档，建议边查边做笔记。",
      },
      {
        title: "JavaScript.info",
        url: "https://zh.javascript.info/",
        note: "系统梳理 JS 语言特性与异步模型。",
      },
    ],
  },
  {
    title: "阶段 2：React 与组件化思维",
    focus: "用 React 建立组件化、状态管理与路由的理解",
    items: [
      "函数组件、hooks 与 props/state 数据流管理",
      "React Router 7 的数据加载、Action 与错误边界",
      "Tailwind CSS 的原子化设计与设计令牌",
    ],
    projects: [
      "实现一个带登录流程的迷你知识库，使用 React Router data APIs",
      "使用 Tailwind CSS 构建组件库并提炼可复用的设计模式",
    ],
    resources: [
      {
        title: "React 官方教程",
        url: "https://react.dev/learn",
        note: "重点理解状态提升与数据流，而不是死记 API。",
      },
      {
        title: "React Router 文档",
        url: "https://reactrouter.com/",
        note: "关注 Data APIs 与 Deployment 章节，掌握服务器/客户端双端能力。",
      },
      {
        title: "Tailwind CSS 设计指南",
        url: "https://tailwindcss.com/docs/utility-first",
        note: "理解设计原子化后如何保证响应式与一致性。",
      },
    ],
  },
  {
    title: "阶段 3：工程化与质量保障",
    focus: "让项目具备可维护性与自动化能力",
    items: [
      "Vite 构建流程、自定义插件与环境变量管理",
      "Vitest/Playwright 测试编排与覆盖率策略",
      "CI/CD（GitHub Actions、Vercel）与监控告警",
    ],
    projects: [
      "配置 lint-staged + Husky 的提交校验，保持代码规范",
      "在 Vercel/Cloudflare Pages 上部署并开启错误监控",
    ],
    resources: [
      {
        title: "Vitest 文档",
        url: "https://vitest.dev/",
        note: "将 React 组件测试与数据逻辑测试纳入流水线。",
      },
      {
        title: "GitHub Actions 入门",
        url: "https://docs.github.com/zh/actions",
        note: "学会编排构建、测试与部署流程。",
      },
    ],
  },
];

export const meta: Route.MetaFunction = () => [
  { title: "前端学习路径 — zaxh.org" },
  {
    name: "description",
    content: "分阶段规划初学者到工程化实践者的前端成长路线，附带项目练习与拓展资源。",
  },
];

const Learn = () => {
  return (
    <div className="container-tight space-y-12">
      <section className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">面向自学者的前端路线图</h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          阶段化的学习策略，确保你在掌握基础的同时也能尽早接触真实项目，避免只会写 Demo 的陷阱。
        </p>
      </section>

      <div className="space-y-8">
        {phases.map((phase) => (
          <section
            key={phase.title}
            className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/70"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                  {phase.title}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">{phase.focus}</p>
              </div>
              <span className="inline-flex items-center rounded-full bg-sky-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-sky-600 dark:bg-sky-400/10 dark:text-sky-300">
                推荐时长：4-6 周
              </span>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">要点拆解</h3>
                <ul className="grid gap-2">
                  {phase.items.map((item) => (
                    <li key={item} className="flex gap-3 rounded-2xl border border-slate-200/60 bg-white/70 px-4 py-3 dark:border-slate-700/60 dark:bg-slate-900/60">
                      <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">练手项目</h3>
                <ul className="grid gap-2">
                  {phase.projects.map((project) => (
                    <li key={project} className="rounded-2xl border border-dashed border-slate-200 px-4 py-3 text-slate-600 dark:border-slate-700 dark:text-slate-300">
                      {project}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50/90 p-6 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-300">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">延伸阅读</h3>
                <ul className="grid gap-3">
                  {phase.resources.map((resource) => (
                    <li key={resource.url}>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-sky-600 hover:underline dark:text-sky-300"
                      >
                        {resource.title}
                      </a>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{resource.note}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Learn;
