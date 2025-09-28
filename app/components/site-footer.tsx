import { Link } from "react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white/70 py-10 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
      <div className="container-tight flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-base font-semibold text-slate-900 dark:text-slate-100">zaxh.org</p>
          <p>记录一个前端学习者的实践路径与思考。</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link className="hover:text-slate-900 dark:hover:text-slate-100" to="/">
            首页
          </Link>
          <Link className="hover:text-slate-900 dark:hover:text-slate-100" to="/blog">
            博客
          </Link>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-500">
          © {new Date().getFullYear()} Zach. 基于 React Router 7 & Tailwind CSS 构建。
        </p>
      </div>
    </footer>
  );
}
