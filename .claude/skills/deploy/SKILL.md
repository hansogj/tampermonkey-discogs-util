---
name: deploy
description: Run a production build and deploy to OpenUserJS via GitHub sync
disable-model-invocation: true
allowed-tools: Bash(pnpm *) Bash(node *) Bash(git *) Read Edit
---

Production build and deploy to OpenUserJS. OpenUserJS syncs from the main branch on GitHub,
so deploying means: build, commit, and push.

## Steps

1. **Pre-flight checks** — run in parallel:

   - `pnpm run typecheck`
   - `pnpm test`
   - `pnpm run check` (prettier + eslint)
   - Verify the working tree is clean (no uncommitted changes unrelated to the build). If there are uncommitted changes, stop and ask the user before proceeding.

2. **Production build**:

   - Run `pnpm run build` (this bumps the minor version, runs vite build, and prepends the Tampermonkey banner)
   - Verify `dist/discogs-util.user.js` was generated and the banner contains the new version

3. **Commit and push**:

   - Stage `package.json` and `dist/discogs-util.user.js`
   - Commit with message: `chore(release): deploy v<new-version> to OpenUserJS`
   - Push to `main`

4. **Verify**: Print the new version and the OpenUserJS URL:
   `https://openuserjs.org/scripts/hog/discogs-util/source`

## Important

- Do NOT use `NAME_SUFFIX` — this is a production build, not a dev build.
- The build script bumps minor version automatically (minor++ for production builds).
- If any pre-flight check fails, stop and report the error. Do not proceed with the build.
