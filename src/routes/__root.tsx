import { Outlet, Link, createRootRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

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
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded bg-amber-700 px-4 py-2 text-sm text-amber-100 transition-colors hover:bg-amber-600"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded border border-stone-700 px-4 py-2 text-sm text-stone-300 transition-colors hover:border-stone-500"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});
