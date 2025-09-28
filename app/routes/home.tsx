import { Link, data } from "react-router";

import type { Route } from "./+types/home";
import { PostCard } from "@/components/post-card";
import { listPosts } from "@/data/posts.server";

export async function loader({}: Route.LoaderArgs) {
  const posts = await listPosts();
  return data({ latestPosts: posts.slice(0, 5) });
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
    <div className="space-y-16">
      <section className="container-tight space-y-8 pt-8">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:border-slate-800 dark:text-slate-300">
            写作 · 设计 · 构建
          </span>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            一个专注现代前端的简约博客
          </h1>
          <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            记录我对 React Router、Tailwind CSS 以及工程化实践的理解。保持页面干净纯粹，让读者更专注于内容本身。
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            前往博客
            <span aria-hidden>→</span>
          </Link>
          <a
            href="#latest-posts"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500"
          >
            查看最新文章
          </a>
        </div>
      </section>

      <section id="latest-posts" className="container-tight space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">最新文章</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            持续输出实战总结与设计思考。
          </p>
        </div>
        <div className="grid gap-6">
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} layout="horizontal" />
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/70 px-6 py-5 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
          <span>想要更系统地阅读？欢迎从最早的文章开始回顾。</span>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500"
          >
            进入全文档案
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
