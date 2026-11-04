"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cn } from "cn";
import { ChevronRightIcon } from "lucide-react";
import type * as React from "react";

export const MenuCreateHandle: typeof MenuPrimitive.createHandle =
  MenuPrimitive.createHandle;

export const Menu: typeof MenuPrimitive.Root = MenuPrimitive.Root;

export const MenuPortal: typeof MenuPrimitive.Portal = MenuPrimitive.Portal;

export function MenuTrigger({
  className,
  children,
  ...props
}: MenuPrimitive.Trigger.Props): React.ReactElement {
  return (
    <MenuPrimitive.Trigger
      className={className}
      data-slot="menu-trigger"
      {...props}
    >
      {children}
    </MenuPrimitive.Trigger>
  );
}

export function MenuPopup({
  children,
  className,
  sideOffset = 4,
  align = "center",
  alignOffset,
  side = "bottom",
  anchor,
  portalProps,
  ...props
}: MenuPrimitive.Popup.Props & {
  align?: MenuPrimitive.Positioner.Props["align"];
  sideOffset?: MenuPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: MenuPrimitive.Positioner.Props["alignOffset"];
  side?: MenuPrimitive.Positioner.Props["side"];
  anchor?: MenuPrimitive.Positioner.Props["anchor"];
  portalProps?: MenuPrimitive.Portal.Props;
}): React.ReactElement {
  return (
    <MenuPortal {...portalProps}>
      <MenuPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="z-110"
        data-slot="menu-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          className={cn(
            // Same family as the dialog: one white squircle, a soft warm shadow
            // and a faint edge so it holds on white cards too.
            "squircle relative flex not-[class*='w-']:min-w-52 origin-(--transform-origin) bg-white text-ink [--sq:var(--radius-xl)] shadow-[0_12px_40px_rgb(29_27_24/0.14),0_0_0_1px_rgb(29_27_24/0.06)] outline-none transition-[scale,opacity] duration-200 ease-unive data-ending-style:scale-96 data-starting-style:scale-96 data-ending-style:opacity-0 data-starting-style:opacity-0 focus:outline-none",
            className,
          )}
          data-slot="menu-popup"
          {...props}
        >
          <div className="max-h-(--available-height) w-full overflow-y-auto p-1.5">
            {children}
          </div>
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPortal>
  );
}

export function MenuGroup(
  props: MenuPrimitive.Group.Props,
): React.ReactElement {
  return <MenuPrimitive.Group data-slot="menu-group" {...props} />;
}

/** Every row in a menu: a 36 px squircle, mist when highlighted, 15 px text,
 *  16 px pebble icons. Items, choices and submenu triggers all share it. */
const ROW =
  "squircle flex min-h-9 select-none items-center gap-2.5 px-3 py-1.5 text-[15px] text-ink outline-none transition-colors duration-100 [--sq:var(--radius-md)] data-disabled:pointer-events-none data-highlighted:bg-mist data-inset:ps-9.5 data-disabled:opacity-48 [&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:shrink-0 [&>svg]:text-pebble";

/** The select's tick: meadow, on the right where a chevron would be. */
function Tick() {
  return (
    <svg aria-hidden="true" className="size-4 text-meadow" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M5.252 12.7 10.2 18.63 18.748 5.37" />
    </svg>
  );
}

export function MenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
}): React.ReactElement {
  return (
    <MenuPrimitive.Item
      className={cn(
        ROW,
        "cursor-pointer data-[variant=destructive]:text-danger data-[variant=destructive]:data-highlighted:bg-danger-soft data-[variant=destructive]:[&>svg]:text-danger",
        className,
      )}
      data-inset={inset}
      data-slot="menu-item"
      data-variant={variant}
      {...props}
    />
  );
}

export function MenuCheckboxItem({
  className,
  children,
  checked,
  variant = "default",
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  /** "switch": a small meadow switch on the right instead of a tick. */
  variant?: "default" | "switch";
}): React.ReactElement {
  return (
    <MenuPrimitive.CheckboxItem
      checked={checked}
      className={cn(ROW, "cursor-pointer justify-between gap-4", className)}
      data-slot="menu-checkbox-item"
      data-variant={variant}
      {...props}
    >
      <span className="flex min-w-0 items-center gap-2.5 [&>svg:not([class*='size-'])]:size-4 [&>svg]:shrink-0 [&>svg]:text-pebble">{children}</span>
      {variant === "switch" ? (
        // The Switch, at menu size: meadow when on, the thumb springs across.
        <span
          aria-hidden
          className="relative inline-flex h-5 w-8 shrink-0 items-center rounded-full bg-input p-0.5 transition-colors duration-150 ease-out in-data-checked:bg-meadow"
        >
          <span className="block size-4 rounded-full bg-white shadow-[0_1px_3px_rgb(43_32_24/0.18)] transition-[translate] duration-[280ms] ease-[cubic-bezier(.3,1.35,.45,1)] in-data-checked:translate-x-3" />
        </span>
      ) : (
        <span className="grid size-4 shrink-0 place-items-center">
          <MenuPrimitive.CheckboxItemIndicator>
            <Tick />
          </MenuPrimitive.CheckboxItemIndicator>
        </span>
      )}
    </MenuPrimitive.CheckboxItem>
  );
}

