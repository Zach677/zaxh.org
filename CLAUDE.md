# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Guidelines

This is a personal project. Follow these principles:
- **No backward compatibility needed** - Feel free to make breaking changes
- **Best practices first** - Always prefer the cleanest, most idiomatic solution
- **Keep it simple** - Avoid over-engineering; this is a personal blog

## Commands

```bash
pnpm dev              # Start development server
pnpm build            # Full production build (client + SSG + RSS)
pnpm lint             # Run ESLint
pnpm preview          # Preview production build
pnpm process-img <input> [<title>]  # Generate BlurHash metadata for images
```

## Architecture

### Build System

Two-phase build process:
1. **Client build**: Standard Vite build → `dist/`
2. **SSG build**: Compiles `src/main.ssg.tsx` → runs `scripts/ssg.ts` (pre-renders HTML) → runs `scripts/generate-rss.ts`

### Content System

Blog posts and pages are MDX files in `data/posts/` and `data/pages/`. Each file exports a `metadata` object:

```javascript
export const metadata = {
  title: 'Post Title',
  description: '...',
  date: '2024-05-01T00:00:00.000Z',
  tags: ['tag1', 'tag2'],
}
```

**Virtual modules** (`plugins/content-provider.ts`) scan these directories and create:
- `virtual:posts` / `virtual:pages` - Lazy-loaded content maps
- `virtual:postIndex` - Pre-sorted array of post metadata (newest first)

### Routing

Routes in `src/routes.tsx` are dynamically generated from virtual modules. Post routes include SEO metadata for SSG.

### Image Handling

Images support BlurHash placeholders via metadata in the title attribute:
```markdown
![](https://example.com/image.png 'Title;1920x1080;LuJkl#~q_3%M...')
```

Run `pnpm process-img <image-path> [title]` to generate this metadata string.

### Key Files

| File | Purpose |
|------|---------|
| `src/main.tsx` | Client entry point |
| `src/main.ssg.tsx` | SSG entry with `render()` and `renderRSS()` exports |
| `src/routes.tsx` | Route definitions |
| `plugins/content-provider.ts` | Virtual modules for posts/pages |
| `src/components/reader/` | MDX rendering components (CodeBlock, Image) |
| `src/theme/ThemeManager.ts` | Dark/light theme with View Transitions API |
