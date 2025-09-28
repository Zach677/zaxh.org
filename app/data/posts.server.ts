import { readFile, readdir } from "node:fs/promises";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";
import { marked } from "marked";

export interface PostSummary {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  tags: string[];
  readingMinutes: number;
}

export interface Post extends PostSummary {
  content: string;
  html: string;
}

const POSTS_DIR = fileURLToPath(new URL("../content/posts", import.meta.url));
const WORDS_PER_MINUTE = 320;

marked.use({ gfm: true, breaks: true });

function estimateReadingMinutes(text: string) {
  const words = text
    .replace(/[#*_>/\\`-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function normaliseTags(raw?: unknown): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw
      .map((tag) => (typeof tag === "string" ? tag.trim() : ""))
      .filter(Boolean);
  }
  if (typeof raw === "string") {
    return raw
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
}

async function resolveMarkdownFiles() {
  const files = await readdir(POSTS_DIR);
  return files.filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
}

async function parseMarkdownFile(filename: string) {
  const fullPath = join(POSTS_DIR, filename);
  const fileContents = await readFile(fullPath, "utf-8");
  const { content, data: frontmatter } = matter(fileContents);

  const title = typeof frontmatter.title === "string" ? frontmatter.title : "未命名文章";
  const summary = typeof frontmatter.summary === "string" ? frontmatter.summary : "";
  const publishedAt = typeof frontmatter.date === "string" ? frontmatter.date : new Date().toISOString();
  const tags = normaliseTags(frontmatter.tags);
  const slug = frontmatter.slug && typeof frontmatter.slug === "string"
    ? frontmatter.slug
    : basename(filename).replace(/\.(md|mdx)$/i, "");

  const html = marked.parse(content, { async: false }) as string;

  const readingMinutes = estimateReadingMinutes(content);

  return {
    slug,
    title,
    summary,
    publishedAt,
    tags,
    content,
    html,
    readingMinutes,
  } satisfies Post;
}

export async function listPosts(): Promise<PostSummary[]> {
  const files = await resolveMarkdownFiles();
  const parsed = await Promise.all(files.map(parseMarkdownFile));

  return parsed
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .map(({ content: _content, html: _html, ...summary }) => summary);
}

export async function getPost(slug: string): Promise<Post | null> {
  const files = await resolveMarkdownFiles();
  for (const file of files) {
    const candidate = await parseMarkdownFile(file);
    if (candidate.slug === slug) {
      return candidate;
    }
  }
  return null;
}

export async function listTags(): Promise<string[]> {
  const posts = await listPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}
