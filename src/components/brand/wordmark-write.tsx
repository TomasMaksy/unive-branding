"use client";

import { cn } from "cn";
import { DISC_STEP } from "@/lib/un-wave";
import { type WordmarkText, wordmarkBox, wordmarkDuration, wordmarkWritePath } from "@/lib/wordmark-write";
import { useLoop } from "./use-loop";

/**
 * A pen writes the wordmark, then lifts it off from the start. For
 * creation moments that have the room: onboarding, building a plan.
 * With reduced motion it shows the whole lockup.
 */
export function WordmarkWrite({
  text = "unive",
  height = 80,
  className,
  label = "Loading",
}: {
  text?: WordmarkText;
  /** Rendered height in px; width follows the lockup. */
  height?: number;
  className?: string;
  label?: string;
}) {
  const phase = useLoop(wordmarkDuration(text), { still: 0.68 });
  const B = wordmarkBox(text);
  const step = DISC_STEP(height / B.height);
  return (
    <svg
      role="status"
      aria-label={label}
      viewBox={`${B.x} ${B.y} ${B.width} ${B.height}`}
      height={height}
      width={(height * B.width) / B.height}
      className={cn("inline-block max-w-full shrink-0 fill-current", className)}
    >
      <path d={wordmarkWritePath(phase, text, step)} />
    </svg>
  );
}
