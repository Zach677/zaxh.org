import { Link, data } from "react-router";

import type { Route } from "./+types/home";
import { PostCard } from "@/components/post-card";
import { listPosts } from "@/data/posts.server";

export async function loader({}: Route.LoaderArgs) {
  const posts = await listPosts();
  return data({ latestPosts: posts.slice(0, 3) });
}

export const meta: Route.MetaFunction = () => [
  { title: "zaxh.org — 前端路上的长期主义" },
  {
    name: "description",
    content: "React Router 7 + Tailwind CSS 打造的前端学习与写作实验室，涵盖实践记录、学习路径与工具清单。",
  },
];

const Home = ({ loaderData }: Route.ComponentProps) => {
  const { latestPosts } = loaderData;

  return (
    <div className="space-y-20">
      <section className="container-tight pt-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
              前端自学路线图正在更新
            </span>
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
              用现代工具搭建你的前端知识体系
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              结合 React Router 7 的数据路由和 Tailwind CSS 的设计体系，构建既实用又优雅的前端项目。从零开始积累实践经验，持续迭代自己的知识库。
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/learn"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                开始学习路线
                <span aria-hidden>→</span>
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500"
              >
                浏览最新文章
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 via-transparent to-indigo-500/10" />
              <div className="relative p-8 space-y-6">
                <div>
                  <p className="text-sm font-semibold text-sky-500">技术栈亮点</p>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                    React Router 7 + Tailwind CSS 4
                  </h2>
                </div>
                <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-500" aria-hidden />
                    <span>
                      数据路由 + Action API：在组件之外完成数据读取与提交逻辑，提高复用性。
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-500" aria-hidden />
                    <span>
                      Tailwind 4 即插即用：利用全新 `@theme` 语法定制品牌色，快速迭代设计系统。
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-500" aria-hidden />
                    <span>
                      仅使用 React 官方方案：不依赖 Next.js，也能享受同样的 SSR 与代码拆分体验。
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-tight">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">最新文章</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              每篇文章都会结合问题背景、实战代码和延伸学习建议。
            </p>
          </div>
          <Link
            to="/blog"
            className="text-sm font-semibold text-sky-600 hover:text-sky-500 dark:text-sky-300"
          >
            查看全部文章
          </Link>
        </div>
        <div className="mt-8 grid gap-6">
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} layout="horizontal" />
          ))}
        </div>
      </section>

      <section className="container-tight">
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/80">
          <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-sky-500">
                自学者的路线图
              </p>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                分阶段构建你的前端能力矩阵
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                从基础语言到工程化部署，每个阶段都提供练手项目与进阶方向，避免迷茫式学习。
              </p>
            </div>
            <ol className="grid gap-5 text-sm text-slate-600 dark:text-slate-300">
              <li className="rounded-2xl border border-slate-200/80 bg-white/70 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">第一阶段：语言地基</h3>
                <p>夯实 HTML/CSS/JavaScript 基础，学会用浏览器 DevTools 解决问题。</p>
              </li>
              <li className="rounded-2xl border border-slate-200/80 bg-white/70 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">第二阶段：React + Router 驱动的应用</h3>
                <p>掌握组件化思维、状态管理、数据请求，以及 React Router 7 数据 API。</p>
              </li>
              <li className="rounded-2xl border border-slate-200/80 bg-white/70 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">第三阶段：工程化与部署</h3>
                <p>了解构建工具、代码质量、部署流程，搭建 CI/CD 和监控体系。</p>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
