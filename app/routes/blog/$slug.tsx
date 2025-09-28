import { Link, data } from "react-router";

import type { Route } from "./+types/$slug";
import { formatDate, formatReadingMinutes } from "@/lib/format";
import { getPost } from "@/data/posts.server";

export async function loader({ params }: Route.LoaderArgs) {
  const slug = params.slug;
  if (!slug) {
    throw new Response("缺少文章标识", { status: 400 });
  }

  const post = await getPost(slug);
  if (!post) {
    throw new Response("没有找到对应的文章", { status: 404 });
  }

  return data({ post });
}

export const meta: Route.MetaFunction = ({ data: loaderData }) => {
  if (!loaderData?.post) {
    return [{ title: "文章未找到 — zaxh.org" }];
  }

  return [
    { title: `${loaderData.post.title} — zaxh.org` },
    { name: "description", content: loaderData.post.summary },
  ];
};

const BlogPost = ({ loaderData }: Route.ComponentProps) => {
  const { post } = loaderData;

  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <header className="space-y-4 text-center">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <span aria-hidden>←</span>
          返回文章列表
        </Link>
        <h1 className="text-balance text-3xl font-semibold text-slate-900 dark:text-white">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span>{formatReadingMinutes(post.readingMinutes)}</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200/70 px-3 py-1 dark:border-slate-700/70"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      <div
        className="prose-content"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  );
};

export default BlogPost;
