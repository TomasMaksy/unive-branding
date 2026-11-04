"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type * as React from "react";
import { UnLoader } from "@/components/brand/un-loader";

/**
 * Buttons are capsules, as on iOS: fully round ends at every size. A press
 * sinks the button a touch and it springs back on release.
 */
export const buttonVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border font-medium outline-none [transition:scale_300ms_cubic-bezier(.3,1.4,.5,1),background-color_160ms_ease-out,box-shadow_160ms_ease-out,color_160ms_ease-out] before:pointer-events-none before:absolute before:inset-0 before:rounded-full pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 active:not-disabled:scale-[0.96] data-pressed:scale-[0.96] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-48 data-loading:select-none data-loading:opacity-100 data-generating:opacity-100 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:shrink-0 [--loader:1.05em]",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        // Text grows with the button, as on iOS (about a third of its height).
        xs: "h-7 gap-1 px-3 text-[13px] sm:h-7 sm:text-[13px] [--loader:10px] [&_svg:not([class*='size-'])]:size-3.5",
        sm: "h-8 gap-1.5 px-3.5 text-sm sm:h-8 sm:text-sm [--loader:12px]",
        default: "h-10 px-4.5 text-[15px] sm:h-10 sm:text-[15px]",
        lg: "h-12 px-6 text-base sm:h-12 sm:text-base [--loader:17px]",
        xl: "h-14 px-7 text-lg sm:h-14 sm:text-lg [--loader:19px] [&_svg:not([class*='size-'])]:size-5",
        "2xl": "h-16 min-h-16 w-full px-8 text-xl sm:h-16 sm:text-xl [--loader:22px] [&_svg:not([class*='size-'])]:size-5",
        /** Fixed h-11: settings panels, dialogs, secondary actions. */
        comfortable: "h-11 min-h-11 px-5 text-[15px] sm:h-11 sm:text-[15px] [--loader:16px]",
        icon: "size-10 sm:size-10",
        "icon-xs": "size-7 sm:size-7 [--loader:10px] [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm": "size-8 sm:size-8 [--loader:12px]",
        "icon-lg": "size-12 sm:size-12 [--loader:17px]",
        "icon-xl": "size-14 sm:size-14 [--loader:19px] [&_svg:not([class*='size-'])]:size-5",
      },
      variant: {
        /** Ink: the main action. */
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-ink-soft data-pressed:bg-ink-soft *:data-[slot=button-loading-indicator]:text-primary-foreground",
        /** Sand: the quiet partner, like iOS's grey buttons but warm. */
        secondary:
          "border-transparent bg-mist text-ink hover:bg-mist-hover data-pressed:bg-mist-hover *:data-[slot=button-loading-indicator]:text-ink",
        /** White with a hairline, for cards and over imagery. */
        outline:
          "border-transparent bg-white text-ink shadow-[inset_0_0_0_1px_var(--hairline)] hover:shadow-[inset_0_0_0_1px_var(--hairline-strong)] *:data-[slot=button-loading-indicator]:text-ink",
        /** Solid white with no ring: on photos and dark panels. */
        inverse:
          "border-transparent bg-white text-ink hover:bg-paper data-pressed:bg-paper *:data-[slot=button-loading-indicator]:text-ink",
        ghost:
          "border-transparent text-ink hover:bg-ink/[0.05] data-pressed:bg-ink/[0.07] aria-pressed:hover:bg-ink/[0.05] *:data-[slot=button-loading-indicator]:text-foreground",
        link: "h-auto border-transparent px-0 text-foreground underline-offset-4 hover:underline active:not-disabled:scale-100 *:data-[slot=button-loading-indicator]:text-foreground sm:h-auto sm:px-0",
        /** Stone: a calm solid grey. With `loadingLabel` it is the
         *  "Generating…" button: the "un" flowing beside a label. */
        stone:
          "border-transparent bg-stone text-white hover:bg-[color-mix(in_oklab,var(--stone)_88%,black)] *:data-[slot=button-loading-indicator]:text-white",
        /** Meadow, for growth moments: plan ready, milestone reached. */
        meadow:
          "border-transparent bg-meadow text-paper hover:bg-meadow-dark data-pressed:bg-meadow-dark *:data-[slot=button-loading-indicator]:text-paper",
        destructive:
          "border-transparent bg-destructive text-white hover:bg-destructive/88 data-pressed:bg-destructive/88 *:data-[slot=button-loading-indicator]:text-white",
        "destructive-outline":
          "border-transparent bg-white text-destructive-foreground shadow-[inset_0_0_0_1px_var(--hairline)] hover:bg-danger-soft hover:shadow-none *:data-[slot=button-loading-indicator]:text-destructive-foreground",
        /** The landing hero's button: ink, and it grows a little on hover. */
        brand:
          "border-transparent bg-ink !font-medium text-paper hover:scale-[1.04] hover:active:scale-[0.97] *:data-[slot=button-loading-indicator]:text-paper",
        /** Its quiet partner: white with a hairline ring. */
        "brand-outline":
          "border-transparent bg-white !font-medium text-ink shadow-[inset_0_0_0_1px_var(--hairline)] hover:scale-[1.04] hover:active:scale-[0.97] hover:shadow-[inset_0_0_0_1px_var(--hairline-strong)] *:data-[slot=button-loading-indicator]:text-ink",
      },
    },
  },
);

