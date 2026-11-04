"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cn } from "cn";
import type React from "react";

export type TabsVariant = "default" | "underline";

export function Tabs({
  className,
  ...props
}: TabsPrimitive.Root.Props): React.ReactElement {
  return (
    <TabsPrimitive.Root
      className={cn(
        "flex flex-col gap-2 data-[orientation=vertical]:flex-row",
        className,
      )}
      data-slot="tabs"
      {...props}
    />
  );
}

export function TabsList({
  variant = "default",
  className,
  children,
  ...props
}: TabsPrimitive.List.Props & {
  variant?: TabsVariant;
}): React.ReactElement {
  return (
    <TabsPrimitive.List
      className={cn(
        "relative z-0 flex w-fit items-center justify-center gap-x-0.5",
        // Too many tabs for a narrow screen: the list scrolls on its own
        // instead of pushing the page wider.
        "data-[orientation=horizontal]:max-w-full data-[orientation=horizontal]:justify-start data-[orientation=horizontal]:overflow-x-auto data-[orientation=horizontal]:overscroll-x-contain data-[orientation=horizontal]:[scrollbar-width:none]",
        "data-[orientation=vertical]:flex-col",
        variant === "default"
          ? // iOS segmented control: a mist capsule, the active tab a white
            // capsule that slides with a soft spring.
            "rounded-full bg-mist p-1"
          : // Underline: a hairline along the list, the active tab's ink line
            // sitting on it. Hover changes colour only, no fill.
            "gap-x-1 data-[orientation=horizontal]:shadow-[inset_0_-1px_0_var(--hairline)] data-[orientation=vertical]:items-stretch data-[orientation=vertical]:shadow-[inset_1px_0_0_var(--hairline)] *:data-[slot=tabs-tab]:rounded-none *:data-[slot=tabs-tab]:px-3 data-[orientation=horizontal]:*:data-[slot=tabs-tab]:h-10 data-[orientation=vertical]:*:data-[slot=tabs-tab]:ps-4",
        className,
      )}
      data-slot="tabs-list"
      {...props}
    >
      {children}
      <TabsPrimitive.Indicator
        className={cn(
          "absolute bottom-0 left-0 h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) -translate-y-(--active-tab-bottom) transition-[width,translate] duration-300 ease-[cubic-bezier(.3,1.2,.45,1)]",
          variant === "underline"
            ? "z-10 rounded-full bg-ink data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:top-0 data-[orientation=vertical]:bottom-auto data-[orientation=vertical]:w-0.5 data-[orientation=vertical]:translate-x-0 data-[orientation=vertical]:translate-y-(--active-tab-top)"
            : "-z-1 rounded-full bg-white shadow-[0_1px_3px_rgb(29_27_24/0.12),0_0_0_0.5px_rgb(29_27_24/0.04)]",
        )}
        data-slot="tab-indicator"
      />
    </TabsPrimitive.List>
  );
}

export function TabsTab({
  className,
  ...props
}: TabsPrimitive.Tab.Props): React.ReactElement {
  return (
    <TabsPrimitive.Tab
      className={cn(
        // Solid colours only: grey text drawn at reduced opacity renders with
        // different antialiasing and looked heavier than the active label.
        "relative flex h-8 shrink-0 grow cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 font-medium text-[15px] text-pebble outline-none transition-colors duration-200 hover:text-graphite focus-visible:ring-2 focus-visible:ring-ring data-disabled:pointer-events-none data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start data-active:text-ink data-disabled:opacity-48 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:shrink-0",
        className,
      )}
      data-slot="tabs-tab"
      {...props}
    />
  );
}

export function TabsPanel({
  className,
  ...props
}: TabsPrimitive.Panel.Props): React.ReactElement {
  return (
    <TabsPrimitive.Panel
      className={cn("flex-1 outline-none", className)}
      data-slot="tabs-content"
      {...props}
    />
  );
}

export { TabsPanel as TabsContent, TabsPrimitive, TabsTab as TabsTrigger };
