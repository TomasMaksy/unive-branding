import type { Metadata } from "next";
import { UnLoader } from "@/components/brand/un-loader";
import { UnProgress } from "@/components/brand/un-progress";
import { PageHeader, Section, Specimen } from "@/components/book/section";
import { Button } from "@/components/ui/button";
import { BrandPlayer } from "@/remotion/player";
import { ProgressDemo } from "./progress-demo";

export const metadata: Metadata = { title: "Motion" };

const ENTRANCE = [
  ["Badge", "0.55 s", "20 ms", "10 px"],
  ["Headline", "0.70 s", "80 ms", "18 px"],
  ["Subtitle", "0.65 s", "200 ms", "14 px"],
  ["Call to action", "0.60 s", "340 ms", "12 px"],
  ["Logos", "0.65 s", "500 ms", "10 px"],
  ["Horizon art", "1.20 s", "700 ms", "28%"],
] as const;

export default function MotionPage() {
  return (
    <>
      <PageHeader eyebrow="Motion" title="The “un” is a wave.">
        Our icon is one continuous stroke: down, up, down, up. So when Unive is thinking, the “un” flows along its own path
        like a wave through water. That’s the whole motion idea; everything else stays calm around it.
      </PageHeader>

      <Section
        title="Loaders"
        description={
          <>
            <code>{"<UnLoader />"}</code> draws the icon’s real centreline and stroke width, taken from the drawing.{" "}
            <strong className="font-medium text-ink">Flow</strong> is the default for any wait.{" "}
            <strong className="font-medium text-ink">Write</strong> is for creation moments: generating an essay, building a
            plan. With reduced motion both show the still icon.
          </>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Specimen label="Flow" note="2.4 s loop, constant speed, like a current." tone="paper" className="min-h-80">
            <UnLoader size={150} className="text-ink" />
          </Specimen>
          <Specimen label="Write" note="2.8 s loop. A pen writes the “un”, then lifts it off." tone="paper" className="min-h-80">
            <UnLoader variant="write" size={150} className="text-ink" />
          </Specimen>
          <Specimen label="On ink" tone="ink">
            <UnLoader size={72} className="text-paper" />
          </Specimen>
          <Specimen label="On meadow" tone="meadow">
            <UnLoader size={72} className="text-paper" />
          </Specimen>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Specimen label="Sizes" note="16, 24, 32 and 48 px tall." tone="white">
            <div className="flex items-end gap-6 text-ink">
              {[16, 24, 32, 48].map((s) => (
                <UnLoader key={s} size={s} />
              ))}
            </div>
          </Specimen>
          <Specimen label="Inline with text" tone="white">
            <p className="flex items-center gap-3 font-heading font-light text-graphite text-xl">
              <UnLoader size={22} className="text-meadow" />
              Reading your essay…
            </p>
          </Specimen>
          <Specimen label="In a button" tone="white">
            <Button variant="brand" className="h-11 gap-2.5 px-5" disabled>
              <UnLoader size={16} label="" />
              Saving
            </Button>
          </Specimen>
        </div>
      </Section>

      <Section
        title="Progress"
        description="Progress is written, not filled: an “ununun” wave inked from left to right. Without a value it writes, lifts off and writes again."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Specimen label="Determinate" note="<UnProgress value={62} />" tone="white" className="min-h-56">
            <ProgressDemo />
          </Specimen>
          <Specimen label="Indeterminate" note="<UnProgress />" tone="white" className="min-h-56">
            <UnProgress className="w-full max-w-md text-ink" label="Loading" />
          </Specimen>
        </div>
      </Section>

      <Section
        title="Video"
        description={
          <>
            Remotion compositions in <code>src/remotion/</code>, built on the same geometry: a brand sting for videos and
            socials, and both loaders as square loops. Every frame is computed, so renders are identical.
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <figure className="flex flex-col gap-3">
            <div className="overflow-hidden rounded-2xl shadow-warm">
              <BrandPlayer id="sting" controls />
            </div>
            <figcaption className="px-1 text-sm">
              <span className="font-medium text-ink">Brand sting</span>
              <span className="text-pebble"> · 1920×1080, 5 s. Written, flows one wave, then the horizon rises under the wordmark.</span>
            </figcaption>
          </figure>
          <div className="grid gap-4 md:grid-cols-2">
            <figure className="flex flex-col gap-3">
              <div className="overflow-hidden rounded-2xl shadow-warm">
                <BrandPlayer id="flow" />
              </div>
              <figcaption className="px-1 font-medium text-ink text-sm">Flow loop · 1080×1080</figcaption>
            </figure>
            <figure className="flex flex-col gap-3">
              <div className="overflow-hidden rounded-2xl shadow-warm">
                <BrandPlayer id="write" />
              </div>
              <figcaption className="px-1 font-medium text-ink text-sm">Write loop · 1080×1080</figcaption>
            </figure>
          </div>
        </div>
      </Section>

      <Section
        title="Easing and timing"
        description="One curve for nearly everything: the hero’s cubic-bezier(0.22, 1, 0.36, 1). It starts quickly and lands softly. No overshoot and no bounce, anywhere."
      >
        <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
          <Specimen label="--ease-unive" note="cubic-bezier(0.22, 1, 0.36, 1)" tone="white" className="min-h-72">
            <svg viewBox="-0.08 -0.08 1.16 1.16" className="w-56 -scale-y-100" aria-hidden>
              <path d="M0 0H1V1H0Z" fill="none" stroke="var(--border)" strokeWidth="0.008" />
              <path d="M0 0C0.22 1 0.36 1 1 1" fill="none" stroke="var(--ink)" strokeWidth="0.02" strokeLinecap="round" />
              <path d="M0 0L0.22 1M1 1L0.36 1" stroke="var(--meadow)" strokeWidth="0.008" />
              <circle cx="0.22" cy="1" r="0.025" fill="var(--meadow)" />
              <circle cx="0.36" cy="1" r="0.025" fill="var(--meadow)" />
            </svg>
          </Specimen>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-4">
              {[
                ["Quick", "160 ms", "hover, press, toggles"],
                ["Standard", "320 ms", "menus, dialogs, cards"],
                ["Slow", "700 ms", "page entrances, art"],
              ].map(([n, v, u]) => (
                <div key={n} className="flex flex-col gap-1 rounded-2xl bg-white p-5 shadow-warm">
                  <span className="text-pebble text-xs">{n}</span>
                  <span className="font-heading font-light text-3xl text-ink tracking-[-0.04em]">{v}</span>
                  <span className="text-graphite text-xs">{u}</span>
                </div>
              ))}
            </div>
            <div className="overflow-hidden rounded-2xl bg-white shadow-warm">
              <table className="w-full text-left text-sm">
                <caption className="px-5 pt-4 pb-2 text-left text-pebble text-xs">
                  The entrance pattern: rise and fade in, staggered top to bottom.
                </caption>
                <thead className="text-pebble text-xs">
                  <tr className="border-border border-b">
                    <th className="px-5 py-2 font-medium">Element</th>
                    <th className="px-5 py-2 font-medium">Duration</th>
                    <th className="px-5 py-2 font-medium">Delay</th>
                    <th className="px-5 py-2 font-medium">Rise</th>
                  </tr>
                </thead>
                <tbody className="text-graphite tabular-nums">
                  {ENTRANCE.map((r) => (
                    <tr key={r[0]} className="border-border/60 border-b last:border-0">
                      {r.map((c, i) => (
                        <td key={c + i} className={i === 0 ? "px-5 py-2.5 text-ink" : "px-5 py-2.5"}>
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="SVG exports"
        description={
          <>
            For places React can’t reach (email, CMS, native splash screens): self-contained looping SVGs, no JavaScript.
            Regenerate with <code>bun run loaders</code>.
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {["un-flow.svg", "un-write.svg"].map((f) => (
            <Specimen key={f} label={f} tone="paper">
              {/* biome-ignore lint/performance/noImgElement: demonstrates the file as an <img> */}
              <img src={`/loaders/${f}`} alt="Loading" className="h-24 w-auto" />
            </Specimen>
          ))}
        </div>
      </Section>
    </>
  );
}
