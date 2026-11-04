import Link from "next/link";
import { Mark, Wordmark } from "@/components/brand/logo";
import { BookNav } from "@/components/book/nav";
import { PAGES } from "@/components/book/pages";

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-50 border-border/70 border-b bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:gap-8 md:px-10">
          <Link href="/" className="shrink-0 text-ink" aria-label="Unive brand book, home">
            <Wordmark title="" className="w-[78px]" />
          </Link>
          <BookNav />
          <Link
            href="/landing"
            className="ml-auto hidden shrink-0 rounded-lg px-2.5 py-1.5 text-graphite text-sm hover:bg-paper-hover hover:text-ink md:block"
          >
            Landing preview ↗
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="mt-24 bg-dusk text-paper">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1fr_auto] md:px-10">
          <div className="flex flex-col gap-5">
            <Wordmark title="Unive" className="w-40 text-paper" />
            <p className="max-w-sm text-paper/70 text-sm leading-relaxed">
              One source for the Unive brand. Tokens live in <code className="text-paper">globals.css</code>, the logo in{" "}
              <code className="text-paper">public/logo</code>, components in <code className="text-paper">components/ui</code>.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
            {PAGES.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="text-paper/70 hover:text-paper">
                  {p.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/landing" className="text-paper/70 hover:text-paper">
                Landing preview
              </Link>
            </li>
          </ul>
          <Mark title="" className="w-10 text-paper/40" />
        </div>
      </footer>
    </div>
  );
}
