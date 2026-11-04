import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader, Section } from "@/components/book/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Imagery" };

const SCENES = [
  ["university-scene.webp", "Campus visit"],
  ["application-strategy-wide.webp", "Strategy"],
  ["desktop-scene.webp", "At the desk"],
  ["rec-letters-wide.webp", "Recommendation letters"],
  ["essay-writing-wide.webp", "Essays"],
  ["gift-scene.webp", "Acceptance"],
] as const;

/** A photo card with text on it: photo, ink scrim from the bottom, text. */
function PhotoCard({ src, position = "center", className, children }: { src: string; position?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={`squircle relative flex aspect-video flex-col justify-end overflow-hidden bg-dusk p-7 [--sq:28px] md:p-9 ${className ?? ""}`}>
      <Image src={src} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" style={{ objectPosition: position }} />
      <div className="absolute inset-0" style={{ backgroundImage: "var(--scrim-ink)" }} />
      <div className="relative flex max-w-sm flex-col gap-5">{children}</div>
    </div>
  );
}

export default function ImageryPage() {
  return (
    <>
      <PageHeader eyebrow="Imagery" title="Warm scenes, one scrim.">
        Soft-lit 3D scenes: campus, desks, letters, small moments of progress. There are no decorative gradients in the
        brand. The only gradient is the ink scrim, which darkens the bottom of a photo so the text on it stays readable.
      </PageHeader>

      <Section title="Scenes" description="Warm light, wood, paper, greenery. Pick scenes in that range; skip ones dominated by a cold colour (a blue gym, a neon screen), they fight the palette.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SCENES.map(([file, label]) => (
            <figure key={file} className="flex flex-col gap-2">
              <div className="squircle relative aspect-[3/2] overflow-hidden bg-mist [--sq:var(--radius-2xl)]">
                <Image src={`/scenes/${file}`} alt={label} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" />
              </div>
              <figcaption className="px-1 text-graphite text-xs">{label}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section
        title="Scrim"
        description={
          <>
            One gradient, <code>--scrim-ink</code>: warm black rising from the bottom edge, gone by the top. Put text and
            buttons in the dark part, white text and a solid white button. Never tint a photo with a brand colour.
          </>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <figure className="flex flex-col gap-2">
            <div className="squircle relative aspect-[3/2] overflow-hidden [--sq:var(--radius-2xl)]">
              <Image src="/scenes/university-scene.webp" alt="" fill sizes="50vw" className="object-cover" />
            </div>
            <figcaption className="px-1 text-graphite text-xs">The photo</figcaption>
          </figure>
          <figure className="flex flex-col gap-2">
            <div className="squircle relative flex aspect-[3/2] items-end overflow-hidden p-6 [--sq:var(--radius-2xl)]">
              <Image src="/scenes/university-scene.webp" alt="" fill sizes="50vw" className="object-cover" />
              <div className="absolute inset-0" style={{ backgroundImage: "var(--scrim-ink)" }} />
              <span className="relative font-heading font-light text-3xl text-white leading-tight tracking-[-0.03em]">Visit the campus</span>
            </div>
            <figcaption className="px-1 text-graphite text-xs">With the scrim and text</figcaption>
          </figure>
        </div>
      </Section>

      <Section title="In use">
        <div className="grid gap-4 lg:grid-cols-2">
          <PhotoCard src="/scenes/application-strategy-wide.webp">
            <h3 className="font-heading font-light text-4xl text-white leading-[1.05] tracking-[-0.04em]">Start your plan today</h3>
            <Button variant="inverse" size="lg" className="w-fit">
              Get started
            </Button>
          </PhotoCard>
          <PhotoCard src="/scenes/university-scene.webp">
            <h3 className="font-heading font-light text-4xl text-white leading-[1.05] tracking-[-0.04em]">Your 12 universities</h3>
            <Button variant="inverse" size="lg" className="w-fit">
              Open the roadmap
            </Button>
          </PhotoCard>
        </div>
      </Section>
    </>
  );
}
