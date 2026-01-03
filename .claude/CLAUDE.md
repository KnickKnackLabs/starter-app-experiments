# Starter

A monorepo template for building cross-platform apps with shared tooling.

## Tech Stack

| App | Framework | Styling | Components |
|-----|-----------|---------|------------|
| `apps/web` | TanStack Start (Vite) | Tailwind CSS v4 | Shadcn |
| `apps/expo` | Expo Router | NativeWind v4 | React Native Reusables |
| `apps/desktop` | Electron Forge (Vite) | Tailwind CSS v4 | Shadcn |

## Structure

```
apps/
  desktop/           # Electron desktop app (Electron Forge + Vite)
    src/             # Main, preload, and renderer processes
  expo/              # React Native app (Expo Router)
    app/             # File-based routes
    components/ui/   # RNR components (Button, Text, etc.)
  web/               # Web app (TanStack Start)
    src/app/         # File-based routes

packages/
  core/              # Shared types, schemas, i18n (@starter/core)
  ui-web/            # Web components (@starter/ui-web)
    src/components/ui/  # Shadcn components
    src/styles/theme.css  # Shared OKLCH theme
```

## Package Dependencies

```
@starter/core ─────► @starter/ui-web ─────► apps/web
      │                    │                apps/desktop
      │                    └──────────────►
      │
      └──────────────────────────────────► apps/expo
```

- **`@starter/core`**: Foundation package with no app dependencies. Add shared types, Zod schemas, utilities, and i18n here.
- **`@starter/ui-web`**: Web component library depending on core. Used by both web and desktop apps.
- **Apps**: Import from packages but never from each other.

## Commands

```sh
pnpm web              # TanStack Start dev (http://localhost:3000)
pnpm web:storybook    # Web Storybook (http://localhost:6006)
pnpm native           # Expo dev server (requires dev build first)
pnpm native:ios       # Build and install iOS dev client
pnpm native:android   # Build and install Android dev client
pnpm native:storybook # Native Storybook (on-device)
pnpm desktop          # Electron desktop app
pnpm desktop:storybook # Desktop Storybook (http://localhost:6007)
pnpm desktop:package  # Package desktop app for current platform
pnpm desktop:make     # Build distributable installers
pnpm lint             # Check for lint/format issues
pnpm lint:fix         # Auto-fix lint/format issues
pnpm typecheck        # TypeScript type checking
pnpm check            # Run all checks (lint + typecheck)
```

## Path Aliases

| Alias | Resolves to |
|-------|-------------|
| `@/*` | App-local (e.g., `./src/*` or `./*`) |
| `@core/*` | `packages/core/src/*` |
| `@ui/*` | `packages/ui-web/src/*` (web only) |

## Component Systems

**Web (Shadcn)**: Components in `packages/ui-web/src/components/ui/`. Stories co-located.

**Native (React Native Reusables)**: Components in `apps/expo/components/ui/`. Stories co-located. Uses `components.json` for RNR CLI.

Both use semantic color tokens (primary, secondary, muted, etc.) via CSS variables. Web uses OKLCH in `theme.css`, native uses HSL in `ThemeProvider`.

## Storybook

- **Web**: Integrated into web app at `apps/web/.storybook`. Run with `pnpm web:storybook`.
- **Desktop**: Integrated into desktop app at `apps/desktop/.storybook`. Run with `pnpm desktop:storybook`.
- **Native**: Integrated into Expo app at `apps/expo/.rnstorybook`. Run with `pnpm native:storybook` (sets `EXPO_PUBLIC_STORYBOOK_ENABLED=true`). Access via `/storybook` route (dev only, protected by `Stack.Protected`).

## Adding Components

**Web/Desktop**: Use Shadcn CLI or manually add to `packages/ui-web/src/components/ui/`. Both apps share these components.

**Native**: Use RNR CLI (`npx @react-native-reusables/cli@latest add <component>`) or manually add to `apps/expo/components/ui/`

## Internationalization (i18n)

Full documentation: [`docs/i18n.md`](../docs/i18n.md)

**Key points:**

- Translations live in `packages/core/locales/*.ts` (TypeScript, fully typed)
- Supported languages: English, Spanish, Hebrew (RTL), Arabic (RTL), Russian
- Use `useTranslation()` hook from `react-i18next` in components
- For RTL on native, the app uses `I18nManager.forceRTL()` with a reload prompt
- Use `isRtl(i18n.language)` from `@starter/core/i18n` for conditional styling

**Adding a new string:**

1. Add to `packages/core/locales/en.ts` (source of truth)
2. Add to all other locale files (`es.ts`, `he.ts`, `ar.ts`, `ru.ts`)
3. Use in components: `t("myFeature.title")`

**Storybook:** Both web and native Storybooks have language pickers for testing translations and RTL layouts.

---

## Code Standards (Ultracite)

This project uses **Ultracite**, a zero-config Biome preset for linting and formatting.

```sh
pnpm lint             # Check for issues
pnpm lint:fix         # Auto-fix issues
pnpm check            # Run all checks (lint + typecheck)
```

**Key principles:**
- Prefer `unknown` over `any`, use `as const` for literals
- Use `for...of` over `.forEach()`, `async/await` over promise chains
- Function components only, hooks at top level, correct dependency arrays
- Early returns over nested conditionals
- No `console.log`/`debugger` in production

Most issues are auto-fixable. Run `pnpm lint:fix` before committing.
