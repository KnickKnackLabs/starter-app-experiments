# Experiment: static-cloudflare-site

Strip the starter-app monorepo to web-only and deploy as a statically-prerendered site to Cloudflare Pages.

## What This Proves

- TanStack Start can do full static prerendering (`crawlLinks: true`)
- Stripping mobile (Expo) and desktop (Electron) apps from the monorepo works cleanly
- The result deploys to Cloudflare Pages via `wrangler pages deploy`
- Merges `tooling/cloudflare` for reusable Cloudflare tasks (API, deploy, token management, project management)

## What Changed from Starter

- Removed `apps/expo/` and `apps/desktop/`
- Root `tsconfig.json` — standalone config (no longer extends expo)
- `apps/web/vite.config.ts` — added `prerender: { enabled: true, crawlLinks: true, autoSubfolderIndex: true }`
- `apps/web/wrangler.toml` — Cloudflare Pages config (`pages_build_output_dir = "dist/client"`)
- `package.json` — web-only scripts
- `.gitignore` — added `dist/`

## Usage

```sh
pnpm install
pnpm build          # Builds + prerenders all pages
mise run cloudflare:deploy -- --build   # Build and deploy to Cloudflare Pages
```

## Tooling (from `tooling/cloudflare`)

```sh
mise run cloudflare:project:create <name>   # Create a Pages project
mise run cloudflare:project:list            # List Pages projects
mise run cloudflare:deploy -- --build       # Build and deploy
mise run cloudflare:token:create <name> --scopes 'Pages Write' --ttl 90
```

---

*This is an experiment branch of [starter-app-experiments](https://github.com/KnickKnackLabs/starter-app-experiments). See `experiment.json` for metadata.*
