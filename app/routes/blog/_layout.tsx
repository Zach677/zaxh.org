import { Outlet } from "react-router";

const BlogLayout = () => {
  return (
    <div className="space-y-14">
      <section className="container-tight space-y-4 text-center">
        <span className="inline-flex items-center justify-center rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:border-slate-800 dark:text-slate-300">
          Blog
        </span>
        <h1 className="text-balance text-3xl font-semibold text-slate-900 dark:text-white">
          前端实践与学习笔记
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          每一篇文章都配有背景说明、核心代码与延伸阅读建议，帮助你形成体系化理解。
        </p>
      </section>

      <div className="container-tight">
        <Outlet />
      </div>
    </div>
  );
};

export default BlogLayout;
