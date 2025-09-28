import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="container-tight flex flex-col items-center gap-6 text-center">
      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-sky-500/10 text-3xl font-bold text-sky-500">
        404
      </span>
      <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">页面离家出走了</h1>
      <p className="max-w-md text-sm text-slate-600 dark:text-slate-300">
        你访问的地址暂时不存在。可以回到首页继续浏览学习路线和文章，或者通过导航探索其他内容。
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-slate-700 dark:bg-white dark:text-slate-900"
      >
        回到首页
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
};

export const meta = () => [
  { title: "页面未找到 — zaxh.org" },
  { name: "robots", content: "noindex" },
];

export default NotFound;
