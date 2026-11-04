import { cn } from "cn";
import type React from "react";
import { slug } from "./pages";

export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="mx-auto max-w-7xl px-4 pt-14 pb-10 md:px-10 md:pt-20 md:pb-14">
      <p className="eyebrow text-meadow" data-enter="" style={{ ["--enter-y" as string]: "8px" }}>
        {eyebrow}
      </p>
      <h1 className="enter-title mt-4 max-w-4xl text-balance text-5xl text-display text-ink md:text-7xl" data-enter="">
        {title}
      </h1>
      {children ? (
        <div className="enter-subtitle mt-6 max-w-2xl text-pretty text-graphite text-base leading-relaxed md:text-lg" data-enter="">
          {children}
        </div>
      ) : null}
    </header>
  );
}

export function Section({
  id,
  title,
  description,
  children,
  className,
}: {
  id?: string;
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id ?? (title ? slug(title) : undefined)} className={cn("mx-auto max-w-7xl scroll-mt-20 lg:scroll-mt-8 px-4 py-12 md:px-10 md:py-16", className)}>
      <div className="mb-8 grid gap-3 border-border border-t pt-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-10">
        <h2 className="font-heading font-light text-3xl text-ink tracking-[-0.04em]">{title}</h2>
        {description ? <div className="max-w-2xl text-pretty text-graphite text-sm leading-relaxed md:text-base">{description}</div> : null}
      </div>
      {children}
    </section>
  );
}

/*
 * The book's type, everywhere: Averia Serif (light) for page and section
 * titles only; Inter for every line of running text, at two sizes (lede and
 * body); Inter 500 caps for eyebrows and labels.
 */

/** A labelled specimen tile. */
export function Specimen({
  label,
  note,
  children,
  className,
  tone = "white",
}: {
  label: string;
  note?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "white" | "paper" | "ink" | "meadow" | "dusk" | "none";
}) {
  const bg = {
    white: "bg-white",
    paper: "bg-paper ring-1 ring-border",
    ink: "bg-ink text-paper",
    meadow: "bg-meadow text-paper",
    dusk: "bg-dusk text-paper",
    none: "",
  }[tone];
  return (
    <figure className="flex min-w-0 flex-col gap-3">
      <div className={cn("squircle flex min-h-44 items-center justify-center overflow-hidden p-8 shadow-warm", bg, className)}>
        {children}
      </div>
      <figcaption className="flex flex-col gap-0.5 px-1">
        <span className="font-medium text-ink text-sm">{label}</span>
        {note ? <span className="text-pebble text-xs leading-relaxed">{note}</span> : null}
      </figcaption>
    </figure>
  );
}

export function DoDont({ kind, children, label }: { kind: "do" | "dont"; children: React.ReactNode; label: string }) {
  return (
    <figure className="flex min-w-0 flex-col gap-3">
      <div className="squircle relative flex min-h-40 items-center justify-center overflow-hidden bg-white p-6 shadow-warm">
        {children}
      </div>
      <figcaption className="flex items-start gap-2 px-1 text-sm">
        <span
          className={cn(
            "mt-0.5 inline-flex size-4.5 shrink-0 items-center justify-center rounded-full font-bold text-[10px] text-white",
            kind === "do" ? "bg-success" : "bg-danger",
          )}
          aria-hidden
        >
          {kind === "do" ? "✓" : "✕"}
        </span>
        <span className="text-graphite">
          <span className="sr-only">{kind === "do" ? "Do: " : "Don't: "}</span>
          {label}
        </span>
      </figcaption>
    </figure>
  );
}
