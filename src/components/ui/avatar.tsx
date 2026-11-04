"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cn } from "cn";
import type React from "react";

/** A person: photo, or initials on mist. Size with className (size-6 to
 *  size-16); tint a fallback meadow-soft for the student themself. */
export function Avatar({
  className,
  ...props
}: AvatarPrimitive.Root.Props): React.ReactElement {
  return (
    <AvatarPrimitive.Root
      className={cn(
        "inline-flex size-8 shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-mist align-middle font-medium text-ink text-xs",
        className,
      )}
      data-slot="avatar"
      {...props}
    />
  );
}

export function AvatarImage({
  className,
  ...props
}: AvatarPrimitive.Image.Props): React.ReactElement {
  return (
    <AvatarPrimitive.Image
      className={cn("size-full object-cover", className)}
      data-slot="avatar-image"
      {...props}
    />
  );
}

export function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props): React.ReactElement {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-mist text-ink",
        className,
      )}
      data-slot="avatar-fallback"
      {...props}
    />
  );
}

export { AvatarPrimitive };
