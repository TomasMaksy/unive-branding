import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { PageHeader } from "@/components/book/section";
import { COMPONENTS } from "../registry";
import { DOCS } from "../docs";

export function generateStaticParams() {
  return COMPONENTS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = COMPONENTS.find((x) => x.slug === slug);
  return { title: c ? `${c.name} · Components` : "Components" };
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = COMPONENTS.findIndex((x) => x.slug === slug);
  const Doc = DOCS[slug];
  if (i < 0 || !Doc) notFound();
  const c = COMPONENTS[i];
  const prev = COMPONENTS[i - 1];
  const next = COMPONENTS[i + 1];
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-10 md:px-10">
        <Link href="/components?view=list" className="inline-flex items-center gap-1.5 text-graphite text-sm transition-colors hover:text-ink">
          <ArrowLeftIcon className="size-4" /> All components
        </Link>
      </div>
      <PageHeader eyebrow={c.group} title={c.name}>
        {c.summary}
      </PageHeader>
      <Doc />
      <nav className="mx-auto grid max-w-7xl gap-4 px-4 pb-8 sm:grid-cols-2 md:px-10" aria-label="More components">
        {prev ? (
          <Link href={`/components/${prev.slug}`} className="squircle flex flex-col gap-1 bg-white p-5 shadow-warm transition-shadow [--sq:var(--radius-2xl)] hover:shadow-warm-lg">
            <span className="flex items-center gap-1.5 text-pebble text-xs"><ArrowLeftIcon className="size-3.5" /> Previous</span>
            <span className="font-medium text-ink">{prev.name}</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/components/${next.slug}`} className="squircle flex flex-col items-end gap-1 bg-white p-5 text-right shadow-warm transition-shadow [--sq:var(--radius-2xl)] hover:shadow-warm-lg">
            <span className="flex items-center gap-1.5 text-pebble text-xs">Next <ArrowRightIcon className="size-3.5" /></span>
            <span className="font-medium text-ink">{next.name}</span>
          </Link>
        ) : null}
      </nav>
    </>
  );
}
