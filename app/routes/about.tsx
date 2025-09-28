import type { Route } from "./+types/about";

export const meta: Route.MetaFunction = () => [
  { title: "关于我 — zaxh.org" },
  {
    name: "description",
    content: "一名在职学习的前端工程师，分享自学经验、项目实践与长期主义的工作方式。",
  },
];

const About = () => {
  return (
    <div className="container-tight space-y-12">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">你好，我是 Zach</h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          一名自学上岗的前端工程师，长期关注 React 生态、设计系统以及提升个人效率的工程实践。我相信持续输出是检验学习成果的最好方式，于是搭建了这个网站，记录自己的学习路径与思考。
        </p>
        <div className="grid gap-4 text-sm text-slate-600 md:grid-cols-2 dark:text-slate-300">
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">擅长的事情</h2>
            <ul className="mt-3 grid gap-2">
              <li>用 React、TypeScript 构建稳定的中后台产品</li>
              <li>将设计系统/组件库落地并持续演进</li>
              <li>搭建 CI、Lint、测试与自动化发布管线</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">正在探索</h2>
            <ul className="mt-3 grid gap-2">
              <li>React Router 7 的数据提交流水线与渐进式增强</li>
              <li>Tailwind CSS 4 带来的 `@theme` 配色策略</li>
              <li>用 AI 协助代码评审与文档撰写的可靠流程</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">价值观与工作方式</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 dark:border-slate-800 dark:bg-slate-900/70">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">长期主义</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              反复打磨底层能力，而不是追逐短期热点。好奇心 + 节制是保持长期动力的关键。
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 dark:border-slate-800 dark:bg-slate-900/70">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">工程思维</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              在做任何功能前先回答：谁会用、为什么重要、如何验证成功，之后再决定技术实现与拆解策略。
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 dark:border-slate-800 dark:bg-slate-900/70">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">共享与回溯</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              倾向于把尝试过程文档化，方便团队同步，也方便自己在数月后快速回忆决策背景。
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">联系我</h2>
        <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 dark:border-slate-800 dark:bg-slate-900/70">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            如果你也在自学前端，或者希望交流建设个人知识库的经验，欢迎发邮件：
            <a
              href="mailto:hey@zaxh.org"
              className="ml-1 font-semibold text-sky-600 hover:underline dark:text-sky-300"
            >
              hey@zaxh.org
            </a>
            。
          </p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            我会在周末统一回复，也可以在 GitHub @zaxh 的仓库提出 Issues 互动。
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
