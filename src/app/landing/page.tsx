import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroArt, PressBand } from "@/components/brand/hero-art";
import { AppIcon, Mark, Wordmark } from "@/components/brand/logo";
import { UnLoader } from "@/components/brand/un-loader";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Landing preview" };

/**
 * The unive.ai hero, rebuilt with the new logo. Copy, art, spacing and
 * motion are the live landing page's; only the logo changes.
 */
export default function LandingPreview() {
  return (
    <div className="min-h-dvh bg-paper">
      <div className="fixed bottom-4 left-1/2 z-[120] -translate-x-1/2 md:top-3 md:bottom-auto">
        <Link
          href="/logo"
          className="inline-flex items-center gap-2 rounded-full bg-ink/85 px-3 py-1.5 text-paper text-xs shadow-warm backdrop-blur"
        >
          ← Brand book · landing preview
        </Link>
      </div>

      <header className="fixed inset-x-0 top-0 z-[110] h-16 bg-paper/95 md:h-20">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-6 md:h-20 md:px-10">
          <a href="#top" aria-label="Unive home" className="text-ink">
            <Wordmark title="" className="w-16 md:w-[68px]" />
          </a>
          <div className="ml-auto flex items-center gap-4">
            <a href="#top" className="text-graphite text-sm hover:text-ink">
              Login
            </a>
            <Button variant="brand" className="min-h-10 px-4 text-sm sm:text-sm">
              Buy now
            </Button>
          </div>
        </div>
      </header>

      <section id="top" aria-label="Welcome preview" className="relative flex min-h-dvh w-full flex-col bg-paper pt-16 md:pt-20">
        <div className="relative z-30 mx-auto -mb-6 flex w-full max-w-3xl shrink-0 flex-col items-center px-6 pt-3 text-center md:-mb-8 md:px-10 md:pt-5 lg:max-w-4xl">
          <div className="enter-pill mb-5 md:mb-6" data-enter="">
            <span className="inline-flex items-center gap-2">
              <Image src="/landing/yale.webp" alt="Yale University" width={28} height={28} className="size-6 object-contain sm:size-7" />
              <span className="whitespace-nowrap font-medium text-neutral-800 text-xs leading-none sm:text-sm">
                Built by Yale graduates
              </span>
            </span>
          </div>
          <h1
            className="enter-title text-balance font-heading font-medium text-[8vw] text-ink leading-[1.05] tracking-[-0.03em] md:text-5xl md:tracking-[-0.05em] lg:text-6xl"
            data-enter=""
          >
            Get your child into a better college, with more
            <br /> scholarship money
          </h1>
          <div className="enter-cta -mt-4 sm:mt-0" data-enter="">
            <Button variant="brand" className="mt-8 h-12 min-h-12 px-8 text-base sm:text-base">
              Buy now
            </Button>
          </div>
        </div>

        <HeroArt priority className="mt-auto h-[55vh] min-h-[18rem] shrink-0 md:h-[65vh] md:min-h-[24rem]" />

        <div className="pointer-events-none absolute inset-0 z-20">
          <div className="sticky top-0 flex h-dvh flex-col justify-end">
            <PressBand />
          </div>
        </div>
      </section>

      {/* Below the fold: the logo in the places it will live. */}
      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-20 md:grid-cols-3 md:px-10">
        <div className="flex flex-col gap-4 rounded-[28px] bg-white p-8 shadow-warm">
          <p className="eyebrow text-pebble">Browser tab</p>
          <div className="flex items-center gap-2 rounded-t-xl border border-border border-b-0 bg-paper px-3 py-2">
            <AppIcon rounded="favicon" tone="meadow" className="size-4" title="" />
            <span className="truncate text-ink text-xs">Unive · College admissions</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-[28px] bg-white p-8 shadow-warm">
          <p className="eyebrow text-pebble">Loading a plan</p>
          <div className="flex items-center gap-3 text-ink">
            <UnLoader size={28} />
            <span className="font-heading font-light text-graphite text-lg">Building your roadmap…</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-[28px] bg-white p-8 shadow-warm">
          <p className="eyebrow text-pebble">Home screen</p>
          <div className="flex gap-4">
            <AppIcon className="size-14 drop-shadow-sm" />
            <AppIcon tone="meadow" className="size-14 drop-shadow-sm" />
          </div>
        </div>
      </section>

      <footer className="bg-ink text-paper">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 md:flex-row md:items-end md:justify-between md:px-10">
          <Wordmark className="w-44 text-paper" />
          <div className="flex items-center gap-3 text-paper/60 text-sm">
            <Mark title="" className="w-7 text-paper/60" />© Unive
          </div>
        </div>
      </footer>
    </div>
  );
}
