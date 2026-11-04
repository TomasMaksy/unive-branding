import { cn } from "cn";
import Image from "next/image";

/**
 * The landing hero's panorama: campus scene over a horizon that rises on
 * load, fading out at the sides into its own sky and ground. This is the
 * brand's signature image; reuse it, don't reinvent it.
 */
export function HeroArt({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none relative w-full overflow-hidden", className)}
      style={{ backgroundImage: "var(--scene-backdrop)" }}
    >
      <div className="absolute inset-0 z-10 flex justify-center">
        <Image
          src="/scenes/main_bg-2.webp"
          alt=""
          width={2880}
          height={864}
          sizes="100vw"
          priority={priority}
          className="mask-side-fade hidden h-full w-auto max-w-none object-contain object-bottom md:block md:translate-y-[40px]"
        />
        <Image
          src="/landing/mobile-full.webp"
          alt=""
          width={1200}
          height={942}
          sizes="100vw"
          priority={priority}
          className="mask-side-fade h-full w-auto max-w-none object-contain object-bottom md:hidden"
        />
      </div>
      <div className="horizon-parallax absolute inset-0 z-0">
        <div className="enter-horizon absolute inset-0 flex justify-center" data-enter="">
          <Image
            src="/scenes/horizon-2.webp"
            alt=""
            width={2880}
            height={864}
            sizes="100vw"
            className="mask-side-fade h-full w-auto max-w-none object-contain object-bottom md:translate-y-[40px]"
          />
        </div>
      </div>
      <div className="absolute inset-x-0 top-0 z-20 h-10 bg-linear-to-b from-paper to-transparent" />
    </div>
  );
}

const PRESS = [
  { src: "/brand/ap-1.webp", w: 1280, h: 1482, alt: "Associated Press", className: "scale-110" },
  { src: "/brand/business-insider-1.webp", w: 800, h: 276, alt: "Business Insider", className: "" },
  { src: "/brand/forbes-1.webp", w: 1635, h: 412, alt: "Forbes", className: "" },
  { src: "/brand/MSNBC-1.webp", w: 3796, h: 556, alt: "MSNBC", className: "scale-95" },
];
const BACKERS = [
  { src: "/brand/firstpick.webp", w: 828, h: 184, alt: "FirstPick", className: "scale-90" },
  { src: "/brand/google-for-startups.webp", w: 428, h: 61, alt: "Google for Startups", className: "" },
];
const logoClass = "h-full w-auto object-contain opacity-90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]";

/** The press band that sits over the bottom of the hero art. */
export function PressBand() {
  return (
    <div className="relative h-52 sm:h-56 md:h-64">
      <div aria-hidden className="absolute inset-0" style={{ backgroundImage: "var(--scrim-ink)" }} />
      <div className="absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-2 px-5 md:inset-x-auto md:bottom-10 md:left-12 md:items-start md:gap-2.5 md:px-0 lg:bottom-12 lg:left-16">
        <p className="eyebrow enter-label text-white/85 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]" data-enter="">
          Featured in
        </p>
        <ul aria-label="Featured in" className="enter-logos flex items-center gap-x-5 sm:gap-x-6 md:gap-x-7" data-enter="">
          {PRESS.map((l) => (
            <li key={l.alt} className="flex h-5 shrink-0 items-center">
              <Image src={l.src} alt={l.alt} width={l.w} height={l.h} sizes="140px" className={cn(logoClass, l.className)} />
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute right-12 bottom-10 z-20 hidden flex-col items-end gap-2.5 md:flex lg:right-16 lg:bottom-12">
        <p className="eyebrow enter-label text-white/85 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]" data-enter="">
          Backed by
        </p>
        <ul aria-label="Backed by" className="enter-logos flex items-center gap-x-10" data-enter="">
          {BACKERS.map((l) => (
            <li key={l.alt} className="flex h-7 shrink-0 items-center">
              <Image src={l.src} alt={l.alt} width={l.w} height={l.h} sizes="180px" className={cn(logoClass, l.className)} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
