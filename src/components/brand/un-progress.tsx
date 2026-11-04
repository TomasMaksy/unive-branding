"use client";

import { cn } from "cn";
import { RIBBON_BOX, ribbonPath } from "@/lib/un-wave";
import { useLoop } from "./use-loop";

/**
 * Progress as handwriting: an "ununun" wave written left to right up to
 * `value` (0-100), flowing gently while it waits. Leave `value` undefined
 * for indeterminate: it writes, lifts off and writes again.
 */
export function UnProgress({
  value,
  periods = 4,
  className,
  label = "Progress",
}: {
  value?: number;
  periods?: number;
  className?: string;
  label?: string;
}) {
  const flow = useLoop(4000);
  const cycle = useLoop(2600, { paused: value !== undefined, still: 0.5 });
  const v =
    value !== undefined
      ? value / 100
      : cycle < 0.5
        ? 1 - (1 - cycle / 0.5) ** 3
        : 1;
  const tailFade = value === undefined && cycle >= 0.5 ? 1 - (cycle - 0.5) / 0.5 : 1;
  const B = RIBBON_BOX(periods);
  return (
    <svg
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      viewBox={`${B.x} ${B.y} ${B.width} ${B.height}`}
      preserveAspectRatio="xMinYMid meet"
      className={cn("block h-auto w-full fill-current", className)}
    >
      <path className="opacity-15" d={ribbonPath(1, flow, periods)} />
      <path style={{ opacity: tailFade }} d={ribbonPath(v, flow, periods)} />
    </svg>
  );
}
