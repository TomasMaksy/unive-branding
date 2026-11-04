"use client";

import { cn } from "cn";
import type React from "react";
import { flowPath, UN_VIEWBOX, writePath } from "@/lib/un-wave";
import { useLoop } from "./use-loop";

export type UnLoaderProps = {
  /** flow: the "un" travels along itself like a wave. write: a pen writes it, then lifts it off. */
  variant?: "flow" | "write";
  /** Rendered height in px. Width follows the shape (about 1.5x). */
  size?: number;
  /** ms per loop. Defaults: flow 2400, write 2800. */
  duration?: number;
  paused?: boolean;
  className?: string;
  label?: string;
};

/**
 * The Unive loader. Colour follows `currentColor`, so `text-meadow` etc.
 * With reduced motion it shows the still icon.
 */
export function UnLoader({
  variant = "flow",
  size = 32,
  duration,
  paused,
  className,
  label = "Loading",
}: UnLoaderProps) {
  const ms = duration ?? (variant === "flow" ? 2400 : 2800);
  const phase = useLoop(ms, { paused, still: variant === "write" ? 0.5 : 0 });
  const B = UN_VIEWBOX;
  let body: React.ReactNode;
  if (variant === "flow") {
    const f = flowPath(phase);
    body = <path transform={`translate(${f.dx.toFixed(2)} ${f.dy.toFixed(2)})`} d={f.d} />;
  } else {
    body = <path d={writePath(phase)} />;
  }
  return (
    <svg
      role="status"
      aria-label={label}
      viewBox={`${B.x} ${B.y} ${B.width} ${B.height}`}
      height={size}
      width={(size * B.width) / B.height}
      className={cn("inline-block shrink-0 fill-current", className)}
    >
      {body}
    </svg>
  );
}
