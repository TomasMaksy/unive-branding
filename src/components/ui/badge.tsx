"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type React from "react";

/**
 * Status at a glance: a small capsule, a soft fill and the state's ink for
 * text. Four looks, no more: neutral for a plain label or a stage, and the
 * three states. No outlines and no solid fills; a solid capsule reads as a
 * button. Info is neutral in this brand, so it is the default.
 */
export const badgeVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-48 [&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:shrink-0 [button&,a&]:cursor-pointer [button&,a&]:pointer-coarse:after:absolute [button&,a&]:pointer-coarse:after:size-full [button&,a&]:pointer-coarse:after:min-h-11 [button&,a&]:pointer-coarse:after:min-w-11",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        sm: "h-5 min-w-5 px-2 text-[11px] [&_svg:not([class*='size-'])]:size-3",
        default: "h-6 min-w-6 px-2.5 text-xs",
        lg: "h-7 min-w-7 px-3 text-sm",
      },
      variant: {
        /** Mist: a plain label, a type, a stage. Also what "info" means here. */
        default: "bg-mist text-graphite [button&,a&]:hover:bg-mist-hover",
        /** Done, accepted, submitted. The only green badge. */
        success: "bg-success-soft text-success-ink",
        /** Needs doing soon. */
        warning: "bg-warning-soft text-warning-ink",
        /** Missing, overdue, failed. */
        error: "bg-danger-soft text-danger-ink",
      },
    },
  },
);

export interface BadgeProps extends useRender.ComponentProps<"span"> {
  variant?: VariantProps<typeof badgeVariants>["variant"];
  size?: VariantProps<typeof badgeVariants>["size"];
}

export function Badge({
  className,
  variant,
  size,
  render,
  ...props
}: BadgeProps): React.ReactElement {
  const defaultProps = {
    className: cn(badgeVariants({ className, size, variant })),
    "data-slot": "badge",
  };

  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(defaultProps, props),
    render,
  });
}
