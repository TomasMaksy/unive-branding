import type { Metadata } from "next";
import { CopyHex } from "@/components/book/copy-hex";
import { PageHeader, Section } from "@/components/book/section";

export const metadata: Metadata = { title: "Colour" };

type Swatch = { name: string; token: string; hex: string; use: string; dark?: boolean };

const NEUTRALS: Swatch[] = [
  { name: "Paper", token: "--paper", hex: "#F9F9F7", use: "Every page." },
  { name: "Mist", token: "--mist", hex: "#EFEFEA", use: "Fills, secondary buttons, selected rows." },
  { name: "Stone", token: "--stone", hex: "#939290", use: "Generating buttons, calm solid fills on white.", dark: true },
  { name: "Pebble", token: "--pebble", hex: "#77716A", use: "Captions, hints, metadata.", dark: true },
  { name: "Graphite", token: "--graphite", hex: "#57524B", use: "Body copy.", dark: true },
  { name: "Dusk", token: "--dusk", hex: "#413A2D", use: "Behind photos while they load. Use ink for dark panels.", dark: true },
  { name: "Ink", token: "--ink", hex: "#1D1B18", use: "Logo, headings, primary buttons.", dark: true },
];
const MEADOW: Swatch[] = [
  { name: "Meadow soft", token: "--meadow-soft", hex: "#EEF0DF", use: "Current step, gentle highlight." },
  { name: "Meadow light", token: "--meadow-light", hex: "#8B9460", use: "Charts, secondary marks.", dark: true },
  { name: "Meadow", token: "--meadow", hex: "#6F7644", use: "The brand accent: progress, growth.", dark: true },
  { name: "Meadow dark", token: "--meadow-dark", hex: "#4A5130", use: "Pressed and hover states.", dark: true },
  { name: "Meadow ink", token: "--meadow-ink", hex: "#3A4124", use: "Text on meadow soft.", dark: true },
];
const STATES = [
  { name: "Success", key: "success", soft: "#E3F3DF", main: "#3F9442", ink: "#1F5C22", say: "Saved. Your essay is in." },
  { name: "Warning", key: "warning", soft: "#FDF0D2", main: "#E09A12", ink: "#7A4E00", say: "Two deadlines this week." },
  { name: "Danger", key: "danger", soft: "#FCEEEC", main: "#D9432B", ink: "#C23A23", say: "We couldn’t upload that file." },
  { name: "Info", key: "info", soft: "#EFEFEA", main: "#57524B", ink: "#1D1B18", say: "Yale updated its prompts." },
] as const;

const PROPORTION = [
  { name: "Paper", token: "--paper", hex: "#F9F9F7", share: 70, use: "Backgrounds. Most of every screen.", edge: true },
  { name: "Ink", token: "--ink", hex: "#1D1B18", share: 18, use: "Type, the logo, primary buttons. Graphite and dusk count here." },
  { name: "Mist", token: "--mist", hex: "#EFEFEA", share: 8, use: "Fills, secondary buttons, rows." },
  { name: "Meadow", token: "--meadow", hex: "#6F7644", share: 4, use: "Progress, focus, the one accent." },
];

/** Every main colour, edge to edge, in the order they sit on a screen. */
const PALETTE = [...NEUTRALS, ...MEADOW.filter((m) => m.token !== "--meadow-ink")];

/**
 * What each colour is for, as the Tailwind classes you write. Product code
 * uses the semantic names (left); the brand names are for brand moments.
 */
