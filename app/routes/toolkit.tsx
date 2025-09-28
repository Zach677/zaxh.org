import type { Route } from "./+types/toolkit";

const toolkits = [
  {
    category: "编辑器与插件",
    description: "保持一致的代码风格与高效的重构体验。",
    tools: [
      {
        name: "VS Code + Profiles",
        url: "https://code.visualstudio.com/",
        notes: "通过 Profiles 管理不同项目的扩展与配置，避免插件冲突。",
      },
      {
        name: "Tailwind CSS IntelliSense",
        url: "https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss",
        notes: "在编写类名时提供自动补全与设计令牌提示。",
      },
      {
        name: "Error Lens",
        url: "https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens",
        notes: "让代码错误在编辑器内即时高亮，避免频繁切换终端。",
      },
    ],
  },
  {
    category: "设计与原型",
    description: "围绕设计系统快速协作与实现。",
    tools: [
      {
        name: "Figma",
        url: "https://figma.com/",
        notes: "组件化设计与交互说明，方便前端落地。",
      },
      {
        name: "Panda Icons",
        url: "https://panda-icons.com/",
        notes: "轻量、易于在 Tailwind 中使用的开源图标库。",
      },
      {
        name: "ColorDesigner",
        url: "https://colordesigner.io/",
        notes: "生成渐变与 Tailwind token，可导出到 `@theme` 配置。",
      },
    ],
  },
  {
    category: "质量保障",
    description: "确保交付的每个版本都可回溯、可度量。",
    tools: [
      {
        name: "Vitest",
        url: "https://vitest.dev/",
        notes: "轻量却功能完整的单元测试框架，支持 React Testing Library。",
      },
      {
        name: "Playwright",
        url: "https://playwright.dev/",
        notes: "端到端测试与截图对比，保障关键路径稳定性。",
      },
      {
        name: "Changesets",
        url: "https://github.com/changesets/changesets",
        notes: "在多包仓库中生成语义化版本记录与发布流程。",
      },
    ],
  },
  {
    category: "部署与监控",
    description: "上线只是起点，观测与回滚策略同样重要。",
    tools: [
      {
        name: "Vercel",
        url: "https://vercel.com/",
        notes: "适合前端项目的托管，支持自动预览与环境变量管理。",
      },
      {
        name: "PlanetScale",
        url: "https://planetscale.com/",
        notes: "Serverless MySQL，适合与 Prisma/Drizzle 搭配使用。",
      },
      {
        name: "Sentry",
        url: "https://sentry.io/",
        notes: "捕获前端运行时错误与性能瓶颈。",
      },
    ],
  },
];

export const meta: Route.MetaFunction = () => [
  { title: "常用工具箱 — zaxh.org" },
  {
    name: "description",
    content: "整理前端开发过程中常用的编辑器、设计、测试与部署工具，附带实践中的使用要点。",
  },
];

const Toolkit = () => {
  return (
    <div className="container-tight space-y-12">
      <section className="space-y-4 text-center">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">前端工具箱</h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          精选能真正提升效率的工具，并附上实际项目中的使用心得与注意事项。
        </p>
      </section>

      <div className="grid gap-8">
        {toolkits.map((group) => (
          <section
            key={group.category}
            className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/70"
          >
            <header className="space-y-2">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{group.category}</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">{group.description}</p>
            </header>
            <ul className="mt-6 grid gap-4">
              {group.tools.map((tool) => (
                <li
                  key={tool.url}
                  className="rounded-2xl border border-slate-200/80 bg-white/70 p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-base font-semibold text-sky-600 hover:underline dark:text-sky-300"
                    >
                      {tool.name}
                    </a>
                    <span className="text-xs text-slate-500 dark:text-slate-400">点击跳转官网</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{tool.notes}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Toolkit;
