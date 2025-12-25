# Starter

A monorepo starter with:

- **Web**: TanStack Start + Tailwind CSS v4
- **Mobile**: Expo + NativeWind + React Native Reusables
- **Desktop**: Electron + Electron Forge + Vite
- **Storybook**: Component development for web, native, and desktop
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
pnpm desktop          # Electron desktop app
pnpm desktop:storybook # Desktop Storybook (http://localhost:6007)
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
  desktop/      # Electron desktop app (Electron Forge + Vite)
  expo/         # React Native app (Expo Router)
  web/          # Web app (TanStack Start)

packages/
  core/         # Shared types, schemas, and i18n
  ui-web/       # Shared web components (Shadcn/Tailwind)
```

## Documentation

- [Electron Desktop App](docs/electron.md) - Adding Electron to a pnpm monorepo
- [Internationalization (i18n)](docs/i18n.md) - Adding translations, RTL support, and localization