const ROLES: { group: string; rows: { role: string; classes: string[]; token: string; is: string }[] }[] = [
  {
    group: "Surfaces",
    rows: [
      { role: "Page background", classes: ["bg-background"], token: "--background", is: "Paper" },
      { role: "Cards, popovers, inputs", classes: ["bg-card", "bg-popover"], token: "--card", is: "White" },
      { role: "Quiet fill: secondary buttons, chips, selected rows", classes: ["bg-secondary", "bg-muted"], token: "--secondary", is: "Mist" },
      { role: "Hover on paper", classes: ["bg-accent"], token: "--accent", is: "Paper hover" },
    ],
  },
  {
    group: "Text",
    rows: [
      { role: "Headings and main text", classes: ["text-foreground"], token: "--foreground", is: "Ink" },
      { role: "Body copy", classes: ["text-graphite"], token: "--graphite", is: "Graphite" },
      { role: "Captions, hints, placeholders", classes: ["text-muted-foreground"], token: "--muted-foreground", is: "Pebble" },
    ],
  },
  {
    group: "Actions",
    rows: [
      { role: "Primary button", classes: ["bg-primary", "text-primary-foreground"], token: "--primary", is: "Ink, paper text" },
      { role: "Secondary button", classes: ["bg-secondary", "text-secondary-foreground"], token: "--secondary", is: "Mist, ink text" },
      { role: "Progress, milestones, the one accent", classes: ["bg-meadow", "text-paper"], token: "--meadow", is: "Meadow" },
      { role: "Focus ring", classes: ["ring-ring"], token: "--ring", is: "Meadow" },
    ],
  },
  {
    group: "Lines",
    rows: [
      { role: "Dividers, card edges", classes: ["border-border"], token: "--border", is: "#E9E9E4" },
      { role: "Input outlines", classes: ["border-input"], token: "--input", is: "#DCDCD5" },
    ],
  },
  {
    group: "States",
    rows: [
      { role: "Message fill and its text", classes: ["bg-success-soft", "text-success-foreground"], token: "--success-soft", is: "Success soft, success ink" },
      { role: "Icon or solid badge", classes: ["bg-success", "text-white"], token: "--success", is: "Success" },
      { role: "Destructive button", classes: ["bg-destructive", "text-white"], token: "--destructive", is: "Danger" },
    ],
  },
];

function Strip({ items, tall }: { items: { name: string; hex: string; dark?: boolean }[]; tall?: boolean }) {
  return (
    <div className={`squircle grid grid-cols-2 overflow-hidden shadow-[0_0_0_1px_var(--hairline)] [--sq:var(--radius-2xl)] sm:grid-cols-3 ${items.length > 6 ? "md:grid-cols-11" : "md:grid-cols-6"}`}>
      {items.map((c) => (
        <div
          key={c.name}
          className={`flex flex-col justify-end gap-0.5 p-4 ${tall ? "h-40 md:h-64" : "h-28 md:h-32"}`}
          style={{ background: c.hex, color: c.dark ? "#F9F9F7" : "#1D1B18" }}
        >
          <span className="font-medium text-sm">{c.name}</span>
          <CopyHex hex={c.hex} className="opacity-80" />
        </div>
      ))}
    </div>
  );
}

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
    <figure className="squircle flex min-w-0 flex-col overflow-hidden bg-white shadow-warm">
      <div
        className={`flex items-end justify-between p-4 ${tall ? "h-40" : "h-28"} ${s.hex === "#F9F9F7" ? "border-border border-b" : ""}`}
        style={{ background: s.hex, color: on }}
      >
        <span className="font-heading font-light text-2xl tracking-[-0.03em]">Aa</span>
        <span className="font-medium text-[10px] tabular-nums opacity-80">{ratio.toFixed(1)}:1</span>
      </div>
      <figcaption className="flex flex-col gap-0.5 p-4">
        <span className="font-medium text-ink text-sm">{s.name}</span>
        <CopyHex hex={s.hex} className="text-graphite" />
        <code className="text-pebble text-[11px]">{s.token}</code>
        <span className="mt-1 text-graphite text-xs leading-relaxed">{s.use}</span>
      </figcaption>
    </figure>
  );
}

