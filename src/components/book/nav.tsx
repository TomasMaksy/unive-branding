"use client";

import { cn } from "cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PAGES } from "./pages";


export function BookNav() {
  const path = usePathname();
  return (
    <nav aria-label="Brand book" className="-mx-1 flex min-w-0 items-center gap-0.5 overflow-x-auto px-1 [scrollbar-width:none]">
      {PAGES.map((p) => {
        const active = p.href === "/" ? path === "/" : path.startsWith(p.href);
        return (
          <Link
            key={p.href}
            href={p.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-sm transition-colors duration-150",
              active ? "bg-ink text-paper" : "text-graphite hover:bg-paper-hover hover:text-ink",
            )}
          >
            {p.label}
          </Link>
        );
      })}
    </nav>
  );
}
