import { createFileRoute } from "@tanstack/react-router";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Float, Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  component: MythologyPage,
});

/* ─────────────────────── 3D ─────────────────────── */

function AthleteFigure() {
  const { scene } = useGLTF("/new_model.glb");
  return <primitive object={scene} scale={2} position={[0, -1.4, 0]} />;
}

function ModelScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 38 }}
      style={{ background: "transparent" }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 6, 4]} intensity={2.2} color="#f5e6b8" castShadow />
      <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#a0b8d0" />
      <pointLight position={[0, -2, 2]} intensity={0.4} color="#c8905a" />
      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.4}>
          <AthleteFigure />
        </Float>
        <Environment preset="dawn" />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.7}
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.7}
      />
    </Canvas>
  );
}

/* ─────────────────────── Sections ─────────────────────── */

const DISCIPLINES = [
  {
    name: "Stadion",
    greek: "Στάδιον",
    desc: "The sprint — 192 metres of raw speed along the sacred track of Olympia. The oldest Olympic event, named for the stadium itself.",
  },
  {
    name: "Pankration",
    greek: "Παγκράτιον",
    desc: "All-power combat. A combination of wrestling and boxing with almost no rules — only biting and gouging forbidden. The ultimate test of a warrior.",
  },
  {
    name: "Discus",
    greek: "Δίσκος",
    desc: "The bronze disc hurled into the heavens. Myron's Discobolus immortalised the moment of perfect tension before release.",
  },
  {
    name: "Javelin",
    greek: "Ἄκων",
    desc: "Precision and power fused. Competitors wrapped a leather thong around the shaft to add spin and distance, mirroring the spear-throw of war.",
  },
  {
    name: "Chariot Race",
    greek: "Ἁρματοδρομία",
    desc: "Twelve treacherous laps of the hippodrome. The most dangerous event — owned by sponsors who rarely drove themselves.",
  },
  {
    name: "Pentathlon",
    greek: "Πένταθλον",
    desc: "Five disciplines: stadion, discus, javelin, long jump, wrestling. The complete athlete, admired as the highest physical ideal.",
  },
];

const MARQUEE_ITEMS = [
  "Stadion", "Pankration", "Diaulos", "Discus", "Javelin",
  "Long Jump", "Wrestling", "Boxing", "Pentathlon", "Chariot Race",
];

/* ─────────────────────── Components ─────────────────────── */

function Nav() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 grain-overlay"
      style={{
        background: "color-mix(in oklab, var(--color-parchment) 80%, transparent)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid color-mix(in oklab, var(--color-gold) 40%, transparent)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span className="text-xs uppercase tracking-[0.3em] text-oxblood" style={{ fontFamily: "var(--font-display)" }}>
          Mythology
        </span>
        <nav className="hidden gap-8 text-xs uppercase tracking-[0.2em] text-ink-soft md:flex">
          <a href="#about" className="transition-colors hover:text-oxblood">Origins</a>
          <a href="#disciplines" className="transition-colors hover:text-oxblood">Disciplines</a>
          <a href="#contact" className="transition-colors hover:text-oxblood">Contact</a>
        </nav>
        <div className="h-4 w-px" style={{ background: "var(--color-gold)" }} />
      </div>
    </header>
  );
}

