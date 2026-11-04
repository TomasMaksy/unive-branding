"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import {
  ChevronDownIcon,
  ChevronsUpDownIcon,
  ChevronUpIcon,
} from "lucide-react";
import type * as React from "react";

export const Select: typeof SelectPrimitive.Root = SelectPrimitive.Root;

export const selectTriggerVariants = cva(
  "relative inline-flex min-h-10 w-full min-w-36 select-none items-center justify-between gap-2 rounded-lg text-left text-base text-foreground outline-none ring-ring/24 transition-shadow pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 focus-visible:ring-[3px] data-disabled:pointer-events-none data-disabled:opacity-64 sm:min-h-9 sm:text-sm [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [[data-disabled],:focus-visible,[aria-invalid],[data-pressed]]:shadow-none",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "",
        lg: "min-h-10 sm:min-h-9",
        sm: "min-h-8 gap-1.5 px-[calc(--spacing(2.5)-1px)] sm:min-h-7",
      },
      variant: {
        default:
          "border border-input bg-background not-dark:bg-clip-padding px-[calc(--spacing(3)-1px)] shadow-xs/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-data-disabled:not-focus-visible:not-aria-invalid:not-data-pressed:before:shadow-[0_1px_--theme(--color-black/4%)] focus-visible:border-ring aria-invalid:border-destructive/36 focus-visible:aria-invalid:border-destructive/64 focus-visible:aria-invalid:ring-destructive/16 dark:bg-input/32 dark:aria-invalid:ring-destructive/24 dark:not-data-disabled:not-focus-visible:not-aria-invalid:not-data-pressed:before:shadow-[0_-1px_--theme(--color-white/6%)]",
        ghost:
          "w-auto min-w-0 gap-1.5 px-4 border-0 bg-transparent px-0 text-neutral-600 shadow-none before:hidden hover:bg-neutral-50 data-pressed:bg-neutral-50 focus-visible:border-transparent focus-visible:ring-2 sm:gap-2",
      },
    },
    compoundVariants: [
      {
        variant: "ghost",
        size: "sm",
        className: "px-4",
      },
    ],
  },
);

export const selectTriggerIconClassName = "-me-1 size-4.5 opacity-80 sm:size-4";

export interface SelectButtonProps extends useRender.ComponentProps<"button"> {
  size?: VariantProps<typeof selectTriggerVariants>["size"];
  variant?: VariantProps<typeof selectTriggerVariants>["variant"];
}

export function SelectButton({
  className,
  size,
  variant,
  render,
  children,
  ...props
}: SelectButtonProps): React.ReactElement {
  const typeValue: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] =
    render ? undefined : "button";

  const defaultProps = {
    children: (
      <>
        <span className="flex-1 truncate in-data-placeholder:text-muted-foreground/72">
          {children}
        </span>
        <ChevronsUpDownIcon className={selectTriggerIconClassName} />
      </>
    ),
    className: cn(
      selectTriggerVariants({ size, variant }),
      "min-w-0",
      className,
    ),
    "data-slot": "select-button",
    type: typeValue,
  };

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(defaultProps, props),
    render,
  });
}

