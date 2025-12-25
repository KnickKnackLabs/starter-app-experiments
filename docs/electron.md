# Electron Desktop App

This project uses [Electron Forge](https://www.electronforge.io/) with [Vite](https://vitejs.dev/) to build a cross-platform desktop application that shares code with the monorepo.

## Architecture

```
apps/desktop/
  forge.config.ts       # Electron Forge configuration
  forge.env.d.ts        # TypeScript declarations for Forge globals
  index.html            # HTML entry point for renderer
  package.json          # Desktop app dependencies
  tsconfig.json         # TypeScript config with path aliases
  vite.main.config.ts   # Vite config for main process
  vite.preload.config.ts # Vite config for preload scripts
  vite.renderer.config.ts # Vite config for renderer (React)
  src/
    main.ts             # Main process (Node.js, creates windows)
    preload.ts          # Preload script (bridge between main/renderer)
    renderer.tsx        # Renderer entry (React app)
    app.tsx             # Root React component
    i18n.ts             # i18next initialization
    index.css           # Tailwind CSS entry
    components/
      language-picker.tsx # Language switcher component
```

## Electron Process Model

Electron apps have three types of processes:

| Process | Environment | Purpose |
|---------|-------------|---------|
| **Main** | Node.js | Creates windows, handles system events, accesses native APIs |
| **Preload** | Isolated | Bridge between main and renderer, exposes safe APIs |
| **Renderer** | Chromium | Displays UI, runs React app |

### Main Process (`src/main.ts`)

```typescript
import { app, BrowserWindow } from "electron";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // In development, load from Vite dev server
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    // In production, load built files
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }
};

app.on("ready", createWindow);
```

### Renderer Process (`src/renderer.tsx`)

The renderer is a standard React application:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import "./i18n";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

## Monorepo Integration

### Workspace Dependencies

The desktop app imports shared packages using pnpm workspace protocol:

```json
{
  "dependencies": {
    "@starter/core": "workspace:*",
    "ui-web": "workspace:*"
  }
}
```

### Path Aliases

Path aliases are configured in `tsconfig.json` and resolved by `vite-tsconfig-paths`:

```json
{
  "paths": {
    "@core/*": ["../../packages/core/src/*"],
    "@ui/*": ["../../packages/ui-web/src/*"],
    "@/*": ["./src/*"]
  }
}
```

Usage in components:

```tsx
import { supportedLanguages } from "@starter/core/i18n";
import { Button } from "@ui/components/ui/button";
import { LanguagePicker } from "@/components/language-picker";
```

### Shared UI Components

The desktop app uses Shadcn components from `ui-web`:

```tsx
import { Button } from "@ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu";
```

## Styling

### Tailwind CSS v4

The renderer uses Tailwind CSS v4 with the shared theme from `ui-web`:

```css
/* src/index.css */
@import "tailwindcss";
@import "../../../packages/ui-web/src/styles/theme.css";

/* Include ui-web package for class scanning */
@source "../../../packages/ui-web/src";
```

The `@source` directive ensures Tailwind scans the ui-web package for class names.

### Vite Configuration

Tailwind is enabled via the `@tailwindcss/vite` plugin:

```typescript
// vite.renderer.config.ts
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
});
```

## Internationalization

The desktop app uses the same i18n setup as web and native apps:

```typescript
// src/i18n.ts
import {
  defaultLanguage,
  resources,
  supportedLanguages,
} from "@starter/core/i18n";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: defaultLanguage,
  supportedLngs: [...supportedLanguages],
});
```

Use translations in components:

```tsx
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();
  return <h1>{t("common.appName")}</h1>;
}
```

## Development

### Running the App

```sh
pnpm desktop
```

This starts Electron Forge with Vite's dev server, providing hot module replacement for the renderer.

### DevTools

DevTools open automatically in development. You can also toggle with:
- macOS: `Cmd + Option + I`
- Windows/Linux: `Ctrl + Shift + I`

## Building & Distribution

### Package for Current Platform

```sh
pnpm desktop:package
```

Creates an unpackaged app in `apps/desktop/out/`.

### Create Distributables

```sh
pnpm desktop:make
```

Creates platform-specific installers:
- **macOS**: `.zip` (via `MakerZIP`)
- **Windows**: Squirrel installer (via `MakerSquirrel`)
- **Linux**: `.deb` and `.rpm` packages

### Forge Configuration

Makers and plugins are configured in `forge.config.ts`:

```typescript
const config: ForgeConfig = {
  packagerConfig: {
    asar: true,  // Bundle app into asar archive
  },
  makers: [
    new MakerSquirrel({}),     // Windows
    new MakerZIP({}, ["darwin"]), // macOS
    new MakerRpm({}),          // Linux RPM
    new MakerDeb({}),          // Linux DEB
  ],
  plugins: [
    new VitePlugin({ /* ... */ }),
    new FusesPlugin({ /* ... */ }),
  ],
};
```

### Security Fuses

The app uses Electron Fuses for security hardening:

```typescript
new FusesPlugin({
  version: FuseVersion.V1,
  [FuseV1Options.RunAsNode]: false,
  [FuseV1Options.EnableCookieEncryption]: true,
  [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
  [FuseV1Options.EnableNodeCliInspectArguments]: false,
  [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
  [FuseV1Options.OnlyLoadAppFromAsar]: true,
}),
```

## Adding Features

### IPC Communication

To communicate between main and renderer processes, use Electron's IPC:

**Preload script** (`src/preload.ts`):
```typescript
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  sendMessage: (message: string) => ipcRenderer.send("message", message),
  onReply: (callback: (reply: string) => void) =>
    ipcRenderer.on("reply", (_, reply) => callback(reply)),
});
```

**Main process** (`src/main.ts`):
```typescript
import { ipcMain } from "electron";

ipcMain.on("message", (event, message) => {
  console.log("Received:", message);
  event.reply("reply", "Got it!");
});
```

**Renderer** (add types first):
```typescript
declare global {
  interface Window {
    electronAPI: {
      sendMessage: (message: string) => void;
      onReply: (callback: (reply: string) => void) => void;
    };
  }
}

window.electronAPI.sendMessage("Hello from renderer!");
```

### Native Menus

Add application menus in the main process:

```typescript
import { Menu } from "electron";

const template = [
  {
    label: "File",
    submenu: [{ role: "quit" }],
  },
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
    ],
  },
];

Menu.setApplicationMenu(Menu.buildFromTemplate(template));
```

### System Tray

Add a system tray icon:

```typescript
import { Tray, nativeImage } from "electron";

let tray: Tray;

app.on("ready", () => {
  const icon = nativeImage.createFromPath("path/to/icon.png");
  tray = new Tray(icon);
  tray.setToolTip("Starter Desktop");
});
```

## Troubleshooting

### Module Resolution Errors

If you see errors about missing modules from shared packages:

1. Ensure `vite-tsconfig-paths` is in `vite.renderer.config.ts`
2. Check path aliases match between `tsconfig.json` and actual package locations
3. Run `pnpm install` to ensure workspace links are set up

### Tailwind Classes Not Working

If Tailwind classes from ui-web aren't being applied:

1. Verify `@source` directive in `index.css` points to the correct path
2. Check that `@tailwindcss/vite` plugin is in renderer config
3. Ensure theme.css is imported before component styles

### TypeScript Errors for Forge Globals

If TypeScript complains about `MAIN_WINDOW_VITE_DEV_SERVER_URL`:

The `forge.env.d.ts` file should declare these:

```typescript
declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;
```

Ensure it's included in `tsconfig.json`:

```json
{
  "include": ["src", "forge.env.d.ts"]
}
```

### CommonJS vs ESM

The main process uses CommonJS (required by Electron). The renderer uses ESM via Vite. Don't try to use ESM in the main process—Electron Forge's Vite plugin handles the build correctly with CommonJS.

## References

- [Electron Forge Documentation](https://www.electronforge.io/)
- [Electron Forge Vite Plugin](https://www.electronforge.io/config/plugins/vite)
- [Electron Documentation](https://www.electronjs.org/docs)
- [Vite Documentation](https://vitejs.dev/)
