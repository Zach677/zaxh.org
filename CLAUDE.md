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

The site is one page (`src/pages/index.tsx`) with work and about sections, plus `/mitori/privacy`. Project copy lives in `data/projects.ts`.

### Routing

Routes in `src/routes.tsx` are static. Every page shares one layout: nav, a centered column, and the footer. The nav links are home-page anchors (`/#work`, `/#about`). Quiet `/mitori/privacy` is kept for App Store.

### Key Files

| File | Purpose |
|------|---------|
| `src/main.tsx` | Client entry point |
| `src/main.ssg.tsx` | SSG entry with `render()` export |
| `src/routes.tsx` | Route definitions |
| `data/projects.ts` | Project index |
| `src/theme/ThemeManager.ts` | Dark/light theme with View Transitions API |
