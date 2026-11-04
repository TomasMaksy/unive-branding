import Link from "next/link";
import { HeroArt } from "@/components/brand/hero-art";
import { AppIcon, Mark, Wordmark } from "@/components/brand/logo";
import { UnLoader } from "@/components/brand/un-loader";
import { Section } from "@/components/book/section";
import { Button } from "@/components/ui/button";

const PRINCIPLES = [
  {
    title: "Drawn by hand",
    body: "The logo is ink on paper, not a font. Keep its wobble. Never retype it, trace it or tidy it.",
  },
  {
    title: "Warm, never loud",
    body: "Paper, ink and the earth tones of the hero's meadow. One accent at a time; sky blue is only for links and focus.",
  },
  {
    title: "Unhurried",
    body: "Things arrive like the hero does: fast start, long soft landing. Nothing bounces, nothing hops.",
  },
];

const INDEX = [
  { href: "/logo", title: "Logo", note: "Wordmark, the “un” icon, app icons, favicon, rules." },
  { href: "/motion", title: "Motion", note: "The flowing “un” loader, progress, Remotion stings, easing." },
  { href: "/color", title: "Colour", note: "Paper, ink, earth, meadow and the four states." },
  { href: "/type", title: "Type", note: "Averia Serif Libre for voice, Inter for interface." },
  { href: "/gradients", title: "Gradients & imagery", note: "The meadow dusk and every wash built on it." },
  { href: "/components", title: "Components", note: "Buttons, fields, cards, alerts, dialogs and more." },
] as const;

function IndexVisual({ href }: { href: (typeof INDEX)[number]["href"] }) {
  switch (href) {
    case "/logo":
      return <Mark title="" className="w-24 text-ink" />;
    case "/motion":
      return <UnLoader size={56} className="text-ink" />;
    case "/color":
      return (
        <div className="flex -space-x-3">
          {["bg-paper", "bg-sand", "bg-clay", "bg-meadow", "bg-loam", "bg-dusk", "bg-ink"].map((c) => (
            <span key={c} className={`size-11 rounded-full ring-2 ring-white ${c}`} />
          ))}
        </div>
      );
    case "/type":
      return (
        <span className="font-heading font-light text-7xl text-ink tracking-[-0.05em]">
          Aa<span className="font-sans font-normal text-4xl text-pebble tracking-normal"> Aa</span>
        </span>
      );
    case "/gradients":
      return <span className="h-20 w-40 rounded-2xl" style={{ backgroundImage: "var(--gradient-meadow-dusk)" }} />;
    case "/components":
      return (
        <div className="flex items-center gap-2">
          <Button variant="brand" tabIndex={-1}>
            Continue
          </Button>
          <Button variant="brand-outline" tabIndex={-1}>
            Later
          </Button>
        </div>
      );
  }
}

export default function Overview() {
  return (
    <>
      <section className="relative flex min-h-[calc(100dvh-4rem)] flex-col">
        <div className="relative z-30 mx-auto flex w-full max-w-4xl flex-col items-center px-6 pt-14 text-center md:pt-20">
          <span className="enter-pill inline-flex items-center gap-2 rounded-full border border-border bg-white py-1.5 pr-3 pl-1.5 text-graphite text-xs shadow-warm-xs" data-enter="">
            <AppIcon className="size-6" title="" />
            Brand book · v1 · 2026
          </span>
          <h1 className="enter-title mt-8 w-full" data-enter="">
            <Wordmark className="mx-auto w-[min(68vw,460px)] text-ink" />
          </h1>
          <p className="enter-subtitle mt-8 max-w-xl text-balance font-heading font-light text-graphite text-xl leading-relaxed md:text-2xl" data-enter="">
            Hand-drawn, warm and unhurried, like a good mentor’s notes in the margin.
          </p>
          <div className="enter-cta mt-8 flex flex-wrap items-center justify-center gap-3" data-enter="">
            <Button variant="brand" className="h-12 px-7 text-base sm:h-12 sm:text-base" render={<Link href="/logo" />}>
              Get the logo
            </Button>
            <Button variant="brand-outline" className="h-12 px-7 text-base sm:h-12 sm:text-base" render={<Link href="/landing" />}>
              See it on the landing page
            </Button>
          </div>
        </div>
        <HeroArt priority className="mt-auto h-[46vh] min-h-[16rem] md:h-[52vh]" />
      </section>

      <Section title="Principles" description="Three ideas hold the brand together. When a choice isn’t covered here, pick the option that best fits these.">
        <div className="grid gap-4 md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <article key={p.title} className="flex flex-col gap-3 rounded-[28px] bg-white p-7 shadow-warm">
              <span className="font-heading font-light text-meadow text-sm">0{i + 1}</span>
              <h3 className="font-heading font-light text-3xl text-ink tracking-[-0.04em]">{p.title}</h3>
              <p className="text-graphite text-sm leading-relaxed">{p.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="In this book">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDEX.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex flex-col overflow-hidden rounded-[28px] bg-white shadow-warm transition-shadow duration-300 hover:shadow-warm-lg"
            >
              <div className="flex h-44 items-center justify-center bg-paper/70 transition-colors duration-300 group-hover:bg-sand/50">
                <IndexVisual href={s.href} />
              </div>
              <div className="flex flex-col gap-1 p-6">
                <h3 className="font-heading font-light text-2xl text-ink tracking-[-0.03em]">
                  {s.title} <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </h3>
                <p className="text-pebble text-sm">{s.note}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
