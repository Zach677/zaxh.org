import { Link } from "react-router";

import type { PostSummary } from "@/data/posts.server";
import { formatDate, formatReadingMinutes } from "@/lib/format";

interface PostCardProps {
  post: PostSummary;
  layout?: "horizontal" | "vertical";
}

export function PostCard({ post, layout = "vertical" }: PostCardProps) {
  return (
    <article
      className={[
        "group rounded-2xl border border-slate-200 bg-white/80 p-6 transition hover:border-slate-300 hover:shadow-md",
        "dark:border-slate-800/80 dark:bg-slate-900/70 dark:hover:border-slate-700",
        layout === "horizontal" ? "md:flex md:items-center md:justify-between md:gap-10" : "space-y-4",
      ].join(" ")}
    >
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-wide text-sky-600 dark:text-sky-400">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/10 px-2 py-1 text-sky-600 dark:bg-sky-400/10 dark:text-sky-300">
            {formatReadingMinutes(post.readingMinutes)}
          </span>
        </div>

        <Link
          to={`/blog/${post.slug}`}
          className="block text-xl font-semibold text-slate-900 transition hover:text-sky-600 dark:text-slate-100 dark:hover:text-sky-300"
        >
          {post.title}
        </Link>

        {post.summary ? (
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {post.summary}
          </p>
        ) : null}
      </div>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 text-xs text-slate-500 md:justify-end dark:text-slate-400">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200/70 px-3 py-1 dark:border-slate-700/70"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
