import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-950 px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl text-amber-200">404</h1>
        <p className="mt-4 text-stone-400">This myth does not exist.</p>
        <div className="mt-6">
          <Link to="/" className="text-amber-400 hover:text-amber-200 transition-colors">
            Return home →
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.error("[app:error]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-950 px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-xl text-stone-200">Something broke.</h1>
        <p className="mt-2 text-sm text-stone-500">Try refreshing or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="px-4 py-2 text-sm bg-amber-700 text-amber-100 rounded hover:bg-amber-600 transition-colors"
          >
            Try again
          </button>
          <a href="/" className="px-4 py-2 text-sm border border-stone-700 text-stone-300 rounded hover:border-stone-500 transition-colors">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mythology — Ancient Athletics" },
      { name: "description", content: "An interactive journey through ancient athletic traditions and mythology." },
      { property: "og:title", content: "Mythology — Ancient Athletics" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
