# Starter

A monorepo starter with:

- **Web**: TanStack Start + Tailwind CSS v4
- **Mobile**: Expo + NativeWind + React Native Reusables
- **Storybook**: Component development for web and native

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

### Linting

```sh
pnpm fix        # Run Biome linter/formatter
```

## Structure

```
apps/
  expo/         # React Native app (Expo Router)
  web/          # Web app (TanStack Start)
  storybook/    # Storybook for web components

packages/
  core/         # Shared types and schemas
  ui-web/       # Shared web components (Shadcn/Tailwind)
```
