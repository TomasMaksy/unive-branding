"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type * as React from "react";
import { Spinner } from "@/components/ui/spinner";

export const buttonVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg border font-medium text-base outline-none transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-64 data-loading:select-none data-loading:text-transparent sm:text-sm [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:shrink-0",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-9 px-[calc(--spacing(3)-1px)] sm:h-8",
        icon: "size-9 sm:size-8",
        "icon-lg": "size-10 sm:size-9",
        "icon-sm": "size-8 sm:size-7",
        "icon-xl":
          "size-11 sm:size-10 [&_svg:not([class*='size-'])]:size-5 sm:[&_svg:not([class*='size-'])]:size-4.5",
        "icon-xs":
          "size-7 rounded-md before:rounded-[calc(var(--radius-md)-1px)] sm:size-6 not-in-data-[slot=input-group]:[&_svg:not([class*='size-'])]:size-4 sm:not-in-data-[slot=input-group]:[&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 px-[calc(--spacing(3.5)-1px)] sm:h-9",
        sm: "h-8 gap-1.5 px-[calc(--spacing(2.5)-1px)] sm:h-7",
        xl: "h-11 px-[calc(--spacing(4)-1px)] text-lg sm:h-10 sm:text-base [&_svg:not([class*='size-'])]:size-5 sm:[&_svg:not([class*='size-'])]:size-4.5",
        "2xl":
          "h-14 min-h-14 w-full px-[calc(--spacing(4)-1px)] text-lg sm:h-14 sm:text-lg",
        /** Fixed h-11 at all breakpoints — settings panels, dialogs, secondary actions. */
        comfortable:
          "h-11 min-h-11 rounded-xl px-4 before:rounded-[calc(var(--radius-xl)-1px)] sm:h-11",
        xs: "h-7 gap-1 rounded-md px-[calc(--spacing(2)-1px)] text-sm before:rounded-[calc(var(--radius-md)-1px)] sm:h-6 sm:text-xs [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5",
      },
      variant: {
        default:
          "not-disabled:inset-shadow-[0_1px_--theme(--color-white/16%)] border-primary bg-primary text-primary-foreground shadow-primary/24 shadow-xs hover:bg-primary/90 data-pressed:bg-primary/90 *:data-[slot=button-loading-indicator]:text-primary-foreground [:active,[data-pressed]]:inset-shadow-[0_1px_--theme(--color-black/8%)] [:disabled,:active,[data-pressed]]:shadow-none",
        destructive:
          "not-disabled:inset-shadow-[0_1px_--theme(--color-white/16%)] border-destructive bg-destructive text-white shadow-destructive/24 shadow-xs hover:bg-destructive/90 data-pressed:bg-destructive/90 *:data-[slot=button-loading-indicator]:text-white [:active,[data-pressed]]:inset-shadow-[0_1px_--theme(--color-black/8%)] [:disabled,:active,[data-pressed]]:shadow-none",
        "destructive-outline":
          "border-input bg-popover not-dark:bg-clip-padding text-destructive-foreground shadow-xs/5 not-disabled:not-active:not-data-pressed:before:shadow-[0_1px_--theme(--color-black/4%)] hover:border-destructive/32 hover:bg-destructive/4 data-pressed:border-destructive/32 data-pressed:bg-destructive/4 *:data-[slot=button-loading-indicator]:text-foreground dark:bg-input/32 dark:not-disabled:before:shadow-[0_-1px_--theme(--color-white/2%)] dark:not-disabled:not-active:not-data-pressed:before:shadow-[0_-1px_--theme(--color-white/6%)] [:disabled,:active,[data-pressed]]:shadow-none",
        ghost:
          "border-transparent text-foreground hover:bg-accent data-pressed:bg-accent *:data-[slot=button-loading-indicator]:text-foreground",
        link: "border-transparent text-foreground underline-offset-4 hover:underline data-pressed:underline *:data-[slot=button-loading-indicator]:text-foreground",
        outline:
          "border-input bg-popover not-dark:bg-clip-padding text-foreground shadow-xs/5 not-disabled:not-active:not-data-pressed:before:shadow-[0_1px_--theme(--color-black/4%)] hover:bg-accent/50 data-pressed:bg-accent/50 *:data-[slot=button-loading-indicator]:text-foreground dark:bg-input/32 dark:data-pressed:bg-input/64 dark:hover:bg-input/64 dark:not-disabled:before:shadow-[0_-1px_--theme(--color-white/2%)] dark:not-disabled:not-active:not-data-pressed:before:shadow-[0_-1px_--theme(--color-white/6%)] [:disabled,:active,[data-pressed]]:shadow-none",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90 data-pressed:bg-secondary/90 *:data-[slot=button-loading-indicator]:text-secondary-foreground [:active,[data-pressed]]:bg-secondary/80",
        /** Settings save / primary action — blue pill on neutral panels. */
        settings:
          "border-none bg-blue-400 text-white shadow-none before:hidden hover:bg-blue-300 data-pressed:bg-blue-300 disabled:bg-neutral-300 disabled:text-white/80 *:data-[slot=button-loading-indicator]:text-white",
        /** Settings neutral outline — white surface on card footers. */
        "settings-outline":
          "border-neutral-200 bg-white text-foreground shadow-none before:hidden hover:bg-white data-pressed:bg-white dark:bg-white dark:hover:bg-white dark:data-pressed:bg-white *:data-[slot=button-loading-indicator]:text-foreground",
        /** Settings muted outline — neutral-100 fill (secondary row actions). */
        "settings-muted":
          "border-neutral-200 bg-neutral-100 text-foreground shadow-none before:hidden hover:bg-surface-hover data-pressed:bg-surface-hover *:data-[slot=button-loading-indicator]:text-foreground",
        /** Settings destructive outline — red label, white surface. */
        "settings-destructive":
          "border-neutral-200 bg-white text-destructive shadow-none before:hidden hover:bg-white hover:text-destructive data-pressed:bg-white data-pressed:text-destructive *:data-[slot=button-loading-indicator]:text-destructive",
        /** The landing hero's button: ink fill on a ::before layer, grows on hover. */
        brand:
          "rounded-xl border-none !font-medium text-paper shadow-none transition-transform! duration-200 ease-out hover:scale-105 active:scale-100 disabled:hover:scale-100 isolate before:-z-10 before:rounded-xl before:bg-ink before:transition-[box-shadow] before:duration-200 hover:enabled:before:shadow-[0_0_0_1px_var(--ink)] *:data-[slot=button-loading-indicator]:text-paper",
        /** Its quiet partner: white with a hairline ring. */
        "brand-outline":
          "rounded-xl border-none !font-medium text-ink shadow-none transition-transform! duration-200 ease-out hover:scale-105 active:scale-100 disabled:hover:scale-100 isolate before:-z-10 before:rounded-xl before:bg-white before:shadow-[0_0_0_0px_#fff,0_0_0_1px_var(--clay)] before:transition-[box-shadow] before:duration-200 hover:enabled:before:shadow-[0_0_0_1px_#fff,0_0_0_2px_var(--clay)] *:data-[slot=button-loading-indicator]:text-ink",
        /** Meadow, for growth moments: plan ready, milestone reached. */
        meadow:
          "not-disabled:inset-shadow-[0_1px_--theme(--color-white/16%)] border-meadow-dark/40 bg-meadow text-paper shadow-meadow/24 shadow-xs hover:bg-meadow-dark data-pressed:bg-meadow-dark *:data-[slot=button-loading-indicator]:text-paper",
        /** Pricing checkout CTA — black pill for visual test. */
        cta: "border-none bg-neutral-950 font-bold text-white tracking-tight shadow-[6px_10px_16px_rgba(0,0,0,0.18),inset_2px_2px_8px_rgba(255,255,255,0.5),inset_-2px_-2px_10px_rgba(255,255,255,0.5)] before:hidden hover:shadow-[5px_11px_20px_rgba(0,0,0,0.28),inset_1px_1px_4px_rgba(255,255,255,0.5),inset_-2px_-2px_6px_rgba(255,255,255,0.5)] data-pressed:scale-99 *:data-[slot=button-loading-indicator]:text-white rounded-full",
        /** Primary onboarding CTA — matches tall input fields (h-14, rounded-2xl, soft shadow). */
        onboarding:
          "h-14 min-h-14 w-full gap-0 overflow-hidden rounded-2xl border-none bg-linear-to-l from-blue-400 to-blue-500 px-4 font-medium text-lg text-white tracking-wide saturate-90 shadow-[0_8px_10px_0_rgba(15,23,42,0.05)] before:hidden after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-linear-to-l after:from-blue-500 after:to-blue-600 after:opacity-0 after:transition-opacity after:duration-300 after:ease-out hover:enabled:after:opacity-100 active:enabled:after:opacity-100 data-pressed:after:opacity-100 focus-visible:ring-3 focus-visible:ring-blue-400 focus-visible:ring-offset-0 *:data-[slot=button-loading-indicator]:text-white sm:h-14 sm:text-lg lg:text-xl [&>*:not([data-slot=button-loading-indicator])]:relative [&>*:not([data-slot=button-loading-indicator])]:z-[1]",
      },
    },
  },
);

export interface ButtonProps extends useRender.ComponentProps<"button"> {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  loading?: boolean;
}

export function Button({
  className,
  variant,
  size,
  render,
  children,
  loading = false,
  disabled: disabledProp,
  ...props
}: ButtonProps): React.ReactElement {
  const isDisabled: boolean = Boolean(loading || disabledProp);
  const typeValue: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] =
    render ? undefined : "button";

  const defaultProps = {
    children: (
      <>
        {children}
        {loading && (
          <Spinner
            className="pointer-events-none absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-1/2"
            data-slot="button-loading-indicator"
          />
        )}
      </>
    ),
    className: cn(buttonVariants({ className, size, variant })),
    "aria-disabled": loading || undefined,
    "data-loading": loading ? "" : undefined,
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
