# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Guidelines

This is a personal project. Follow these principles:
- **No backward compatibility needed** - Feel free to make breaking changes
- **Best practices first** - Always prefer the cleanest, most idiomatic solution
- **Keep it simple** - Avoid over-engineering; this is a personal hub

## Commands

```bash
pnpm dev              # Start development server
pnpm build            # Full production build (client + SSG)
pnpm lint             # Run ESLint
pnpm preview          # Preview production build
```

## Architecture

### Build System

Two-phase build process:
1. **Client build**: Standard Vite build → `dist/`
2. **SSG build**: Compiles `src/main.ssg.tsx` → runs `scripts/ssg.ts` (pre-renders HTML) → runs `scripts/generate-vercel-config.ts`

### Content

The home page is a small book: `src/components/book/Book.tsx` owns the cover, the turning leaves, and the narrow-screen fallback; `src/pages/index.tsx` lists the pages in reading order (frontispiece, contents, about, appendix). Contents continues onto more pages as projects grow (`ENTRIES_PER_PAGE`), and a blank page keeps the spreads paired. Page sizes are em of a base that scales with the book, so a page holds the same content at every viewport. Project copy lives in `data/projects.ts`. The site also has `/mitori/privacy`.

### Routing

Routes in `src/routes.tsx` are static. The book has its own chrome; other pages share `RootLayout` (nav, a centered column, the footer). The nav links `/#work` and `/#about` open the book at contents or about. Quiet `/mitori/privacy` is kept for App Store.

### Key Files

| File | Purpose |
|------|---------|
| `src/main.tsx` | Client entry point |
| `src/main.ssg.tsx` | SSG entry with `render()` export |
| `src/routes.tsx` | Route definitions |
| `data/projects.ts` | Project index |
| `src/theme/ThemeManager.ts` | Dark/light theme with View Transitions API |
