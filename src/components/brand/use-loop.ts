"use client";

import { useEffect, useState } from "react";

/** Phase 0..1 that loops every `duration` ms. Holds at `still` when the
 *  viewer prefers reduced motion, or while `paused`. */
export function useLoop(duration: number, { paused = false, still = 0 } = {}) {
  const [phase, setPhase] = useState(still);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (paused || reduce.matches) {
      setPhase(still);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const tick = (now: number) => {
      start ??= now - still * duration;
      setPhase(((now - start) % duration) / duration);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, paused, still]);
  return phase;
}
