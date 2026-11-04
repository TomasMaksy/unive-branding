import {
  ArrowRightIcon,
  CalendarIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  DownloadIcon,
  FileTextIcon,
  SearchIcon,
  StarIcon,
  Trash2Icon,
  TriangleAlertIcon,
} from "lucide-react";
import type { Metadata } from "next";
import { UnLoader } from "@/components/brand/un-loader";
import { PageHeader, Section } from "@/components/book/section";
import { Button } from "@/components/ui/button";
import { IconSet } from "./icon-set";

export const metadata: Metadata = { title: "Icons" };

const SIZES = [
  { px: 14, cls: "size-3.5", where: "xs buttons, badges, small print" },
  { px: 16, cls: "size-4", where: "Buttons, menu rows, fields" },
  { px: 18, cls: "size-[18px]", where: "The sidebar" },
  { px: 20, cls: "size-5", where: "Toasts, xl buttons, tiles" },
  { px: 24, cls: "size-6", where: "Empty states, feature lists" },
];

function Panel({ title, children, note }: { title: string; children: React.ReactNode; note: React.ReactNode }) {
  return (
    <figure className="flex min-w-0 flex-col gap-3">
      <div className="squircle flex min-h-40 flex-wrap items-center justify-center gap-4 bg-white p-8 shadow-warm [--sq:28px]">{children}</div>
      <figcaption className="flex flex-col gap-0.5 px-1">
        <span className="font-medium text-ink text-sm">{title}</span>
        <span className="text-pebble text-xs leading-relaxed">{note}</span>
      </figcaption>
    </figure>
  );
}

export default function IconsPage() {
  return (
    <>
      <PageHeader eyebrow="Icons" title="Lucide, drawn quietly.">
        Every icon in the product and this book is from{" "}
        <a href="https://lucide.dev" className="text-ink underline decoration-(--hairline-strong) underline-offset-4 hover:decoration-ink">
          Lucide
        </a>
        , through <code className="text-ink">lucide-react</code>: open outlines, a 2 px stroke with round ends, on a
        24 px grid. They match Inter’s weight and the round ends of our capsules, so we use them as they come. The one
        exception is the “un”: the logo and the loader are ours, never an icon.
      </PageHeader>

      <Section title="Sizes" description="Icons follow the text beside them. Components size their own icons; set a size only on an icon that stands alone.">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {SIZES.map((s) => (
            <div key={s.px} className="squircle flex flex-col gap-6 bg-white p-5 shadow-warm [--sq:var(--radius-2xl)]">
              <span className="flex h-8 items-end text-ink">
                <CalendarIcon className={s.cls} aria-hidden />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="font-medium text-ink text-sm tabular-nums">{s.px} px</span>
                <span className="text-pebble text-xs leading-relaxed">{s.where}</span>
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Colour" description="An icon takes the colour of its text. It steps back to pebble when the words carry the meaning, and only state colours ever tint it.">
        <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          <Panel title="Ink, with its label" note="Buttons and links: the icon is part of the words.">
            <Button variant="outline">
              <DownloadIcon /> Download PDF
            </Button>
          </Panel>
          <Panel title="Pebble, beside text" note="Menu rows, field icons, metadata: the words lead.">
            <span className="flex flex-col gap-2.5 text-[15px] text-ink">
              <span className="flex items-center gap-2.5">
                <FileTextIcon className="size-4 text-pebble" aria-hidden /> Duplicate
              </span>
              <span className="flex items-center gap-2.5">
                <SearchIcon className="size-4 text-pebble" aria-hidden /> Search
              </span>
            </span>
          </Panel>
          <Panel title="State colours" note="Only for success, warning and danger, never for decoration.">
            <CircleCheckIcon className="size-5 text-success" aria-hidden />
            <TriangleAlertIcon className="size-5 text-warning" aria-hidden />
            <Trash2Icon className="size-5 text-danger" aria-hidden />
          </Panel>
          <Panel title="Meadow when on" note="A toggle that is on: the favourite star.">
            <StarIcon className="size-5 text-ink" aria-hidden />
            <ArrowRightIcon className="size-4 text-pebble" aria-hidden />
            <StarIcon className="size-5 fill-meadow text-meadow" aria-hidden />
          </Panel>
        </div>
      </Section>

      <Section title="Outline, filled twice" description="Icons stay outlines. They fill in exactly two places, both to say “this is on” or “this is how it went”.">
        <div className="grid gap-x-4 gap-y-8 md:grid-cols-3">
          <Panel title="A toggle that is on" note="The outline fills with its own colour: fill-meadow text-meadow.">
            <StarIcon className="size-6 text-ink" aria-hidden />
            <StarIcon className="size-6 fill-meadow text-meadow" aria-hidden />
          </Panel>
          <Panel title="State discs" note="Toasts: the circle fills with the state, the mark turns white. fill-success text-white.">
            <CircleCheckIcon className="size-6 fill-success text-white" aria-hidden />
            <TriangleAlertIcon className="size-6 fill-warning text-white" aria-hidden />
            <CircleAlertIcon className="size-6 fill-danger text-white" aria-hidden />
          </Panel>
          <Panel title="Loading is the “un”" note="Never a spinning icon. The Spinner in ui/ is Lucide’s, for third-party embeds only.">
            <UnLoader size={36} className="text-ink" />
          </Panel>
        </div>
      </Section>

      <Section title="The set" description="The icons we reach for, by job. Use the same icon for the same job everywhere. Click one to copy its component name.">
        <IconSet />
      </Section>

      <Section title="Rules">
        <ul className="grid gap-3 md:grid-cols-2">
          {[
            ["Before the thing, after the direction", "Download PDF puts the icon first; Continue puts the arrow last."],
            ["An icon alone needs a name", "Icon-only buttons get an aria-label and a tooltip. Icons beside words are aria-hidden."],
            ["One meaning per icon", "Trash2 always deletes, Archive always archives. Don’t borrow an icon for a near meaning."],
            ["No mixing sets", "Only Lucide, at its own stroke. Need something it lacks? Draw it on the 24 px grid with a 2 px round stroke."],
          ].map(([t, d]) => (
            <li key={t} className="squircle flex flex-col gap-1 bg-white p-5 shadow-warm [--sq:var(--radius-2xl)]">
              <span className="font-medium text-ink text-sm">{t}</span>
              <span className="text-graphite text-sm leading-relaxed">{d}</span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
