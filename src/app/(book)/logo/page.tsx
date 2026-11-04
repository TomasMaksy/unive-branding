import { statSync } from "node:fs";
import { join } from "node:path";
import { DownloadIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { AppIcon, Mark, Wordmark } from "@/components/brand/logo";
import { DoDont, PageHeader, Section, Specimen } from "@/components/book/section";

export const metadata: Metadata = { title: "Logo" };

/** [file, label, preview background, preview image size] */
const FILES = [
  ["wordmark-ink.svg", "Wordmark, ink", "bg-paper", "w-40"],
  ["wordmark-paper.svg", "Wordmark, paper", "bg-ink", "w-40"],
  ["mark-ink.svg", "Icon, ink", "bg-paper", "w-24"],
  ["mark-paper.svg", "Icon, paper", "bg-ink", "w-24"],
  ["app-icon-ink.svg", "App icon, ink", "bg-paper", "size-24 drop-shadow-md"],
  ["app-icon-paper.svg", "App icon, paper", "bg-mist", "size-24 drop-shadow-md"],
  ["app-icon-meadow.svg", "App icon, meadow", "bg-paper", "size-24 drop-shadow-md"],
  ["favicon.svg", "Favicon", "bg-paper", "size-16 drop-shadow-md"],
] as const;

/** Read at build time, so the size on the card is the size you get. */
function fileSize(file: string) {
  const bytes = statSync(join(process.cwd(), "public/logo", file)).size;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export default function LogoPage() {
  return (
    <>
      <PageHeader eyebrow="Logo" title="Written, not typed.">
        The logo is a single hand-drawn word. Its letters lean, swell and join like real ink. That wobble is the brand, so
        never rebuild it from a font.
      </PageHeader>

      <Section
        title="Wordmark"
        description="Use the wordmark wherever the name needs saying: the navbar, the footer, documents, social cards. Ink on paper by default; paper on meadow, dusk or the hero veil."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Specimen label="Ink on paper" note="The default." tone="paper" className="min-h-72">
            <Wordmark className="w-[min(100%,380px)] text-ink" />
          </Specimen>
          <Specimen label="Paper on ink" tone="ink" className="min-h-72">
            <Wordmark className="w-[min(100%,380px)] text-paper" />
          </Specimen>
          <Specimen label="Paper on meadow" tone="meadow" className="min-h-60">
            <Wordmark className="w-[min(100%,300px)] text-paper" />
          </Specimen>
          <figure className="flex min-w-0 flex-col gap-3">
            <div className="squircle relative flex min-h-60 items-end overflow-hidden p-8 shadow-warm">
              <Image src="/scenes/university-scene.webp" alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              <div className="absolute inset-0" style={{ backgroundImage: "var(--scrim-ink)" }} />
              <Wordmark className="relative w-28 text-paper" />
            </div>
            <figcaption className="flex flex-col gap-0.5 px-1">
              <span className="font-medium text-ink text-sm">Paper on imagery</span>
              <span className="text-pebble text-xs">Small, in a corner, over the ink scrim. Never straight on the art.</span>
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section
        title="The “un” icon"
        description={
          <>
            One abstract shape that still reads “un”, a single wave of ink. Use it where space is square or tiny: app
            icon, favicon, avatar, loader, watermark. <strong className="font-medium text-ink">It never has a dot.</strong>
          </>
        }
      >
        <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr]">
          <Specimen label="The icon" note="Traced from the original drawing; only smoothed." tone="paper" className="min-h-80">
            <Mark className="w-[min(100%,300px)] text-ink" />
          </Specimen>
          <Specimen label="On ink" tone="ink" className="min-h-80">
            <Mark className="w-32 text-paper" />
          </Specimen>
          <Specimen label="On dusk" tone="dusk" className="min-h-80">
            <Mark className="w-32 text-mist" />
          </Specimen>
        </div>
      </Section>

      <Section
        title="App icon and favicon"
        description="The icon on a tile. Ink is the default; paper suits light home screens; meadow is for campaign moments. The favicon is the meadow tile, so Unive is easy to spot in a row of tabs."
      >
        <div className="grid gap-4 md:grid-cols-[3fr_2fr]">
          <Specimen label="Tiles" note="iOS mask shown. Export at 1024 px; the platform rounds the corners." tone="white" className="gap-6">
            <div className="flex flex-wrap items-center justify-center gap-5">
              <AppIcon className="size-24 drop-shadow-md" />
              <AppIcon tone="paper" className="size-24 drop-shadow-md" />
              <AppIcon tone="meadow" className="size-24 drop-shadow-md" />
            </div>
          </Specimen>
          <Specimen label="Favicon at real size" note="16, 24, 32 and 48 px. The squiggle fills in at 16 px and still reads “un”." tone="white">
            <div className="flex items-end gap-5">
              {[16, 24, 32, 48].map((s) => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <AppIcon rounded="favicon" tone="meadow" className="shrink-0" title={`Favicon at ${s} px`} style={{ width: s, height: s }} />
                  <span className="text-pebble text-[10px] tabular-nums">{s}</span>
                </div>
              ))}
            </div>
          </Specimen>
        </div>
      </Section>

      <Section
        title="Clear space and size"
        description="Keep a margin of one “u” height around the wordmark, and half a stem around the icon. Smallest sizes: wordmark 64 px wide, icon 16 px."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Specimen label="Wordmark clear space" note="x = the height of the u." tone="white" className="min-h-72">
            <div className="relative p-[38px] outline-1 outline-meadow/60 outline-dashed">
              <div className="outline-1 outline-meadow/40 outline-dashed">
                <Wordmark className="w-56 text-ink" />
              </div>
              <span className="absolute top-1 left-1/2 -translate-x-1/2 font-mono text-[10px] text-meadow">x</span>
              <span className="absolute top-1/2 left-1.5 -translate-y-1/2 font-mono text-[10px] text-meadow">x</span>
            </div>
          </Specimen>
          <Specimen label="Minimum sizes" tone="white" className="min-h-72">
            <div className="flex items-end gap-10">
              <div className="flex flex-col items-center gap-3">
                <Wordmark className="w-16 text-ink" />
                <span className="text-pebble text-[10px]">64 px</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Mark className="w-4 text-ink" />
                <span className="text-pebble text-[10px]">16 px</span>
              </div>
            </div>
          </Specimen>
        </div>
      </Section>

      <Section title="Do and don’t">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DoDont kind="do" label="Ink on paper, or paper on a brand colour.">
            <Wordmark className="w-36 text-ink" />
          </DoDont>
          <DoDont kind="do" label="Paper on imagery, over the ink scrim.">
            <Image src="/scenes/desktop-scene.webp" alt="" fill sizes="25vw" className="object-cover" />
            <div className="absolute inset-0" style={{ backgroundImage: "var(--scrim-ink)" }} />
            <Wordmark className="relative w-36 text-paper" />
          </DoDont>
          <DoDont kind="dont" label="Add a dot to the icon. It is “un”, alone.">
            <div className="flex flex-col items-center">
              <span className="mb-1 size-4 rounded-full bg-ink" />
              <Mark title="" className="w-28 text-ink" />
            </div>
          </DoDont>
          <DoDont kind="dont" label="Stretch, squash or rotate it.">
            <Wordmark title="" className="w-36 scale-x-150 -rotate-6 text-ink" />
          </DoDont>
          <DoDont kind="dont" label="Outline it. It is solid ink.">
            <Wordmark title="" className="w-36 fill-transparent stroke-[10] stroke-ink" />
          </DoDont>
          <DoDont kind="dont" label="Recolour it. The logo is ink or paper only.">
            <Wordmark title="" className="w-36 text-meadow" />
          </DoDont>
          <DoDont kind="dont" label="Retype it in Averia or any font.">
            <span className="font-heading font-bold text-5xl text-ink tracking-[-0.05em]">unive</span>
          </DoDont>
          <DoDont kind="dont" label="Animate the i’s dot. Motion lives in the “un”.">
            <div className="relative">
              <Wordmark title="" className="w-36 text-ink" />
              <span className="absolute -top-5 left-[58%] text-danger text-xs">↕</span>
            </div>
          </DoDont>
        </div>
      </Section>

      <Section
        title="Files"
        description={
          <>
            Click any file to download the SVG. Generated from the master drawings by <code>generator/logo.py</code>. Edit
            the script, never the SVGs.
          </>
        }
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FILES.map(([file, label, bg, size]) => (
            <li key={file}>
              <a
                href={`/logo/${file}`}
                download
                aria-label={`Download ${label} (${file})`}
                className="group flex flex-col gap-2 rounded-3xl bg-white p-2 shadow-warm outline-none transition-shadow hover:shadow-warm-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className={`squircle flex aspect-[4/3] items-center justify-center [--sq:var(--radius-2xl)] ${bg}`}>
                  {/* biome-ignore lint/performance/noImgElement: static SVG preview */}
                  <img
                    src={`/logo/${file}`}
                    alt=""
                    className={`${size} transition-transform duration-300 ease-out group-hover:scale-[1.04]`}
                  />
                </span>
                <span className="flex items-center gap-3 py-1.5 pr-1.5 pl-3">
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="font-medium text-ink text-sm">{label}</span>
                    <span className="truncate text-pebble text-xs">
                      {file} · {fileSize(file)}
                    </span>
                  </span>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-mist text-ink transition-colors group-hover:bg-ink group-hover:text-paper">
                    <DownloadIcon className="size-4" aria-hidden />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
