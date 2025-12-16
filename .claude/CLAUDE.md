# Starter

A monorepo template for building cross-platform apps with shared tooling.

## Tech Stack

| App | Framework | Styling | Components |
|-----|-----------|---------|------------|
| `apps/web` | TanStack Start (Vite) | Tailwind CSS v4 | Shadcn |
| `apps/expo` | Expo Router | NativeWind v4 | React Native Reusables |
| `apps/storybook` | Storybook + Vite | Tailwind CSS v4 | — |

## Structure

```
apps/
  expo/              # React Native app (Expo Router)
    app/             # File-based routes
    components/ui/   # RNR components (Button, Text, etc.)
  web/               # Web app (TanStack Start)
    src/app/         # File-based routes
  storybook/         # Web component Storybook

packages/
  core/              # Shared types, schemas (@starter/core)
  ui-web/            # Web components (@starter/ui-web)
    src/components/ui/  # Shadcn components
    src/styles/theme.css  # Shared OKLCH theme
```

## Commands

```sh
pnpm web              # TanStack Start dev (http://localhost:3000)
pnpm web:storybook    # Web Storybook (http://localhost:6006)
pnpm native           # Expo dev server
pnpm native:storybook # Native Storybook (on-device)
pnpm fix              # Biome lint/format
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

- **Web**: Standalone app at `apps/storybook`. Run with `pnpm web:storybook`.
- **Native**: Integrated into Expo app. Run with `pnpm native:storybook` (sets `EXPO_PUBLIC_STORYBOOK_ENABLED=true`). Access via `/storybook` route (dev only, protected by `Stack.Protected`).

## Adding Components

**Web**: Use Shadcn CLI or manually add to `packages/ui-web/src/components/ui/`

**Native**: Use RNR CLI (`npx @react-native-reusables/cli@latest add <component>`) or manually add to `apps/expo/components/ui/`

---

# Ultracite Code Standards

This project uses **Ultracite**, a zero-config Biome preset that enforces strict code quality standards through automated formatting and linting.

## Quick Reference

- **Format code**: `pnpm fix` (or `npx biome check --write .`)
- **Check for issues**: `npx biome check .`

Biome provides extremely fast Rust-based linting and formatting. Most issues are automatically fixable.

---

## Core Principles

Write code that is **accessible, performant, type-safe, and maintainable**. Focus on clarity and explicit intent over brevity.

### Type Safety & Explicitness

- Use explicit types for function parameters and return values when they enhance clarity
- Prefer `unknown` over `any` when the type is genuinely unknown
- Use const assertions (`as const`) for immutable values and literal types
- Leverage TypeScript's type narrowing instead of type assertions
- Use meaningful variable names instead of magic numbers - extract constants with descriptive names

### Modern JavaScript/TypeScript

- Use arrow functions for callbacks and short functions
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer property access
- Prefer template literals over string concatenation
- Use destructuring for object and array assignments
- Use `const` by default, `let` only when reassignment is needed, never `var`

### Async & Promises

- Always `await` promises in async functions - don't forget to use the return value
- Use `async/await` syntax instead of promise chains for better readability
- Handle errors appropriately in async code with try-catch blocks
- Don't use async functions as Promise executors

### React & JSX

- Use function components over class components
- Call hooks at the top level only, never conditionally
- Specify all dependencies in hook dependency arrays correctly
- Use the `key` prop for elements in iterables (prefer unique IDs over array indices)
- Nest children between opening and closing tags instead of passing as props
- Don't define components inside other components
- Use semantic HTML and ARIA attributes for accessibility

### Error Handling & Debugging

- Remove `console.log`, `debugger`, and `alert` statements from production code
- Throw `Error` objects with descriptive messages, not strings or other values
- Prefer early returns over nested conditionals for error cases

### Code Organization

- Keep functions focused and under reasonable cognitive complexity limits
- Extract complex conditions into well-named boolean variables
- Use early returns to reduce nesting
- Prefer simple conditionals over nested ternary operators

### Security

- Add `rel="noopener"` when using `target="_blank"` on links
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Don't use `eval()` or assign directly to `document.cookie`
- Validate and sanitize user input

### Performance

- Avoid spread syntax in accumulators within loops
- Use top-level regex literals instead of creating them in loops
- Prefer specific imports over namespace imports

---

## Testing

- Write assertions inside `it()` or `test()` blocks
- Avoid done callbacks in async tests - use async/await instead
- Don't use `.only` or `.skip` in committed code

---

Most formatting and common issues are automatically fixed by Biome. Run `pnpm fix` before committing.
