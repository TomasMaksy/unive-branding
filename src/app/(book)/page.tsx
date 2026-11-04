import { CalendarIcon, CircleCheckIcon, FileTextIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { HeroArt } from "@/components/brand/hero-art";
import { Mark, Wordmark } from "@/components/brand/logo";
import { UnLoader } from "@/components/brand/un-loader";
import { Section } from "@/components/book/section";
import { Button } from "@/components/ui/button";

const INDEX = [
  { href: "/moodboard", title: "Moodboard", note: "The brand at a glance: scenes, colour, type and the mark together." },
  { href: "/logo", title: "Logo", note: "Wordmark, the “un” icon, app icons, favicon, rules." },
  { href: "/motion", title: "Motion", note: "The flowing “un” loader, progress, easing and SVG exports." },
  { href: "/color", title: "Colour", note: "Paper, ink, earth, meadow and the four states." },
  { href: "/type", title: "Typography", note: "Averia Serif Libre for voice, Inter for interface." },
  { href: "/imagery", title: "Imagery", note: "Warm 3D scenes, and the one scrim that keeps text readable on them." },
  { href: "/icons", title: "Icons", note: "Lucide outlines: sizes, colours, the two fills and the set we use." },
  { href: "/components", title: "Components", note: "Buttons, fields, cards, alerts, dialogs and more." },
] as const;

function IndexVisual({ href }: { href: (typeof INDEX)[number]["href"] }) {
  switch (href) {
    case "/moodboard":
      return (
        <div className="grid h-28 w-64 grid-cols-[1.2fr_1fr_0.8fr] gap-1.5">
          <span className="squircle grid place-items-center bg-meadow [--sq:var(--radius-xl)]">
            <Mark title="" className="w-12 text-paper" />
          </span>
          <span className="squircle grid place-items-center bg-ink text-paper [--sq:var(--radius-xl)]">
            <UnLoader size={26} label="" />
          </span>
          <span className="squircle grid place-items-center bg-mist [--sq:var(--radius-xl)] font-heading font-light text-3xl text-ink">Aa</span>
        </div>
      );
    case "/logo":
      return <Mark title="" className="w-24 text-ink" />;
    case "/motion":
      return <UnLoader size={56} className="text-ink" />;
    case "/color":
      return (
        <div className="flex -space-x-3">
          {["bg-paper", "bg-mist", "bg-input", "bg-meadow", "bg-graphite", "bg-dusk", "bg-ink"].map((c) => (
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
    case "/imagery":
      return (
        <Image
          src="/scenes/university-scene.webp"
          alt=""
          fill
          sizes="(min-width: 1280px) 25vw, 50vw"
          className="object-cover transition-transform duration-500 ease-unive group-hover:scale-[1.03]"
        />
      );
    case "/icons":
      return (
        <div className="flex items-center gap-5 text-ink">
          <CalendarIcon className="size-7" aria-hidden />
          <FileTextIcon className="size-7" aria-hidden />
          <StarIcon className="size-7 fill-meadow text-meadow" aria-hidden />
          <CircleCheckIcon className="size-7 fill-success text-white" aria-hidden />
        </div>
      );
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
      <section className="relative flex min-h-[calc(100dvh-3.5rem)] lg:min-h-dvh flex-col">
        <div className="relative z-30 mx-auto flex w-full max-w-4xl flex-col items-center px-6 pt-14 text-center md:pt-20">
          <span className="enter-pill inline-flex items-center gap-2.5 rounded-full border border-border bg-white px-4 py-2 text-graphite text-xs shadow-warm-xs" data-enter="">
            <Mark title="" className="w-5 text-ink" />
            Brand book · v1 · 2026
          </span>
          <h1 className="enter-title mt-8 w-full" data-enter="">
            <Wordmark className="mx-auto w-[min(52vw,300px)] text-ink" />
          </h1>
          <p className="enter-subtitle mt-8 max-w-xl text-pretty text-graphite text-base leading-relaxed md:text-lg" data-enter="">
            Hand-drawn, warm and unhurried, like a good mentor’s notes in the margin.
          </p>
          <div className="enter-cta mt-8 flex flex-wrap items-center justify-center gap-3" data-enter="">
            <Button variant="brand" size="lg" render={<Link href="/logo" />}>
              Get the logo
            </Button>
            <Button variant="brand-outline" size="lg" render={<Link href="/landing" />}>
              See it on the landing page
            </Button>
          </div>
        </div>
        <HeroArt priority className="mt-auto h-[46vh] min-h-[16rem] md:h-[52vh]" />
      </section>

      <Section title="In this book">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {INDEX.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex first:sm:col-span-2 last:sm:col-span-2 last:xl:col-span-4 flex-col overflow-hidden rounded-[28px] bg-white shadow-warm transition-shadow duration-300 hover:shadow-warm-lg"
            >
              <div className="relative flex h-44 items-center justify-center overflow-hidden bg-paper/70 transition-colors duration-300 group-hover:bg-mist/50">
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