export function SelectTrigger({
  className,
  size = "default",
  variant = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props &
  VariantProps<typeof selectTriggerVariants>): React.ReactElement {
  return (
    <SelectPrimitive.Trigger
      className={cn(selectTriggerVariants({ size, variant }), className)}
      data-slot="select-trigger"
      {...props}
    >
      {children}
      <SelectPrimitive.Icon data-slot="select-icon">
        <ChevronsUpDownIcon className={selectTriggerIconClassName} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectValue({
  className,
  ...props
}: SelectPrimitive.Value.Props): React.ReactElement {
  return (
    <SelectPrimitive.Value
      className={cn(
        "flex-1 truncate data-placeholder:text-muted-foreground",
        className,
      )}
      data-slot="select-value"
      {...props}
    />
  );
}

export function SelectPopup({
  className,
  surfaceClassName,
  popupClassName,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "start",
  alignOffset = 0,
  alignItemWithTrigger = true,
  matchTriggerWidth = true,
  hideScrollArrows = false,
  anchor,
  portalProps,
  ...props
}: SelectPrimitive.Popup.Props & {
  portalProps?: SelectPrimitive.Portal.Props;
  side?: SelectPrimitive.Positioner.Props["side"];
  sideOffset?: SelectPrimitive.Positioner.Props["sideOffset"];
  align?: SelectPrimitive.Positioner.Props["align"];
  alignOffset?: SelectPrimitive.Positioner.Props["alignOffset"];
  alignItemWithTrigger?: SelectPrimitive.Positioner.Props["alignItemWithTrigger"];
  matchTriggerWidth?: boolean;
  hideScrollArrows?: boolean;
  surfaceClassName?: string;
  popupClassName?: string;
  anchor?: SelectPrimitive.Positioner.Props["anchor"];
}): React.ReactElement {
  const popupWidthClass = matchTriggerWidth
    ? "w-(--anchor-width)"
    : "w-max min-w-(--anchor-width)";

  return (
    <SelectPrimitive.Portal {...portalProps}>
      <SelectPrimitive.Positioner
        align={align}
        alignItemWithTrigger={alignItemWithTrigger}
        alignOffset={alignOffset}
        anchor={anchor}
        className={cn(
          "z-110 max-w-(--available-width) select-none",
          popupWidthClass,
        )}
        data-slot="select-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <SelectPrimitive.Popup
          className={cn(
            "max-w-(--available-width) origin-(--transform-origin) text-foreground outline-none",
            popupWidthClass,
            popupClassName,
          )}
          data-slot="select-popup"
          {...props}
        >
          <SelectPrimitive.ScrollUpArrow
            className={cn(
              "top-0 z-50 flex h-6 w-full cursor-default items-center justify-center before:pointer-events-none before:absolute before:inset-x-px before:top-px before:h-[200%] before:rounded-t-[calc(var(--radius-lg)-1px)] before:bg-linear-to-b before:from-50% before:from-popover",
              hideScrollArrows && "hidden",
            )}
            data-slot="select-scroll-up-arrow"
          >
            <ChevronUpIcon className="relative size-4.5 sm:size-4" />
          </SelectPrimitive.ScrollUpArrow>
          <div
            className={
              surfaceClassName
                ? cn("relative h-full w-full overflow-hidden", surfaceClassName)
                : "relative h-full w-full overflow-hidden rounded-lg border bg-popover not-dark:bg-clip-padding shadow-lg/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]"
            }
          >
            <SelectPrimitive.List
              className={cn(
                "max-h-(--available-height) w-full min-w-0 overflow-y-auto overflow-x-hidden p-1",
                className,
              )}
              data-slot="select-list"
            >
              {children}
            </SelectPrimitive.List>
          </div>
          <SelectPrimitive.ScrollDownArrow
            className={cn(
              "bottom-0 z-50 flex h-6 w-full cursor-default items-center justify-center before:pointer-events-none before:absolute before:inset-x-px before:bottom-px before:h-[200%] before:rounded-b-[calc(var(--radius-lg)-1px)] before:bg-linear-to-t before:from-50% before:from-popover",
              hideScrollArrows && "hidden",
            )}
            data-slot="select-scroll-down-arrow"
          >
            <ChevronDownIcon className="relative size-4.5 sm:size-4" />
          </SelectPrimitive.ScrollDownArrow>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props): React.ReactElement {
  return (
    <SelectPrimitive.Item
      className={cn(
        "grid min-h-8 w-full min-w-0 max-w-full cursor-default grid-cols-[1rem_minmax(0,1fr)] items-center gap-2 rounded-sm py-1 ps-2 pe-4 text-base outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      data-slot="select-item"
      {...props}
    >
      <SelectPrimitive.ItemIndicator className="col-start-1">
        <svg
          aria-hidden="true"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5.252 12.7 10.2 18.63 18.748 5.37" />
        </svg>
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText className="col-start-2 min-w-0 truncate">
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props): React.ReactElement {
  return (
    <SelectPrimitive.Separator
      className={cn("mx-2 my-1 h-px bg-border", className)}
      data-slot="select-separator"
      {...props}
    />
  );
}

export function SelectGroup(
  props: SelectPrimitive.Group.Props,
): React.ReactElement {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

export function SelectLabel({
  className,
  ...props
}: SelectPrimitive.Label.Props): React.ReactElement {
  return (
    <SelectPrimitive.Label
      className={cn(
        "not-in-data-[slot=field]:mb-2 inline-flex cursor-default items-center gap-2 font-medium text-base/4.5 text-foreground sm:text-sm/4",
        className,
      )}
      data-slot="select-label"
      {...props}
    />
  );
}

export function SelectGroupLabel(
  props: SelectPrimitive.GroupLabel.Props,
): React.ReactElement {
  return (
    <SelectPrimitive.GroupLabel
      className="px-2 py-1.5 font-medium text-muted-foreground text-xs"
      data-slot="select-group-label"
      {...props}
    />
  );
}

export { SelectPopup as SelectContent, SelectPrimitive };