export interface ButtonProps extends useRender.ComponentProps<"button"> {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  loading?: boolean;
  /** While loading, show the "un" beside this label instead of morphing
   *  the label into the loader. For long waits: "Generating…". */
  loadingLabel?: React.ReactNode;
}

export function Button({
  className,
  variant,
  size,
  render,
  children,
  loading = false,
  loadingLabel,
  disabled: disabledProp,
  ...props
}: ButtonProps): React.ReactElement {
  const isDisabled: boolean = Boolean(loading || disabledProp);
  const inline = loading && loadingLabel != null;
  const typeValue: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] =
    render ? undefined : "button";

  const defaultProps = {
    children: (
      <>
        {/* The label squeezes to the centre and blurs away while the "un"
            grows out of the same spot, so the text seems to turn into the
            loader and back. Both stay mounted so the change can animate. */}
        <span
          className="inline-flex items-center justify-center gap-[inherit] [transition:opacity_260ms_var(--ease-unive),filter_260ms_var(--ease-unive),scale_420ms_cubic-bezier(.3,1.3,.5,1)] in-data-loading:scale-x-[0.55] in-data-loading:scale-y-[0.8] in-data-loading:opacity-0 in-data-loading:blur-[5px]"
          data-slot="button-label"
        >
          {inline ? (
            <>
              <UnLoader size={20} label="" className="h-(--loader)! w-auto!" />
              {loadingLabel}
            </>
          ) : (
            children
          )}
        </span>
        <span
          aria-hidden={!loading}
          className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 blur-[5px] [transition:opacity_260ms_var(--ease-unive),filter_260ms_var(--ease-unive)] in-data-loading:opacity-100 in-data-loading:blur-none [&>svg]:h-(--loader)! [&>svg]:w-auto! [&>svg]:scale-[1.8] [&>svg]:[transition:scale_420ms_cubic-bezier(.3,1.3,.5,1)] in-data-loading:[&>svg]:scale-100"
          data-slot="button-loading-indicator"
        >
          {/* Sized by --loader: a touch taller than the label's capitals. */}
          <UnLoader size={20} paused={!loading || inline} label={loading && !inline ? "Loading" : ""} />
        </span>
      </>
    ),
    className: cn(buttonVariants({ className, size, variant })),
    "aria-disabled": loading || undefined,
    "data-loading": loading && !inline ? "" : undefined,
    "data-generating": inline ? "" : undefined,
    "data-slot": "button",
    disabled: isDisabled,
    type: typeValue,
  };

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(defaultProps, props),
    render,
  });
}
