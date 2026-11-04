import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/book/section";

export const metadata: Metadata = { title: "Type" };

const SCALE = [
  { name: "Display", spec: "Averia 300 · 72/1.02 · −0.05em", cls: "font-heading font-light text-7xl leading-[1.02] tracking-[-0.05em]", text: "Your path, drawn" },
  { name: "Heading 1", spec: "Averia 400 · 60/1.05 · −0.05em", cls: "font-heading text-6xl leading-[1.05] tracking-[-0.05em]", text: "A better college" },
  { name: "Heading 2", spec: "Averia 300 · 48/1.05 · −0.04em", cls: "font-heading font-light text-5xl leading-[1.05] tracking-[-0.04em]", text: "Plan every deadline" },
  { name: "Heading 3", spec: "Averia 300 · 36/1.1 · −0.04em", cls: "font-heading font-light text-4xl leading-[1.1] tracking-[-0.04em]", text: "Essays that sound like you" },
  { name: "Title", spec: "Averia 300 · 24/1.2 · −0.03em", cls: "font-heading font-light text-2xl leading-[1.2] tracking-[-0.03em]", text: "Nearest deadlines" },
  { name: "Lead", spec: "Averia 300 · 20/1.6", cls: "font-heading font-light text-xl leading-relaxed text-graphite", text: "We plan every deadline, essay and scholarship with your family." },
  { name: "Body", spec: "Inter 400 · 16/1.6", cls: "text-base leading-relaxed text-graphite", text: "We read every draft and leave notes in the margin, the way a mentor would." },
  { name: "Small", spec: "Inter 400 · 14/1.5", cls: "text-sm text-graphite", text: "Due Friday, 1 November · Common App" },
  { name: "Label", spec: "Inter 500 · 14/1.2", cls: "font-medium text-sm text-ink", text: "Save and continue" },
  { name: "Caption", spec: "Inter 400 · 12/1.4", cls: "text-xs text-pebble", text: "Last edited 3 minutes ago" },
  { name: "Eyebrow", spec: "Inter 500 · 11 · caps · +0.14em", cls: "eyebrow text-pebble", text: "Featured in" },
];

export default function TypePage() {
  return (
    <>
      <PageHeader eyebrow="Type" title="A serif with a soft hand.">
        Averia Serif Libre is an average of hundreds of fonts, so its edges come out slightly blurred, like ink on paper. It
        carries our voice. Inter does the interface work.
      </PageHeader>

      <Section title="Families">
        <div className="grid gap-4 md:grid-cols-2">
          <article className="flex flex-col justify-between gap-10 rounded-[28px] bg-white p-8 shadow-warm">
            <div className="flex items-baseline justify-between">
              <span className="eyebrow text-meadow">Voice</span>
              <span className="text-pebble text-xs">Google Fonts · OFL</span>
            </div>
            <p className="font-heading font-light text-[9rem] text-ink leading-none tracking-[-0.06em]">Aa</p>
            <div className="flex flex-col gap-2">
              <h3 className="font-heading font-light text-3xl text-ink tracking-[-0.04em]">Averia Serif Libre</h3>
              <p className="text-graphite text-sm">
                Headings, leads, quotes and numbers that matter. Light 300 for anything above 24 px; Regular 400 for heavy
                moments; Bold 700 sparingly.
              </p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-heading text-ink text-xl">
                <span className="font-light">Light</span>
                <span>Regular</span>
                <span className="italic">Italic</span>
                <span className="font-bold">Bold</span>
              </div>
            </div>
          </article>
          <article className="flex flex-col justify-between gap-10 rounded-[28px] bg-ink p-8 text-paper shadow-warm">
            <div className="flex items-baseline justify-between">
              <span className="eyebrow text-meadow-soft">Interface</span>
              <span className="text-paper/60 text-xs">Google Fonts · OFL</span>
            </div>
            <p className="font-sans text-[9rem] leading-none tracking-[-0.04em]">Aa</p>
            <div className="flex flex-col gap-2">
              <h3 className="font-heading font-light text-3xl tracking-[-0.04em]">Inter</h3>
              <p className="text-paper/70 text-sm">
                Buttons, labels, forms, tables, body text in the app. Regular 400 and Medium 500; Semibold only for tiny
                counts.
              </p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xl">
                <span>Regular</span>
                <span className="font-medium">Medium</span>
                <span className="font-semibold">Semibold</span>
                <span className="tabular-nums">0123456789</span>
              </div>
            </div>
          </article>
        </div>
      </Section>

      <Section title="Scale" description="Tighten Averia as it grows: −0.03em at title size, −0.05em at display size. Inter stays at its default tracking.">
        <div className="overflow-hidden rounded-[28px] bg-white shadow-warm">
          {SCALE.map((s) => (
            <div key={s.name} className="grid gap-2 border-border/70 border-b px-6 py-6 last:border-0 md:grid-cols-[180px_1fr] md:items-baseline md:gap-8 md:px-8">
              <div className="flex flex-col">
                <span className="font-medium text-ink text-sm">{s.name}</span>
                <span className="text-pebble text-[11px]">{s.spec}</span>
              </div>
              <p className={`${s.cls} min-w-0 text-ink`}>{s.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Together" description="Serif to speak, sans to act. A card title in Averia, its details and actions in Inter.">
        <div className="grid gap-4 md:grid-cols-2">
          <article className="flex flex-col gap-4 rounded-[28px] bg-white p-8 shadow-warm">
            <span className="eyebrow text-pebble">This week</span>
            <h3 className="font-heading font-light text-4xl text-ink leading-[1.1] tracking-[-0.04em]">
              Finish your “Why Yale” essay
            </h3>
            <p className="text-graphite text-sm leading-relaxed">
              You have a strong opening. Two paragraphs need a specific example from your robotics club; we left notes.
            </p>
            <p className="font-medium text-ink text-sm">Due Friday · 640 of 650 words</p>
          </article>
          <blockquote className="flex flex-col justify-between gap-8 rounded-[28px] bg-mist p-8">
            <p className="font-heading font-light text-3xl text-ink italic leading-snug tracking-[-0.03em]">
              “It felt like someone who knew the way was walking next to us.”
            </p>
            <footer className="text-graphite text-sm">Sample quote, for layout only</footer>
          </blockquote>
        </div>
      </Section>
    </>
  );
}
