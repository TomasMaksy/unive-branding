import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/book/section";

export const metadata: Metadata = { title: "Colour" };

type Swatch = { name: string; token: string; hex: string; use: string; dark?: boolean };

const CORE: Swatch[] = [
  { name: "Paper", token: "--paper", hex: "#F9F9F7", use: "Every page. The hero’s sky." },
  { name: "Ink", token: "--ink", hex: "#1D1B18", use: "Logo, headings, primary buttons.", dark: true },
  { name: "Graphite", token: "--graphite", hex: "#57524B", use: "Body copy on paper.", dark: true },
  { name: "Pebble", token: "--pebble", hex: "#77716A", use: "Captions, hints, metadata.", dark: true },
];
const EARTH: Swatch[] = [
  { name: "Linen", token: "--linen", hex: "#E8E2D6", use: "The horizon haze." },
  { name: "Sand", token: "--sand", hex: "#EDE4DC", use: "Warm fills, selected rows." },
  { name: "Clay", token: "--clay", hex: "#C7B9AC", use: "Warm borders and rules." },
  { name: "Terracotta", token: "--terracotta", hex: "#8F6F5C", use: "Closing calls to action.", dark: true },
  { name: "Brick", token: "--brick", hex: "#854C34", use: "Feature cards over photos.", dark: true },
  { name: "Loam", token: "--loam", hex: "#6A6348", use: "The hillside.", dark: true },
  { name: "Dusk", token: "--dusk", hex: "#413A2D", use: "The ground. Footers, dark panels.", dark: true },
];
const MEADOW: Swatch[] = [
  { name: "Meadow soft", token: "--meadow-soft", hex: "#EDE9D8", use: "Current step, gentle highlight." },
  { name: "Meadow light", token: "--meadow-light", hex: "#8B9460", use: "Charts, secondary marks.", dark: true },
  { name: "Meadow", token: "--meadow", hex: "#6F7644", use: "The brand accent: progress, growth.", dark: true },
  { name: "Meadow dark", token: "--meadow-dark", hex: "#4A5130", use: "Pressed and hover states.", dark: true },
  { name: "Meadow ink", token: "--meadow-ink", hex: "#3A4124", use: "Text on meadow soft.", dark: true },
];
const SKY: Swatch[] = [
  { name: "Sky soft", token: "--sky-soft", hex: "#EEF4FF", use: "Selection, focus fill." },
  { name: "Sky", token: "--sky", hex: "#4893F9", use: "Links and focus rings only.", dark: true },
  { name: "Sky ink", token: "--sky-ink", hex: "#1F5FBF", use: "Link text on paper.", dark: true },
];

const STATES = [
  { name: "Success", key: "success", soft: "#E6EFE5", main: "#3D7A55", ink: "#2C5B3E", say: "Saved. Your essay is in." },
  { name: "Warning", key: "warning", soft: "#FBF0D9", main: "#C2850F", ink: "#7A5208", say: "Two deadlines this week." },
  { name: "Danger", key: "danger", soft: "#F8E5E0", main: "#B4432F", ink: "#8A2F20", say: "We couldn’t upload that file." },
  { name: "Info", key: "info", soft: "#EEF4FF", main: "#4893F9", ink: "#1F5FBF", say: "Yale updated its prompts." },
] as const;

