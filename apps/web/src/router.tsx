import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="font-bold text-4xl">404</h1>
      <p className="text-muted-foreground">Page not found</p>
    </div>
  );
}

export function getRouter() {
  return createRouter({
    routeTree,
    scrollRestoration: true,
    defaultNotFoundComponent: NotFound,
  });
}

declare module "@tanstack/react-router" {
  // biome-ignore lint/style/useConsistentTypeDefinitions: Declaration merging requires interface
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
