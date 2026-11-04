"use client";

import { useState } from "react";
import { UnProgress } from "@/components/brand/un-progress";

export function ProgressDemo() {
  const [value, setValue] = useState(62);
  return (
    <div className="flex w-full flex-col gap-5">
      <UnProgress value={value} className="w-full max-w-md text-meadow" label="Essay progress" />
      <label className="flex items-center gap-3 text-graphite text-xs">
        <span className="w-16 tabular-nums">{value}%</span>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full accent-[var(--meadow)]"
          aria-label="Progress value"
        />
      </label>
    </div>
  );
}