function luminance(hex: string) {
  const c = [1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = c.map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a: string, b: string) {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}

function SwatchCard({ s, tall }: { s: Swatch; tall?: boolean }) {
  const on = s.dark ? "#F9F9F7" : "#1D1B18";
  const ratio = contrast(s.hex, on);
  return (
    <figure className="flex min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-warm">
      <div
        className={`flex items-end justify-between p-4 ${tall ? "h-40" : "h-28"} ${s.hex === "#F9F9F7" ? "ring-1 ring-border ring-inset" : ""}`}
        style={{ background: s.hex, color: on }}
      >
        <span className="font-heading font-light text-2xl tracking-[-0.03em]">Aa</span>
        <span className="font-medium text-[10px] tabular-nums opacity-80">{ratio.toFixed(1)}:1</span>
      </div>
      <figcaption className="flex flex-col gap-0.5 p-4">
        <span className="font-medium text-ink text-sm">{s.name}</span>
        <span className="font-mono text-pebble text-[11px]">
          {s.hex} · {s.token}
        </span>
        <span className="mt-1 text-graphite text-xs leading-relaxed">{s.use}</span>
      </figcaption>
    </figure>
  );
}

export default function ColorPage() {
  return (
    <>
      <PageHeader eyebrow="Colour" title="Paper, ink and a meadow.">
        Every colour comes from the hero: the pale sky, the hills, the dusk of the ground. Pages are mostly paper and ink.
        Earth tones warm them, and meadow marks growth. Sky blue is only for links and focus.
      </PageHeader>

      <Section title="Proportion" description="Roughly how much of a screen each family should take. If a page feels loud, there is too much of the last three.">
        <div className="flex h-24 overflow-hidden rounded-2xl shadow-warm">
          {[
            ["Paper", "70%", "#F9F9F7", "#1D1B18"],
            ["Ink", "18%", "#1D1B18", "#F9F9F7"],
            ["Earth", "7%", "#C7B9AC", "#1D1B18"],
            ["Meadow", "4%", "#6F7644", "#F9F9F7"],
            ["Sky", "1%", "#4893F9", "#F9F9F7"],
          ].map(([n, w, bg, fg]) => (
            <div key={n} className="flex min-w-0 flex-col justify-end p-3 text-xs" style={{ width: w, background: bg, color: fg }}>
              <span className="truncate font-medium">{n}</span>
              <span className="truncate opacity-70">{w}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Core" description="Ink is a warm black, never #000. Paper is the default background everywhere; cards sit on it in white.">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {CORE.map((s) => (
            <SwatchCard key={s.token} s={s} tall />
          ))}
        </div>
      </Section>

      <Section title="Earth" description="Taken from the hero art, top to bottom. Use them for warmth: borders, fills, the footer, photo washes.">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
          {EARTH.map((s) => (
            <SwatchCard key={s.token} s={s} />
          ))}
        </div>
      </Section>

      <Section title="Meadow" description="The brand accent: the green of the hero’s fields. It means growth and progress, so use it for the roadmap, progress and milestones.">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {MEADOW.map((s) => (
            <SwatchCard key={s.token} s={s} />
          ))}
        </div>
      </Section>

      <Section title="Sky" description="Kept from the app for interaction only: links, focus rings and text selection. Never for decoration or the logo.">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {SKY.map((s) => (
            <SwatchCard key={s.token} s={s} />
          ))}
        </div>
      </Section>

      <Section
        title="States"
        description={
          <>
            Success, warning, danger and info, tuned warmer to sit with paper and earth. Each state has three steps: a soft
            fill, a main colour for icons and solid buttons, and an ink colour for text. Use the tokens{" "}
            <code>bg-success/8</code>, <code>text-success-foreground</code> and so on; never raw Tailwind reds or ambers.
          </>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          {STATES.map((s) => (
            <article key={s.key} className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-warm">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-light text-2xl text-ink tracking-[-0.03em]">{s.name}</h3>
                <span className="font-mono text-pebble text-[11px]">--{s.key}</span>
              </div>
              <div className="grid grid-cols-3 overflow-hidden rounded-xl text-[11px]">
                {[
                  ["soft", s.soft, s.ink],
                  ["main", s.main, "#FFFFFF"],
                  ["ink", s.ink, "#FFFFFF"],
                ].map(([label, bg, fg]) => (
                  <div key={label} className="flex h-20 flex-col justify-end p-3" style={{ background: bg, color: fg }}>
                    <span className="font-medium">{label}</span>
                    <span className="font-mono opacity-80">{bg}</span>
                  </div>
                ))}
              </div>
              <p
                className="rounded-xl border px-3.5 py-3 text-sm"
                style={{ background: s.soft, borderColor: `${s.main}52`, color: s.ink }}
              >
                {s.say}
                <span className="float-right font-medium text-[10px] tabular-nums opacity-80">
                  {contrast(s.ink, s.soft).toFixed(1)}:1
                </span>
              </p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
