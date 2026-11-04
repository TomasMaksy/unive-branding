"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cn } from "cn";
import type React from "react";

/**
 * The switch, after iOS: a capsule track and a capsule thumb that stretches
 * while pressed and springs across. On is meadow, our green.
 */
export function Switch({
  className,
  ...props
}: SwitchPrimitive.Root.Props): React.ReactElement {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "group/switch relative inline-flex h-7 w-[52px] shrink-0 cursor-pointer items-center rounded-full p-0.5 outline-none transition-colors duration-300 ease-unive focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-checked:bg-meadow data-unchecked:bg-input data-disabled:cursor-not-allowed data-disabled:opacity-48",
        className,
      )}
      data-slot="switch"
      {...props}
    >
      <SwitchPrimitive.Thumb
        className="pointer-events-none block h-6 w-[30px] rounded-full bg-white shadow-[0_2px_6px_rgb(43_32_24/0.18),0_0_0_0.5px_rgb(43_32_24/0.06)] transition-[translate,width] duration-[420ms] ease-[cubic-bezier(.3,1.35,.45,1)] group-active/switch:w-9 data-checked:translate-x-[18px] group-active/switch:data-checked:translate-x-3"
        data-slot="switch-thumb"
      />
    </SwitchPrimitive.Root>
  );
}

export { SwitchPrimitive };