function Marquee() {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      className="flex overflow-hidden border-y py-4"
      style={{ borderColor: "color-mix(in oklab, var(--color-gold) 35%, transparent)" }}
    >
      <div className="animate-marquee flex shrink-0 items-center gap-12 pr-12 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-12 text-xs uppercase tracking-[0.25em] text-ink-soft">
            {w}
            <span
              className="inline-block h-1 w-1 rounded-full"
              style={{ background: "var(--color-gold)" }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

function OrnamentRule() {
  return <div className="ornament-rule mx-auto my-12 w-48 opacity-60" />;
}

function DisciplineCard({
  item,
  index,
}: {
  item: (typeof DISCIPLINES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.from(el, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out",
      delay: (index % 3) * 0.1,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  }, [index]);

  return (
    <div
      ref={ref}
      className="liquid-glass rounded p-6 transition-shadow"
      style={{
        boxShadow: "0 2px 24px -8px color-mix(in oklab, var(--color-ink) 15%, transparent)",
      }}
    >
      <p className="mb-1 text-xs uppercase tracking-[0.3em] text-oxblood" style={{ fontFamily: "var(--font-display)" }}>
        {item.greek}
      </p>
      <h3 className="mb-3 text-xl" style={{ fontFamily: "var(--font-display)" }}>
        {item.name}
      </h3>
      <div className="gold-rule mb-4" />
      <p className="text-sm leading-relaxed text-ink-soft">{item.desc}</p>
    </div>
  );
}

/* ─────────────────────── Page ─────────────────────── */

function MythologyPage() {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  /* Lenis smooth scroll */
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  /* GSAP — about section parallax text reveal */
  useEffect(() => {
    const el = aboutRef.current;
    if (!el) return;
    gsap.from(el.querySelectorAll("[data-reveal]"), {
      opacity: 0,
      y: 50,
      stagger: 0.14,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 75%", once: true },
    });
  }, []);

  return (
    <div className="grain-overlay bg-parchment text-ink min-h-screen" style={{ fontFamily: "var(--font-serif)" }}>
      <Nav />

      {/* ── Hero ── */}
      <section className="relative flex min-h-screen flex-col md:flex-row" id="top">
        {/* Text side */}
        <div
          ref={heroTextRef}
          className="flex flex-1 flex-col justify-center px-8 pb-12 pt-28 md:px-16 md:py-0"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mb-4 text-xs uppercase tracking-[0.4em] text-oxblood"
            style={{ fontFamily: "var(--font-display)" }}
          >
            776 BC — Ancient Athletics
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-[13vw] font-light leading-[0.88] text-ink md:text-[7vw] lg:text-[6vw]"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
          >
            Mythology
          </motion.h1>

          <div className="gold-rule my-6 max-w-xs" />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.85 }}
            className="max-w-sm text-base leading-relaxed text-ink-soft"
          >
            Where gods and mortals competed for glory — and sport was an act of devotion. An
            interactive journey through the ancient world of the Olympic games.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-10 flex items-center gap-6"
          >
            <a
              href="#disciplines"
              className="rounded-none border border-oxblood px-6 py-2.5 text-xs uppercase tracking-[0.25em] text-oxblood transition-all hover:bg-oxblood hover:text-marble"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Explore
            </a>
            <a
              href="#about"
              className="text-xs uppercase tracking-[0.25em] text-ink-soft transition-colors hover:text-ink"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Learn more →
            </a>
          </motion.div>
        </div>

        {/* 3D Model side */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="relative flex-1"
          style={{ minHeight: "60vh" }}
        >
          {/* Parchment vignette on left edge */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32"
            style={{
              background: "linear-gradient(to right, var(--color-parchment), transparent)",
            }}
          />
          <ModelScene />
        </motion.div>
      </section>

      {/* ── Marquee ── */}
      <Marquee />

      {/* ── About ── */}
      <section id="about" ref={aboutRef} className="bg-ivory px-6 py-28 md:px-16">
        <div className="mx-auto max-w-4xl">
          <p data-reveal className="mb-6 text-xs uppercase tracking-[0.35em] text-gold" style={{ fontFamily: "var(--font-display)" }}>
            § Origins
          </p>
          <h2
            data-reveal
            className="text-4xl leading-snug md:text-6xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            Where mortal met divine
          </h2>
          <OrnamentRule />
          <div className="grid gap-10 md:grid-cols-2">
            <p data-reveal className="text-lg leading-relaxed text-ink-soft">
              The ancient Olympic Games began in Olympia, Greece, in 776 BC. Held every four years in
              honour of Zeus, they were not merely athletic contests — they were religious festivals,
              truces of war, and celebrations of the ideal human form.
            </p>
            <p data-reveal className="text-lg leading-relaxed text-ink-soft">
              Athletes trained for years in the palaestra, anointed their bodies with olive oil, and
              competed naked before tens of thousands. Victory brought not a trophy, but an olive
              wreath — and immortality through the songs of Pindar.
            </p>
          </div>

          <div
            data-reveal
            className="mt-16 grid grid-cols-3 gap-6 border-t pt-12 text-center"
            style={{ borderColor: "color-mix(in oklab, var(--color-gold) 40%, transparent)" }}
          >
            {[
              { n: "293", label: "Olympiads held" },
              { n: "1000+", label: "Years of tradition" },
              { n: "6", label: "Core disciplines" },
            ].map((s) => (
              <div key={s.n}>
                <p className="text-3xl text-oxblood md:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
                  {s.n}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-ink-soft">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Disciplines ── */}
      <section id="disciplines" className="bg-parchment px-6 py-28 md:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold" style={{ fontFamily: "var(--font-display)" }}>
                § The Games
              </p>
              <h2 className="text-3xl md:text-5xl" style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>
                Sacred Disciplines
              </h2>
            </div>
            <p className="hidden text-xs uppercase tracking-[0.2em] text-ink-soft md:block">
              006 / 006
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DISCIPLINES.map((item, i) => (
              <DisciplineCard key={item.name} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact / Footer ── */}
      <footer
        id="contact"
        className="relative px-6 py-24 md:px-16"
        style={{ background: "var(--color-oxblood)" }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold opacity-70" style={{ fontFamily: "var(--font-display)" }}>
            § Contact
          </p>
          <h2 className="mb-8 text-3xl font-light text-marble md:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
            Reach out
          </h2>
          <div className="gold-rule mx-auto mb-8 max-w-xs" />
          <a
            href="mailto:yokubjon_nurullaev@mail.ru"
            className="group inline-flex items-baseline gap-3 font-serif text-2xl text-marble transition-opacity hover:opacity-70 md:text-4xl"
          >
            yokubjon_nurullaev@mail.ru
            <span className="text-gold transition-transform group-hover:translate-x-2">→</span>
          </a>

          <div
            className="mt-16 border-t pt-8 text-xs uppercase tracking-[0.2em] text-marble opacity-40"
            style={{ borderColor: "color-mix(in oklab, var(--color-gold) 30%, transparent)" }}
          >
            © 2026 Yakubjon Nurullaev · Mythology
          </div>
        </div>
      </footer>
    </div>
  );
}
