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
  // Same capsule as the input: filled mist, white with a meadow ring on focus.
  "relative inline-flex h-10 w-full min-w-36 select-none items-center justify-between gap-2 rounded-full text-left text-[15px] text-ink outline-none transition-[background-color,box-shadow] duration-200 pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 data-disabled:pointer-events-none data-disabled:opacity-48 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-pebble",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "",
        // The input's heights: xs 32, sm 36, default 40, lg 48.
        lg: "h-12 px-5 text-base",
        sm: "h-9 gap-1.5 px-3.5",
        xs: "h-8 min-w-28 gap-1.5 px-3 text-sm",
      },
      variant: {
        default:
          "bg-mist px-4 hover:bg-mist-hover data-popup-open:bg-mist-hover focus-visible:bg-white focus-visible:shadow-[0_0_0_1.5px_var(--meadow),0_0_0_5px_color-mix(in_oklab,var(--meadow)_16%,transparent)] aria-invalid:bg-danger-soft aria-invalid:shadow-[0_0_0_1.5px_var(--danger)] focus-visible:aria-invalid:bg-white focus-visible:aria-invalid:shadow-[0_0_0_1.5px_var(--danger),0_0_0_5px_color-mix(in_oklab,var(--danger)_16%,transparent)]",
        /** No fill until hover, like the ghost button: filters, toolbars. */
        ghost:
          "w-auto min-w-0 gap-1.5 bg-transparent px-3.5 text-graphite hover:bg-ink/[0.05] hover:text-ink data-popup-open:bg-ink/[0.07] data-popup-open:text-ink focus-visible:shadow-[0_0_0_1.5px_var(--meadow)]",
      },
    },
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
        <span className="flex-1 truncate in-data-placeholder:text-pebble">
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
        "flex-1 truncate data-placeholder:text-pebble",
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
            // Opens over the trigger with the chosen row exactly on top of it, as
            // if the field grew into the list: same width, same left edge,
            // same text position, and the trigger's 20px corners.
            "max-w-(--available-width) origin-(--transform-origin) text-ink outline-none transition-[scale,opacity] duration-200 ease-unive data-ending-style:scale-[0.97] data-starting-style:scale-[0.97] data-ending-style:opacity-0 data-starting-style:opacity-0",
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
                : "relative h-full w-full overflow-hidden rounded-[20px] bg-white shadow-[0_12px_40px_rgb(29_27_24/0.14),0_0_0_1px_rgb(29_27_24/0.06)]"
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
        // Text starts 16px in (4px list padding + 12px), like the trigger's;
        // the check sits on the right where the chevron was.
        "grid min-h-9 w-full min-w-0 max-w-full cursor-default grid-cols-[minmax(0,1fr)_1rem] items-center gap-2 rounded-2xl py-1.5 ps-3 pe-3 text-[15px] text-ink outline-none transition-colors duration-100 data-disabled:pointer-events-none data-highlighted:bg-mist data-disabled:opacity-48 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      data-slot="select-item"
      {...props}
    >
      <SelectPrimitive.ItemIndicator className="col-start-2 row-start-1 text-meadow">
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
      <SelectPrimitive.ItemText className="col-start-1 row-start-1 min-w-0 truncate">
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
      className={cn("mx-3 my-1 h-px bg-(--hairline)", className)}
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
        "not-in-data-[slot=field]:mb-2 inline-flex cursor-default items-center gap-2 font-medium text-ink text-sm/4",
        className,
      )}
      data-slot="select-label"
      {...props}
    />
  );
}

/** The menu's group label: an eyebrow lined up with the item text. */
export function SelectGroupLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props): React.ReactElement {
  return (
    <SelectPrimitive.GroupLabel
      className={cn("px-3 pt-2 pb-1 font-medium text-[11px] text-pebble uppercase tracking-[0.08em]", className)}
      data-slot="select-group-label"
      {...props}
    />
  );
}

export { SelectPopup as SelectContent, SelectPrimitive };
