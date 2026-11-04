"use client";

import { cn } from "cn";
import { CheckIcon, CodeIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { slug } from "@/components/book/pages";

/**
 * Building blocks for a component's page: every example is the live
 * component with the code that makes it underneath, one click away.
 */

export function DocSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={slug(title)} className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-16 md:px-10">
      <div className="mb-6 flex max-w-2xl flex-col gap-2">
        <h2 className="font-heading font-light text-3xl text-ink tracking-[-0.03em]">{title}</h2>
        {description ? <p className="text-pretty text-graphite text-[15px] leading-relaxed">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative">
      <pre className="squircle overflow-x-auto bg-ink p-5 pe-14 font-mono text-[12.5px] text-paper/85 leading-relaxed [--sq:var(--radius-xl)]">
        <code>{code.trim()}</code>
      </pre>
      <button
        type="button"
        aria-label="Copy code"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(code.trim());
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          } catch {
            // Clipboard blocked: the code can still be selected.
          }
        }}
        className="absolute top-3 right-3 grid size-8 cursor-copy place-items-center rounded-full text-paper/60 transition-colors hover:bg-white/10 hover:text-paper"
      >
        {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
      </button>
    </div>
  );
}

/** A live example on a white tile, its name and note, and its code on demand. */
export function Example({
  title,
  note,
  code,
  tone = "white",
  className,
  stageClassName,
  children,
}: {
  title: string;
  note?: React.ReactNode;
  code?: string;
  tone?: "white" | "paper" | "ink" | "photo";
  className?: string;
  stageClassName?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <figure className={cn("flex min-w-0 flex-col gap-3", className)}>
      <div
        className={cn(
          "squircle flex min-h-44 flex-wrap items-center justify-center gap-3 p-8 [--sq:28px]",
          tone === "white" && "bg-white shadow-warm",
          tone === "paper" && "bg-paper shadow-[inset_0_0_0_1px_var(--hairline)]",
          tone === "ink" && "bg-ink text-paper",
          stageClassName,
        )}
      >
        {children}
      </div>
      <figcaption className="flex items-start justify-between gap-4 px-1">
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="font-medium text-ink text-sm">{title}</span>
          {note ? <span className="text-pebble text-xs leading-relaxed">{note}</span> : null}
        </div>
        {code ? (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className={cn(
              "inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full px-3 font-medium text-xs transition-colors",
              open ? "bg-ink text-paper" : "bg-mist text-graphite hover:bg-mist-hover hover:text-ink",
            )}
          >
            <CodeIcon className="size-3.5" /> Code
          </button>
        ) : null}
      </figcaption>
      {code && open ? <CodeBlock code={code} /> : null}
    </figure>
  );
}

export function Grid({ cols = 2, children }: { cols?: 1 | 2 | 3; children: React.ReactNode }) {
  return (
    <div className={cn("grid gap-x-4 gap-y-8", cols === 2 && "md:grid-cols-2", cols === 3 && "md:grid-cols-2 lg:grid-cols-3")}>
      {children}
    </div>
  );
}

export type PropRow = [name: string, type: string, fallback: string, what: string];

/** The props worth knowing, not every prop Base UI accepts. */
export function Props({ rows, note }: { rows: PropRow[]; note?: React.ReactNode }) {
  return (
    <div className="squircle overflow-x-auto bg-white shadow-warm [--sq:28px]">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="text-pebble text-xs">
          <tr className="border-(--hairline) border-b">
            <th className="px-6 py-3 font-medium">Prop</th>
            <th className="px-6 py-3 font-medium">Type</th>
            <th className="px-6 py-3 font-medium">Default</th>
            <th className="px-6 py-3 font-medium">What it does</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([n, t, d, w]) => (
            <tr key={n} className="border-(--hairline) border-b align-top last:border-0">
              <td className="px-6 py-3 font-mono text-[12.5px] text-ink">{n}</td>
              <td className="px-6 py-3 font-mono text-[12.5px] text-graphite">{t}</td>
              <td className="px-6 py-3 font-mono text-[12.5px] text-pebble">{d}</td>
              <td className="px-6 py-3 text-graphite">{w}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {note ? <p className="border-(--hairline) border-t px-6 py-3 text-pebble text-xs">{note}</p> : null}
    </div>
  );
}

/** How to bring it in. */
export function Usage({ code }: { code: string }) {
  return <CodeBlock code={code} />;
}
