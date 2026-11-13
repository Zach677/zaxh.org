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
pnpm test             # Unit tests (node --test)
pnpm typecheck        # App and Worker types
pnpm lint             # Run ESLint
pnpm preview          # Build, then serve it with the Worker (wrangler dev)
pnpm deploy           # Build, then deploy to Cloudflare
```

## Architecture

### Build System

Two-phase build process:
1. **Client build**: Standard Vite build → `dist/`
2. **SSG build**: Compiles `src/main.ssg.tsx` → runs `scripts/ssg.ts`, which writes every page

Only the book at `/` runs React. The build prerenders it, and `src/main.tsx` hydrates it, so the first client render must equal the prerendered open book (`PRERENDERED` in `src/components/book/turn.ts`). The inline script in `index.html` sets the theme and `html[data-book="closed"]` before the first paint; the book then closes or goes to a section in a layout effect.

The app pages and the 404 are plain HTML with no script. `scripts/ssg.ts` fails the build if a stable URL is missing, if a page does not have exactly one h1, or if a plain page keeps the module script. The app pages do not exist under `pnpm dev`; use `pnpm preview`.

Fonts are self-hosted Latin subsets (`src/styles/fonts.css`). The app pages use system fonts and download no font file.

### Hosting

One Cloudflare Worker (`worker/index.ts`, `wrangler.jsonc`) serves `dist/` as static assets and answers `/api/*`. It redirects www to the apex.

- `/api/desk`: YohakuCompanion POSTs here through its MixSpace HTTP Bridge (key in the body, checked against the `PRESENCE_KEY` secret). The `DeskRoom` Durable Object keeps the last report and pushes it to pages over a WebSocket.
- `/api/ledger`: the tokens.ci profile, reduced and cached at the edge for 5 minutes.

`src/live/desk.ts` holds the rules both sides share: what of a report is public, when the desk counts as away, and how the ledger is read. Local secrets go in `.dev.vars`. `pnpm typecheck` regenerates the Worker types from `wrangler.jsonc`.

### Content

The home page is a small book. The frontispiece ends with live notes (`src/components/LiveNotes.tsx`): where Zach is now, and the token ledger. The paper band on the cover shows the same two; `LiveProvider` opens one socket and makes one ledger request for both. `src/components/book/Book.tsx` owns the cover, the turning leaves, and the narrow-screen fallback; `src/pages/index.tsx` lists the pages in reading order (frontispiece, contents, about, appendix). Contents continues onto more pages as projects grow (`ENTRIES_PER_PAGE`), and a blank page keeps the spreads paired. Page sizes are em of a base that scales with the book, so a page holds the same content at every viewport. Project copy lives in `data/projects.ts`.

The book's state (open, spread, the leaf in motion) is one reducer in `src/components/book/turn.ts`. The cover waits for the reader once per session (`sessionStorage`). `/#work` and `/#about` open the book at contents or about.

App pages live beside the book: `/mitori/privacy`, `/xiaorichang/privacy`, `/sooner/privacy`, and `/sooner/support`. The App Store and the apps link to these URLs, so keep them stable. Each page is one Markdown file in `content/`: the file path is the URL, and the front matter gives `title`, `description`, and `lang`. The `.reader` class in `src/styles/components.css` styles them. The Sooner pages have tests in `content/sooner/` that pin the facts they state.

### Key Files

| File | Purpose |
|------|---------|
| `src/main.tsx` | Client entry point (hydrates the book) |
| `src/main.ssg.tsx` | SSG entry with `render()` export |
| `scripts/ssg.ts` | Writes the book, the app pages, and the 404 |
| `content/` | App pages in Markdown |
| `public/_headers` | Security and cache headers |
| `data/projects.ts` | Project index |
| `src/theme/ThemeManager.ts` | Dark/light theme with View Transitions API |
