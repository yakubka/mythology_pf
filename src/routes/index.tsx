import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-100" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-amber-600" style={{ fontFamily: "'Cinzel', serif" }}>
          Ancient Athletics
        </p>
        <h1
          className="text-5xl font-light leading-tight text-stone-100 md:text-7xl lg:text-8xl"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Mythology
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-stone-400">
          An interactive journey through the ancient world — where gods and mortals
          competed for glory, and sport was an act of devotion.
        </p>
      </div>
    </main>
  );
}
