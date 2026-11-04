"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { cn } from "cn";
import { ChevronsUpDownIcon, XIcon } from "lucide-react";
import type * as React from "react";

/**
 * A field you type into to narrow a list, then pick one. The input is the
 * same filled capsule as Input; the list is Select's white surface and rows.
 * Pass `items` to the root so it can filter, and render rows from the list's
 * function child.
 */
export const Combobox: typeof ComboboxPrimitive.Root = ComboboxPrimitive.Root;

const SIZES = {
  xs: "h-8 text-sm [--px:--spacing(3)]",
  sm: "h-9 [--px:--spacing(3.5)]",
  default: "h-10 [--px:--spacing(4)]",
  lg: "h-12 text-base [--px:--spacing(5)]",
} as const;

export function ComboboxInput({
  className,
  size = "default",
  showClear = true,
  showTrigger = true,
  ...props
}: Omit<ComboboxPrimitive.Input.Props, "size"> & {
  size?: keyof typeof SIZES;
  /** A small × once something is typed or picked. */
  showClear?: boolean;
  /** The chevrons on the right, to open the list without typing. */
  showTrigger?: boolean;
}): React.ReactElement {
  return (
    <ComboboxPrimitive.InputGroup
      className={cn(
        // Input's capsule: mist, white with a meadow ring while focused or open.
        "relative inline-flex w-full items-center rounded-full bg-mist text-[15px] text-ink transition-[background-color,box-shadow] duration-200 hover:bg-mist-hover has-focus-visible:bg-white data-popup-open:bg-white has-focus-visible:shadow-[0_0_0_1.5px_var(--meadow),0_0_0_5px_color-mix(in_oklab,var(--meadow)_16%,transparent)] data-popup-open:shadow-[0_0_0_1.5px_var(--meadow),0_0_0_5px_color-mix(in_oklab,var(--meadow)_16%,transparent)] has-aria-invalid:bg-danger-soft has-aria-invalid:shadow-[0_0_0_1.5px_var(--danger)] data-disabled:opacity-48",
        SIZES[size],
        className,
      )}
      data-slot="combobox-input-group"
    >
      <ComboboxPrimitive.Input
        className="h-full w-full min-w-0 flex-1 rounded-[inherit] bg-transparent ps-(--px) pe-1 outline-none placeholder:text-pebble"
        data-slot="combobox-input"
        {...props}
      />
      <span className="flex shrink-0 items-center pe-[calc(var(--px)-6px)] text-pebble">
        {showClear ? (
          <ComboboxPrimitive.Clear
            aria-label="Clear"
            className="grid size-7 place-items-center rounded-full outline-none transition-colors hover:bg-ink/[0.06] hover:text-ink focus-visible:ring-2 focus-visible:ring-ring data-[hidden]:hidden"
          >
            <XIcon className="size-4" aria-hidden />
          </ComboboxPrimitive.Clear>
        ) : null}
        {showTrigger ? (
          <ComboboxPrimitive.Trigger
            aria-label="Show options"
            className="grid size-7 place-items-center rounded-full outline-none transition-colors hover:bg-ink/[0.06] hover:text-ink focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronsUpDownIcon className="size-4" aria-hidden />
          </ComboboxPrimitive.Trigger>
        ) : null}
      </span>
    </ComboboxPrimitive.InputGroup>
  );
}

export function ComboboxPopup({
  className,
  children,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  portalProps,
  ...props
}: ComboboxPrimitive.Popup.Props & {
  side?: ComboboxPrimitive.Positioner.Props["side"];
  sideOffset?: ComboboxPrimitive.Positioner.Props["sideOffset"];
  align?: ComboboxPrimitive.Positioner.Props["align"];
  portalProps?: ComboboxPrimitive.Portal.Props;
}): React.ReactElement {
  return (
    <ComboboxPrimitive.Portal {...portalProps}>
      <ComboboxPrimitive.Positioner
        align={align}
        className="z-110 w-(--anchor-width) max-w-(--available-width) select-none"
        data-slot="combobox-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <ComboboxPrimitive.Popup
          className={cn(
            // Select's surface: white, 20px corners, a soft lift.
            "max-h-[min(var(--available-height),20rem)] origin-(--transform-origin) overflow-y-auto overscroll-contain rounded-[20px] bg-white p-1 text-ink shadow-[0_12px_40px_rgb(29_27_24/0.14),0_0_0_1px_rgb(29_27_24/0.06)] outline-none transition-[scale,opacity] duration-200 ease-unive data-ending-style:scale-[0.97] data-starting-style:scale-[0.97] data-ending-style:opacity-0 data-starting-style:opacity-0",
            className,
          )}
          data-slot="combobox-popup"
          {...props}
        >
          {children}
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

export function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props): React.ReactElement {
  return <ComboboxPrimitive.List className={cn("outline-none", className)} data-slot="combobox-list" {...props} />;
}

export function ComboboxItem({ className, children, ...props }: ComboboxPrimitive.Item.Props): React.ReactElement {
  return (
    <ComboboxPrimitive.Item
      className={cn(
        // Select's row: text 16px in, the check on the right.
        "grid min-h-9 w-full min-w-0 cursor-default grid-cols-[minmax(0,1fr)_1rem] items-center gap-2 rounded-2xl py-1.5 ps-3 pe-3 text-[15px] text-ink outline-none transition-colors duration-100 data-disabled:pointer-events-none data-highlighted:bg-mist data-disabled:opacity-48",
        className,
      )}
      data-slot="combobox-item"
      {...props}
    >
      <ComboboxPrimitive.ItemIndicator className="col-start-2 row-start-1 text-meadow">
        <svg
          aria-hidden="true"
          fill="none"
          height="16"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="16"
        >
          <path d="M5.252 12.7 10.2 18.63 18.748 5.37" />
        </svg>
      </ComboboxPrimitive.ItemIndicator>
      <span className="col-start-1 row-start-1 min-w-0 truncate">{children}</span>
    </ComboboxPrimitive.Item>
  );
}

/** Shown when nothing matches. It stays mounted (for screen readers) and collapses when empty. */
export function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props): React.ReactElement {
  return (
    <ComboboxPrimitive.Empty
      className={cn("px-3 py-2 text-[15px] text-pebble empty:m-0 empty:p-0", className)}
      data-slot="combobox-empty"
      {...props}
    />
  );
}

/** Renders a group's own items inside ComboboxGroup, for grouped lists. */
export const ComboboxCollection: typeof ComboboxPrimitive.Collection = ComboboxPrimitive.Collection;

export function ComboboxGroup(props: ComboboxPrimitive.Group.Props): React.ReactElement {
  return <ComboboxPrimitive.Group data-slot="combobox-group" {...props} />;
}

/** Select's group label: an eyebrow lined up with the row text. */
export function ComboboxGroupLabel({ className, ...props }: ComboboxPrimitive.GroupLabel.Props): React.ReactElement {
  return (
    <ComboboxPrimitive.GroupLabel
      className={cn("px-3 pt-2 pb-1 font-medium text-[11px] text-pebble uppercase tracking-[0.08em]", className)}
      data-slot="combobox-group-label"
      {...props}
    />
  );
}

export function ComboboxSeparator({ className, ...props }: ComboboxPrimitive.Separator.Props): React.ReactElement {
  return <ComboboxPrimitive.Separator className={cn("mx-3 my-1 h-px bg-(--hairline)", className)} data-slot="combobox-separator" {...props} />;
}

export { ComboboxPrimitive };
