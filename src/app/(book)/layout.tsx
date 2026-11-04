import Link from "next/link";
import { Mark, Wordmark } from "@/components/brand/logo";
import { GROUPS } from "@/components/book/pages";

/** Things to take away, beside the book's own sections. */
const FILES = [
  { href: "/landing", label: "Landing preview" },
  { href: "/logo/wordmark-ink.svg", label: "Wordmark SVG" },
  { href: "/logo/app-icon-ink.svg", label: "App icon SVG" },
  { href: "/loaders/un-flow.svg", label: "Loader SVG" },
];
import { Sidebar } from "@/components/book/sidebar";

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh">
      <Sidebar />
      <div className="flex min-h-dvh flex-col transition-[padding] duration-300 ease-unive lg:pl-64 collapsed:pl-18">
        <main className="flex-1">{children}</main>
        {/* Ink, the brand's dark: the wordmark and a note, then the book's
            sections as columns, then a quiet bottom line. */}
        <footer className="mt-24 bg-ink text-paper">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-16 pb-12 md:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))] md:px-10">
            <div className="flex flex-col gap-5">
              <Wordmark title="Unive" className="w-32 text-paper" />
              <p className="max-w-xs text-pretty text-paper/65 text-sm leading-relaxed">
                One source for the Unive brand: tokens, logo, type and components.
              </p>
            </div>
            {[...GROUPS, { label: "Files", pages: FILES }].map((g) => (
              <nav key={g.label} aria-label={g.label} className="flex flex-col gap-4">
                <p className="eyebrow text-paper/45">{g.label}</p>
                <ul className="flex flex-col gap-2.5 text-sm">
                  {g.pages.map((p) => (
                    <li key={p.href}>
                      <Link href={p.href} className="text-paper/85 transition-colors hover:text-white">
                        {p.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
          <div className="mx-auto max-w-7xl px-4 md:px-10">
            <div className="flex flex-col gap-3 border-white/10 border-t py-6 text-paper/45 text-xs sm:flex-row sm:items-center sm:justify-between">
              <span className="flex items-center gap-2.5">
                <Mark title="" className="w-5 text-paper/45" />© Unive 2026
              </span>
              <span>
                Tokens in <code className="text-paper/85">globals.css</code> · components in{" "}
                <code className="text-paper/85">components/ui</code>
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
