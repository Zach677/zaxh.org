import { Link, data } from "react-router";

import type { Route } from "./+types/index";
import { PostCard } from "@/components/post-card";
import { listPosts, listTags } from "@/data/posts.server";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const rawTag = url.searchParams.get("tag");
  const normalizedTag = rawTag ? rawTag.toLowerCase() : null;

  const [posts, tags] = await Promise.all([listPosts(), listTags()]);

  const filteredPosts = normalizedTag
    ? posts.filter((post) =>
        post.tags.some((tag) => tag.toLowerCase() === normalizedTag),
      )
    : posts;

  return data({
    posts: filteredPosts,
    allTags: tags,
    activeTag: normalizedTag,
  });
}

export const meta: Route.MetaFunction = ({ data: loaderData }) => {
  if (!loaderData?.activeTag) {
    return [
      { title: "博客 — zaxh.org" },
      {
        name: "description",
        content: "关注前端工程化、React Router 7 与 Tailwind CSS 的实践笔记。",
      },
    ];
  }

  return [
    { title: `#${loaderData.activeTag} 标签文章 — zaxh.org` },
    {
      name: "description",
      content: `关于 ${loaderData.activeTag} 的前端文章合集。`,
    },
  ];
};

const BlogIndex = ({ loaderData }: Route.ComponentProps) => {
  const { posts, allTags, activeTag } = loaderData;

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
        <TagLink label="全部" to="/blog" isActive={!activeTag} />
        {allTags.map((tag) => (
          <TagLink
            key={tag}
            label={`#${tag}`}
            to={`/blog?tag=${encodeURIComponent(tag)}`}
            isActive={activeTag === tag.toLowerCase()}
          />
        ))}
      </div>

      <div className="grid gap-6">
        {posts.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-200 bg-white/60 p-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
            暂时没有匹配的文章，试着切换其他标签。
          </p>
        ) : (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>
    </div>
  );
};

interface TagLinkProps {
  label: string;
  to: string;
  isActive: boolean;
}

function TagLink({ label, to, isActive }: TagLinkProps) {
  return (
    <Link
      to={to}
      className={[
        "rounded-full border px-4 py-2 transition",
        isActive
          ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300",
      ].join(" ")}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

export default BlogIndex;
