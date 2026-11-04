import type { Metadata } from "next";
import Image from "next/image";
import { HeroArt } from "@/components/brand/hero-art";
import { Wordmark } from "@/components/brand/logo";
import { PageHeader, Section } from "@/components/book/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Gradients & imagery" };

const GRADIENTS = [
  { name: "Meadow dusk", token: "--gradient-meadow-dusk", use: "The signature. Behind the hero art, cover slides, the app’s splash.", dark: false },
  { name: "Ink veil", token: "--gradient-ink-veil", use: "Over imagery, so white text and logos stay readable.", dark: true, over: true },
  { name: "Brick wash", token: "--gradient-brick-wash", use: "Feature cards with a photo bleeding in from the right.", dark: true, over: true },
  { name: "Clay dusk", token: "--gradient-clay-dusk", use: "Closing calls to action over imagery.", dark: true, over: true },
  { name: "Sage", token: "--gradient-sage", use: "Calm frames for product mock-ups.", dark: false },
  { name: "Haze", token: "--gradient-haze", use: "Dreamy frames: essays, reflection.", dark: false },
  { name: "Graphite", token: "--gradient-graphite", use: "Behind product screenshots, so the UI glows.", dark: true },
  { name: "Linen", token: "--gradient-linen", use: "Premium cards (the Pro plan).", dark: false },
  { name: "Harvest", token: "--gradient-harvest", use: "Progress that ends in success. Thin bars only.", dark: false },
] as const;

const SCENES = [
  ["application-strategy-wide.webp", "Strategy"],
  ["essay-writing-wide.webp", "Essays"],
  ["extracurriculars-wide.webp", "Extracurriculars"],
  ["rec-letters-scene.webp", "Recommendation letters"],
  ["gift-scene.webp", "Gifting"],
  ["desktop-scene.webp", "At the desk"],
] as const;

export default function GradientsPage() {
  return (
    <>
      <PageHeader eyebrow="Gradients & imagery" title="Everything fades to the meadow.">
        The hero’s panorama is the best-looking thing we have, so every gradient is built on it. Paper sky to linen haze,
        down the hillside to dusk. Imagery is warm, hand-crafted 3D, always faded into the page rather than boxed.
      </PageHeader>

      <Section title="The signature" description="Paper at the top so the art grows out of the page; dusk at the bottom where the scene sits. The art is masked at the sides with --mask-side-fade.">
        <div className="overflow-hidden rounded-[28px] shadow-warm-lg">
          <HeroArt className="h-[380px] md:h-[460px]" />
        </div>
      </Section>

      <Section title="Gradients" description="Each one is a CSS variable in globals.css. Use them as background-image; don’t invent new ones for a single screen.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GRADIENTS.map((g) => (
            <figure key={g.token} className="flex min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-warm">
              <div className="relative h-44">
                {"over" in g ? (
                  <Image src="/scenes/main_bg-2.webp" alt="" fill sizes="33vw" className="object-cover object-bottom" />
                ) : null}
                <div className="absolute inset-0" style={{ backgroundImage: `var(${g.token})` }} />
                <span className={`absolute bottom-4 left-4 font-heading font-light text-2xl tracking-[-0.03em] ${g.dark ? "text-paper" : "text-ink"}`}>
                  {g.name}
                </span>
              </div>
              <figcaption className="flex flex-col gap-1 p-4">
                <code className="text-pebble text-[11px]">{g.token}</code>
                <span className="text-graphite text-xs leading-relaxed">{g.use}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section title="In use">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="relative flex min-h-80 flex-col justify-end overflow-hidden rounded-[32px] p-8 md:p-10" style={{ background: "#8F6F5C" }}>
            <Image src="/scenes/cta-id.webp" alt="" fill sizes="50vw" className="object-cover object-right" />
            <div className="absolute inset-0" style={{ backgroundImage: "var(--gradient-clay-dusk)" }} />
            <div className="relative flex max-w-xs flex-col gap-5">
              <h3 className="font-heading font-light text-4xl text-white leading-[1.05] tracking-[-0.04em]">Start your plan today</h3>
              <Button variant="brand-outline" className="h-11 w-fit px-5 sm:h-11">
                Get started
              </Button>
            </div>
          </div>
          <div className="relative flex min-h-80 flex-col justify-center overflow-hidden rounded-[28px] p-8 md:p-10" style={{ background: "#854C34" }}>
            <Image src="/scenes/extracurriculars-wide.webp" alt="" fill sizes="50vw" className="object-cover object-right" />
            <div className="absolute inset-0" style={{ backgroundImage: "var(--gradient-brick-wash)" }} />
            <div className="relative flex max-w-xs flex-col gap-5">
              <h3 className="font-heading font-light text-4xl text-white leading-tight tracking-[-0.04em]">Your 12 universities</h3>
              <span className="w-fit rounded-xl bg-white/95 px-4 py-3 font-medium text-brick text-sm">Open the roadmap →</span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl px-4 pt-6 sm:px-10 sm:pt-10 lg:col-span-2" style={{ backgroundImage: "var(--gradient-graphite)" }}>
            <div className="mx-auto flex max-w-4xl overflow-hidden rounded-t-2xl bg-paper shadow-frame">
              <aside className="hidden w-48 shrink-0 flex-col gap-1 border-border border-r p-4 sm:flex">
                <Wordmark title="" className="mb-4 w-16 text-ink" />
                {["Dashboard", "Universities", "Essays", "Scholarships", "Interviews"].map((n, i) => (
                  <span key={n} className={`rounded-lg px-2.5 py-1.5 text-xs ${i === 0 ? "bg-paper-hover font-medium text-ink" : "text-graphite"}`}>
                    {n}
                  </span>
                ))}
              </aside>
              <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 sm:p-6">
                <div className="relative flex min-h-40 flex-col justify-center overflow-hidden rounded-2xl p-6" style={{ background: "#854C34" }}>
                  <Image src="/scenes/essay-writing-wide.webp" alt="" fill sizes="50vw" className="object-cover object-right" />
                  <div className="absolute inset-0" style={{ backgroundImage: "var(--gradient-brick-wash)" }} />
                  <p className="relative max-w-56 font-heading font-light text-2xl text-white leading-tight tracking-[-0.03em]">Build a balanced list of schools</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-warm-xs">
                    <span className="font-heading font-light text-graphite tracking-[-0.03em]">Nearest deadline</span>
                    <span className="text-ink text-sm">Yale · Early action · Nov 1</span>
                  </div>
                  <div className="flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-warm-xs">
                    <span className="font-heading font-light text-graphite tracking-[-0.03em]">Application</span>
                    <div className="h-1.5 overflow-hidden rounded-full bg-input">
                      <div className="h-full w-2/3 rounded-full" style={{ backgroundImage: "var(--gradient-harvest)" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Imagery" description="Warm, soft-lit 3D scenes: campus, paths, desks, letters. People are small and seen from behind, on their way somewhere. Fade every scene into the page; never put a hard box around a wide scene.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SCENES.map(([file, label]) => (
            <figure key={file} className="flex flex-col gap-2">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-linen shadow-warm">
                <Image src={`/scenes/${file}`} alt={label} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" />
              </div>
              <figcaption className="px-1 text-graphite text-xs">{label}</figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </>
  );
}
