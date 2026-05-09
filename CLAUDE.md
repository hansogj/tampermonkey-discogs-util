# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tampermonkey userscript that injects a fixed React side panel (top-right) into all `discogs.com/*` pages. Requires a Discogs Personal Access Token to use API features. Built as a single IIFE file.

**Features by page:**

| Page                 | Feature                                                          |
| -------------------- | ---------------------------------------------------------------- |
| `/user/*/collection` | Bulk-apply custom dropdown fields and move items between folders |
| `/release/*`         | Edit a single release's custom fields and folder                 |
| `/artist/*`          | Filter page to show only your collection items                   |
| `/mywantlist`        | Highlight duplicate releases (same artist + title)               |
| **Everywhere**       | Highlight record label names with quality-tier colors            |

**Label highlighting** is the always-on feature — a `MutationObserver` watches the DOM and colors label names based on quality tiers: poor (dark red), fair (tomato), good (light green), very good (forest green). Defaults defined in `src/constants.ts`, user overrides stored via `GM_setValue`.

**Bulk editing** hits Discogs's internal GraphQL endpoint with a persisted query hash (reverse-engineered from network traffic), applying field changes one item/field at a time with 200ms delays to avoid rate limiting.

**Dashboard** (gear icon in panel header) lets users customize which labels appear in each quality tier.

## Commands

```bash
pnpm install          # Install dependencies (uses pnpm)
pnpm run build        # Vite build + prepend Tampermonkey banner → dist/discogs-util.user.js
pnpm run typecheck    # TypeScript type checking only
pnpm test             # Run Vitest tests (jsdom environment)
pnpm run check        # Prettier + ESLint check (also runs in pre-commit hook)
pnpm run format       # Auto-fix formatting and lint issues
```

Pre-commit hook (`.husky/pre-commit`) runs `npm run check` and `pnpm test`.

## Architecture

**Entry point:** `src/main.tsx` creates a `#discogs-helper-root` div and mounts the React app.

**Routing by URL** (`src/components/Panel.tsx`): The panel renders different components based on the current Discogs page pathname:

- `/user/*/collection` → `CollectionPanel` (bulk edit custom dropdown fields, move folders)
- `/release/*` → `ReleasePanel` (edit single release fields/folder)
- `/artist/*` → `ArtistPanel` (filter to show only collection items)
- `/mywantlist` → `WantlistPanel` (highlight duplicate releases)

**API layer** (`src/api.ts`): Uses Tampermonkey's `GM_xmlhttpRequest` for authenticated Discogs API calls. Bulk edits go through Discogs's internal GraphQL endpoint with a persisted query hash and 200ms delays between mutations to avoid rate limiting.

**Label Highlighting** (`src/components/LabelHighlighter.tsx`): Uses `MutationObserver` on `document.body` to continuously highlight record labels by quality tier (colors defined in `src/constants.ts`). Custom label overrides stored via `GM_setValue`.

**State management:** React Query (`@tanstack/react-query`) for API data; Tampermonkey storage (`GM_getValue`/`GM_setValue`) for persistence (API token, panel state, selections, custom labels).

**Build output:** Vite bundles to IIFE format, then `scripts/prepend-banner.js` adds the Tampermonkey metadata header with version from `package.json`.

## Key Conventions

- React 19 with function components and hooks (no class components)
- TypeScript strict mode with interfaces in `src/types.ts`
- Prettier: single quotes, semicolons, trailing commas, 100 char width
- Tests colocated with source: `*.test.ts` / `*.test.tsx` alongside their modules
- All DOM manipulation for Discogs page interaction is in `src/ui.ts`
- Storage keys prefixed with `dhp_` (defined in `src/constants.ts`)
