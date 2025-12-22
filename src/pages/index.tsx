import { Link } from "react-router";

import { Logo } from "@/components/Logo";
import { FormattedTime } from "@/components/FormattedTime";
import postIndex from "virtual:postIndex";

function PostItem({ post }: { post: PostMetadata }) {
  const date = new Date(post.date!);

  return (
    <li className="mb-8 flex flex-col gap-1">
      <Link
        className="text-xl font-semibold underline decoration-transparent transition-colors duration-200 hover:decoration-primary"
        to={`/post/${post.slug}`}
      >
        {post.title}
      </Link>
      <FormattedTime className="text-sm text-secondary" dateTime={date} />
    </li>
  );
}

export default function RootPage() {
  return (
    <main>
      <h1 className="page-title font-mono">
        <Logo iconSize={48} />
      </h1>
      <p className="page-subtitle">
        I write code so my cat and dog can have a better life.
      </p>
      <div className="mt-16">
        {postIndex.length > 0 ? (
          <ul>
            {postIndex.map((post) => (
              <PostItem key={post.slug} post={post} />
            ))}
          </ul>
        ) : (
          <p className="text-secondary">No posts yet. Stay tuned!</p>
        )}
      </div>
    </main>
  );
}
