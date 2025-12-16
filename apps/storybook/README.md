# Storybook

This is the Storybook instance for **web components** (`packages/ui-web`).

## Running Storybook

```bash
# From the monorepo root
pnpm web:storybook

# Or from this directory
pnpm storybook
```

Then open http://localhost:6006

## Architecture

This monorepo has two separate UI component systems:

### Web Components (this Storybook)

- **Location**: `packages/ui-web`
- **Framework**: React + Tailwind CSS v4 + Shadcn
- **Used by**: TanStack Start web app, future Electron app
- **Storybook**: `apps/storybook` (this app)

### Native Components

- **Location**: `apps/expo/components/ui`
- **Framework**: React Native + NativeWind v4 + React Native Reusables
- **Used by**: Expo app
- **Storybook**: Run `pnpm native:storybook` from monorepo root

## Adding Stories

Stories for `packages/ui-web` components should be co-located with the components:

```
packages/ui-web/src/components/ui/
├── button.tsx
├── button.stories.tsx  # ← Story file here
└── ...
```

## Tailwind CSS

This Storybook is configured with:

- Tailwind CSS v4 via `@tailwindcss/vite`
- Shared theme from `packages/ui-web/src/styles/theme.css` (single source of truth)
- `@source` directive scanning `packages/ui-web/src` for classes

The theme variables (Shadcn's OKLCH color system) are defined once in `packages/ui-web` and imported by both `apps/web` and `apps/storybook`.
