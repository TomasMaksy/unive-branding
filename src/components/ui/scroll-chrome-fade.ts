import { cn } from "cn";

export const SCROLL_CHROME_FADE_THRESHOLD = 8;

export const SCROLL_CHROME_TOP_FADE_CLASS =
  "pointer-events-none -mb-14 h-14 bg-linear-to-b from-white to-white/0 transition-opacity duration-200 lg:-mb-16 lg:h-16";

export const SCROLL_CHROME_BOTTOM_FADE_CLASS =
  "pointer-events-none absolute inset-x-0 bottom-0 z-20 h-14 bg-linear-to-t from-white to-white/0 transition-opacity duration-200 lg:h-16";

export function scrollChromeFadeVisibleClass(visible: boolean) {
  return visible ? "opacity-100" : "opacity-0";
}

/** Observe the scroller and its children so fade state tracks content size changes. */
export function observeScrollChrome(
  scrollEl: HTMLElement,
  onUpdate: () => void,
): () => void {
  const observer = new ResizeObserver(onUpdate);
  observer.observe(scrollEl);
  for (const child of scrollEl.children) {
    observer.observe(child);
  }
  return () => observer.disconnect();
}

export function scrollChromeTopFadeClass(visible: boolean) {
  return cn(
    SCROLL_CHROME_TOP_FADE_CLASS,
    scrollChromeFadeVisibleClass(visible),
  );
}

export function scrollChromeBottomFadeClass(visible: boolean) {
  return cn(
    SCROLL_CHROME_BOTTOM_FADE_CLASS,
    scrollChromeFadeVisibleClass(visible),
  );
}
