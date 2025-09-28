import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const meta: Route.MetaFunction = () => [
  { title: "zaxh.org — 学习型前端的现代实验室" },
  {
    name: "description",
    content:
      "用 React Router 7 和 Tailwind CSS 打造的现代前端学习与笔记站，记录实践路径与思考。",
  },
  { name: "color-scheme", content: "light dark" },
  { name: "theme-color", content: "#0f172a" },
];

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  },
];

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <html lang="zh-CN" className="scroll-smooth" suppressHydrationWarning>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta />
      <Links />
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `(() => {
            const storageKey = "theme";
            const root = document.documentElement;
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const persisted = localStorage.getItem(storageKey);
            const theme = persisted === "light" || persisted === "dark" ? persisted : "system";
            const isDark = theme === "dark" || (theme === "system" && prefersDark);
            root.dataset.theme = isDark ? "dark" : "light";
            root.classList.toggle("dark", isDark);
          })();`,
        }}
      />
    </head>
    <body className="bg-slate-50 text-slate-900 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {children}
      <ScrollRestoration />
      <Scripts />
    </body>
  </html>
);

const App = () => <Outlet />;

export default App;

export const ErrorBoundary = ({ error }: Route.ErrorBoundaryProps) => {
  const isResponse = isRouteErrorResponse(error);
  const title = isResponse ? `${error.status} ${error.statusText}` : "出错了";
  const description = isResponse
    ? error.data || "页面暂时无法访问，请稍后再试。"
    : error instanceof Error
      ? error.message
      : "发生了未知错误。";

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16 dark:bg-slate-950">
      <div className="max-w-xl space-y-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-500">
          React Router
        </p>
        <h1 className="text-3xl font-bold sm:text-4xl">
          {title}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">{description}</p>
        {!isResponse && error instanceof Error && (
          <details className="rounded-md border border-slate-200 bg-white/70 p-4 text-left text-sm shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70">
            <summary className="cursor-pointer text-slate-900 dark:text-slate-100">
              堆栈信息
            </summary>
            <pre className="mt-2 overflow-x-auto text-xs text-slate-600 dark:text-slate-300">
              <code>{error.stack}</code>
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};