export default function ColorPage() {
  return (
    <>
      <PageHeader eyebrow="Colour" title="Paper, ink and a meadow.">
        One warm grey ramp from paper to ink, and one green. Pages are mostly paper and ink; meadow marks growth and
        progress. States are the only bright colours, so a warning or an error is seen at once.
      </PageHeader>

      <Section title="Palette" description="Every main colour side by side, light to dark, then meadow. State colours are under States, further down.">
        <Strip items={PALETTE} tall />
      </Section>

      <Section
        title="What goes where"
        description={
          <>
            Every colour has a job. In product code write the role, not the colour: <code>bg-background</code>, not{" "}
            <code>bg-paper</code>, so a retune happens in <code>globals.css</code> alone. Warning and danger follow the
            success pattern: <code>bg-warning-soft</code>, <code>text-danger-ink</code>.
          </>
        }
      >
        <div className="squircle flex flex-col overflow-hidden bg-white shadow-warm">
          {ROLES.map((g) => (
            <div key={g.group} className="border-border border-b last:border-b-0">
              <p className="eyebrow bg-paper/60 px-5 py-2.5 text-pebble">{g.group}</p>
              <ul>
                {g.rows.map((r) => (
                  <li
                    key={r.role}
                    className="grid gap-x-6 gap-y-2 border-border border-t px-5 py-3.5 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.2fr)_minmax(0,0.8fr)] md:items-center"
                  >
                    <span className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="size-6 shrink-0 rounded-md ring-1 ring-black/8 ring-inset"
                        style={{ background: `var(${r.token})` }}
                      />
                      <span className="text-ink text-sm">{r.role}</span>
                    </span>
                    <span className="flex flex-wrap gap-1.5 pl-9 md:pl-0">
                      {r.classes.map((c) => (
                        <code key={c} className="rounded-md bg-mist px-1.5 py-0.5 font-mono text-[12px] text-ink">
                          {c}
                        </code>
                      ))}
                    </span>
                    <span className="pl-9 text-pebble text-xs md:pl-0">{r.is}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Proportion" description="Roughly how much of a screen each family should take. If a page feels loud, there is too much of the last two.">
        <div className="squircle flex flex-col gap-4 bg-white p-4 shadow-warm sm:p-5">
          <div className="squircle flex h-16 gap-1 overflow-hidden [--sq:var(--radius-xl)]">
            {PROPORTION.map((p) => (
              <div
                key={p.name}
                className={p.edge ? "ring-1 ring-border ring-inset first:rounded-l-xl" : undefined}
                style={{ flexGrow: p.share, flexBasis: 0, background: `var(${p.token})` }}
              />
            ))}
          </div>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-4">
            {PROPORTION.map((p) => (
              <div key={p.name} className="flex items-start gap-2.5">
                <span
                  className="mt-0.5 size-3.5 shrink-0 rounded-[4px] ring-1 ring-border ring-inset"
                  style={{ background: `var(${p.token})` }}
                />
                <div className="flex min-w-0 flex-col">
                  <dt className="font-medium text-ink text-sm">
                    {p.name} <span className="font-normal text-pebble tabular-nums">{p.share}%</span>
                  </dt>
                  <dd className="text-graphite text-xs leading-relaxed">{p.use}</dd>
                  <dd>
                    <CopyHex hex={p.hex} className="text-pebble" />
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section title="Neutrals" description="One warm grey ramp. Ink is a warm black, never #000; paper is the background everywhere and cards sit on it in white. Use the step nearest to what you need rather than a new grey.">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-7">
          {NEUTRALS.map((s) => (
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

      <Section
        title="States"
        description={
          <>
            Success is a clear leaf green, warning amber, danger vermilion: brighter than the brand on purpose, so a state is read at a glance. Info is neutral: a note, not an alarm. Each state has three steps: a soft
            fill, a main colour for icons and solid buttons, and an ink colour for text. Messages are soft fills with no border. Use the tokens{" "}
            <code>bg-success/8</code>, <code>text-success-foreground</code> and so on; never raw Tailwind reds or ambers.
          </>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          {STATES.map((s) => (
            <article key={s.key} className="squircle flex flex-col gap-4 bg-white p-5 shadow-warm">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-light text-2xl text-ink tracking-[-0.03em]">{s.name}</h3>
                <span className="font-mono text-pebble text-[11px]">--{s.key}</span>
              </div>
              <div className="squircle grid grid-cols-3 overflow-hidden text-[11px] [--sq:var(--radius-xl)]">
                {[
                  ["soft", s.soft, s.ink],
                  ["main", s.main, "#FFFFFF"],
                  ["ink", s.ink, "#FFFFFF"],
                ].map(([label, bg, fg]) => (
                  <div key={label} className="flex h-20 flex-col justify-end p-3" style={{ background: bg, color: fg }}>
                    <span className="font-medium">{label}</span>
                    <CopyHex hex={bg} className="opacity-90" />
                  </div>
                ))}
              </div>
              <p className="squircle px-4 py-3.5 text-sm [--sq:var(--radius-xl)]" style={{ background: s.soft, color: s.ink }}>
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
