# Progalert

A monorepo starter with:

- **Web**: TanStack Start + Tailwind CSS v4
- **Mobile**: Expo + NativeWind + React Native Reusables
- **Storybook**: Component development for web

## Getting Started

```sh
pnpm install
```

### Development

```sh
pnpm web        # TanStack Start dev server (http://localhost:3000)
pnpm native     # Expo dev server
pnpm storybook  # Storybook (http://localhost:6006)
```

### Linting

```sh
pnpm fix        # Run Biome linter/formatter
```

## Structure

```
apps/
  expo/         # React Native app (Expo)
  web/          # Web app (TanStack Start)
  storybook/    # Storybook for web components

packages/
  ui-web/       # Shared web components (Shadcn/Tailwind)
```
