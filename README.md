# Starter

A monorepo starter with:

- **Web**: TanStack Start + Tailwind CSS v4
- **Mobile**: Expo + NativeWind + React Native Reusables
- **Storybook**: Component development for web and native
- **i18n**: Full internationalization with 5 languages and RTL support

## Getting Started

```sh
pnpm install
```

### Development

```sh
pnpm web              # TanStack Start dev server (http://localhost:3000)
pnpm web:storybook    # Web Storybook (http://localhost:6006)
pnpm native           # Expo dev server
pnpm native:storybook # Native Storybook (on-device)
```

### Code Quality

```sh
pnpm lint             # Check for lint/format issues
pnpm lint:fix         # Auto-fix lint/format issues
pnpm typecheck        # TypeScript type checking
pnpm check            # Run all checks (lint + typecheck)
```

## Structure

```
apps/
  expo/         # React Native app (Expo Router)
  web/          # Web app (TanStack Start)
  storybook/    # Storybook for web components

packages/
  core/         # Shared types, schemas, and i18n
  ui-web/       # Shared web components (Shadcn/Tailwind)
```

## Documentation

- [Internationalization (i18n)](docs/i18n.md) - Adding translations, RTL support, and localization
