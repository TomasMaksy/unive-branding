"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cn } from "cn";
import type React from "react";

export function RadioGroup({
  className,
  ...props
}: RadioGroupPrimitive.Props): React.ReactElement {
  return (
    <RadioGroupPrimitive
      className={cn("flex flex-col gap-3", className)}
      data-slot="radio-group"
      {...props}
    />
  );
}

export function Radio({
  className,
  ...props
}: RadioPrimitive.Root.Props): React.ReactElement {
  return (
    <RadioPrimitive.Root
      className={cn(
        // iOS-style: a white circle with a hairline that fills meadow, the
        // white centre popping in with a little spring.
        "relative inline-flex size-5.5 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white shadow-[inset_0_0_0_1.5px_var(--hairline-strong)] outline-none [transition:scale_240ms_cubic-bezier(.3,1.4,.5,1),background-color_100ms_ease-out,box-shadow_100ms_ease-out]",
        "hover:shadow-[inset_0_0_0_1.5px_var(--pebble)] active:not-data-disabled:scale-[0.86] active:not-data-disabled:duration-100 data-checked:bg-meadow data-checked:shadow-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "aria-invalid:shadow-[inset_0_0_0_1.5px_var(--danger)] data-disabled:cursor-not-allowed data-disabled:opacity-48",
        className,
      )}
      data-slot="radio"
      {...props}
    >
      <RadioPrimitive.Indicator
        keepMounted
        className="pointer-events-none size-2 scale-0 rounded-full bg-white [transition:scale_240ms_cubic-bezier(.3,1.5,.5,1)] data-checked:scale-100 data-unchecked:duration-150"
        data-slot="radio-indicator"
      />
    </RadioPrimitive.Root>
  );
}

export { Radio as RadioGroupItem, RadioGroupPrimitive, RadioPrimitive };
