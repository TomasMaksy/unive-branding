"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { cn } from "cn";
import type React from "react";

/**
 * iOS-style checkbox: a small white squircle with a hairline that fills
 * meadow the moment it is checked, the tick drawing in quickly. It
 * dips on press and springs back.
 */
export function Checkbox({
  className,
  ...props
}: CheckboxPrimitive.Root.Props): React.ReactElement {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "group/checkbox squircle relative inline-flex size-5.5 shrink-0 cursor-pointer items-center justify-center bg-white shadow-[inset_0_0_0_1.5px_var(--hairline-strong)] outline-none [--sq:6px] [transition:scale_240ms_cubic-bezier(.3,1.4,.5,1),background-color_100ms_ease-out,box-shadow_100ms_ease-out]",
        "hover:shadow-[inset_0_0_0_1.5px_var(--pebble)] active:not-data-disabled:scale-[0.86] active:not-data-disabled:duration-100",
        "data-checked:bg-meadow data-checked:shadow-none data-indeterminate:bg-meadow data-indeterminate:shadow-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "aria-invalid:shadow-[inset_0_0_0_1.5px_var(--danger)] data-disabled:cursor-not-allowed data-disabled:opacity-48",
        className,
      )}
      data-slot="checkbox"
      {...props}
    >
      <CheckboxPrimitive.Indicator
        keepMounted
        className="pointer-events-none absolute inset-0 flex items-center justify-center text-white"
        data-slot="checkbox-indicator"
        render={(props: React.ComponentProps<"span">, state: CheckboxPrimitive.Indicator.State) => (
          <span {...props}>
            <svg aria-hidden="true" className="size-3.5" fill="none" viewBox="0 0 24 24">
              <path
                d={state.indeterminate ? "M6 12h12" : "M5.5 12.5 10 17 18.5 7"}
                pathLength={1}
                stroke="currentColor"
                strokeDasharray="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                // The tick draws in at once on check, and is gone at once on uncheck.
                className="[stroke-dashoffset:1] group-data-checked/checkbox:[stroke-dashoffset:0] group-data-indeterminate/checkbox:[stroke-dashoffset:0] group-data-checked/checkbox:[transition:stroke-dashoffset_180ms_cubic-bezier(.2,.8,.2,1)] group-data-indeterminate/checkbox:[transition:stroke-dashoffset_140ms_ease-out]"
              />
            </svg>
          </span>
        )}
      />
    </CheckboxPrimitive.Root>
  );
}

export { CheckboxPrimitive };