export function MenuRadioGroup(
  props: MenuPrimitive.RadioGroup.Props,
): React.ReactElement {
  return <MenuPrimitive.RadioGroup data-slot="menu-radio-group" {...props} />;
}

export function MenuRadioItem({
  className,
  children,
  ...props
}: MenuPrimitive.RadioItem.Props): React.ReactElement {
  return (
    <MenuPrimitive.RadioItem
      className={cn(ROW, "cursor-pointer justify-between gap-4", className)}
      data-slot="menu-radio-item"
      {...props}
    >
      <span className="flex min-w-0 items-center gap-2.5 [&>svg:not([class*='size-'])]:size-4 [&>svg]:shrink-0 [&>svg]:text-pebble">{children}</span>
      <span className="grid size-4 shrink-0 place-items-center">
        <MenuPrimitive.RadioItemIndicator>
          <Tick />
        </MenuPrimitive.RadioItemIndicator>
      </span>
    </MenuPrimitive.RadioItem>
  );
}

export function MenuGroupLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
}): React.ReactElement {
  return (
    <MenuPrimitive.GroupLabel
      className={cn(
        "px-3 pt-2 pb-1 font-medium text-[11px] text-pebble uppercase tracking-[0.08em] data-inset:ps-9.5",
        className,
      )}
      data-inset={inset}
      data-slot="menu-label"
      {...props}
    />
  );
}

export function MenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props): React.ReactElement {
  return (
    <MenuPrimitive.Separator
      className={cn("mx-3 my-1.5 h-px bg-(--hairline)", className)}
      data-slot="menu-separator"
      {...props}
    />
  );
}

export function MenuShortcut({
  className,
  ...props
}: React.ComponentProps<"kbd">): React.ReactElement {
  return (
    <kbd
      className={cn(
        "ms-auto ps-4 font-sans text-[13px] text-pebble tracking-wide",
        className,
      )}
      data-slot="menu-shortcut"
      {...props}
    />
  );
}

export function MenuSub(
  props: MenuPrimitive.SubmenuRoot.Props,
): React.ReactElement {
  return <MenuPrimitive.SubmenuRoot data-slot="menu-sub" {...props} />;
}

export function MenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean;
}): React.ReactElement {
  return (
    <MenuPrimitive.SubmenuTrigger
      className={cn(
        ROW,
        "cursor-pointer data-popup-open:bg-mist",
        className,
      )}
      data-inset={inset}
      data-slot="menu-sub-trigger"
      {...props}
    >
      {children}
      <ChevronRightIcon className="ms-auto -me-0.5" />
    </MenuPrimitive.SubmenuTrigger>
  );
}

export function MenuSubPopup({
  className,
  sideOffset = 0,
  alignOffset,
  align = "start",
  ...props
}: MenuPrimitive.Popup.Props & {
  align?: MenuPrimitive.Positioner.Props["align"];
  sideOffset?: MenuPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: MenuPrimitive.Positioner.Props["alignOffset"];
}): React.ReactElement {
  const defaultAlignOffset = align !== "center" ? -5 : undefined;

  return (
    <MenuPopup
      align={align}
      alignOffset={alignOffset ?? defaultAlignOffset}
      className={className}
      data-slot="menu-sub-content"
      side="inline-end"
      sideOffset={sideOffset}
      {...props}
    />
  );
}

export {
  Menu as DropdownMenu,
  MenuCheckboxItem as DropdownMenuCheckboxItem,
  MenuCreateHandle as DropdownMenuCreateHandle,
  MenuGroup as DropdownMenuGroup,
  MenuGroupLabel as DropdownMenuLabel,
  MenuItem as DropdownMenuItem,
  MenuPopup as DropdownMenuContent,
  MenuPortal as DropdownMenuPortal,
  MenuPrimitive,
  MenuRadioGroup as DropdownMenuRadioGroup,
  MenuRadioItem as DropdownMenuRadioItem,
  MenuSeparator as DropdownMenuSeparator,
  MenuShortcut as DropdownMenuShortcut,
  MenuSub as DropdownMenuSub,
  MenuSubPopup as DropdownMenuSubContent,
  MenuSubTrigger as DropdownMenuSubTrigger,
  MenuTrigger as DropdownMenuTrigger,
};
