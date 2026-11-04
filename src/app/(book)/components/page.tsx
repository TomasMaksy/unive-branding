import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { PageHeader, Section } from "@/components/book/section";
import { Button } from "@/components/ui/button";
import { Preview } from "./previews";
import { Buttons, Cards, Feedback, Fields, Overlays } from "./showcase";
import { COMPONENTS, GROUP_ORDER } from "./registry";

export const metadata: Metadata = { title: "Components" };

/**
 * Opens on the board: every component together, live, the way they meet in
 * the app. One button under the title switches to the structured list,
 * where each component links to its own page.
 */
export default async function ComponentsPage({ searchParams }: { searchParams: Promise<{ view?: string }> }) {
  const list = (await searchParams).view === "list";
  return (
    <>
      <PageHeader eyebrow="Components" title="Quiet tools on warm paper.">
        The same Base UI primitives the app uses, in <code className="text-ink">src/components/ui</code>, restyled with the
        brand tokens. {list ? "Open one for its variants, layouts, real examples and the code to copy." : "Here they all are together; each also has a page of its own."}
        <span className="mt-6 flex">
          {list ? (
            <Button variant="secondary" render={<Link href="/components" scroll={false} />}>
              <ArrowLeftIcon /> See them all together
            </Button>
          ) : (
            <Button variant="secondary" render={<Link href="/components?view=list" scroll={false} />}>
              Browse one by one <ArrowRightIcon />
            </Button>
          )}
        </span>
      </PageHeader>
      {list ? (
        <div className="mx-auto max-w-7xl px-4 pb-24 md:px-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {GROUP_ORDER.flatMap((group) => COMPONENTS.filter((c) => c.group === group)).map((c) => (
            <Link
              key={c.slug}
              href={`/components/${c.slug}`}
              className="group squircle flex flex-col overflow-hidden bg-white shadow-warm transition-shadow duration-200 [--sq:28px] hover:shadow-warm-lg focus-visible:outline-2 focus-visible:outline-meadow focus-visible:outline-offset-2"
            >
              <div inert aria-hidden className="flex h-40 items-center justify-center overflow-hidden bg-paper p-6">
                <div className="transition-[scale] duration-500 ease-unive group-hover:scale-[1.04]">
                  <Preview slug={c.slug} />
                </div>
              </div>
              <div className="flex flex-col gap-1 p-5">
                <span className="eyebrow text-pebble">{c.group}</span>
                <span className="mt-1 font-medium text-ink">{c.name}</span>
                <span className="text-pretty text-graphite text-sm leading-relaxed">{c.summary}</span>
              </div>
            </Link>
          ))}
        </div>
        </div>
      ) : (
        <>
          <Section title="Buttons" description="Capsules, as on iOS: fully round ends at every size, a soft press that springs back, and the flowing “un” as the loading state. Brand buttons sell; app buttons work.">
            <Buttons />
          </Section>
          <Section title="Fields and choices" description="Filled capsules, 40 px tall. An error rings the field in the same red as the delete button and says what to fix underneath.">
            <Fields />
          </Section>
          <Section title="Feedback" description="Every state uses the warm semantic tokens: success, warning, danger, info.">
            <Feedback />
          </Section>
          <Section title="Navigation and overlays">
            <Overlays />
          </Section>
          <Section title="Cards" description="White on paper by default. Mist or meadow-soft for moments that matter; no gradients, only the scrim on photos.">
            <Cards />
          </Section>
        </>
      )}
    </>
  );
}
