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

Pages are React components under `src/pages/`. Project copy lives in `data/projects.ts`. Home presence is `data/now-status.ts`.

### Routing

Routes in `src/routes.tsx` are static. Home (`/`) is a centered calling card without the inner nav. Quiet `/mitori/privacy` is kept for App Store. `/now` redirects home.

### Key Files

| File | Purpose |
|------|---------|
| `src/main.tsx` | Client entry point |
| `src/main.ssg.tsx` | SSG entry with `render()` export |
| `src/routes.tsx` | Route definitions |
| `data/projects.ts` | Project index |
| `src/components/constellation/` | Home / projects star map |
| `src/theme/ThemeManager.ts` | Dark/light theme with View Transitions API |
