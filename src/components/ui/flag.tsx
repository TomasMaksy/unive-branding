import { cn } from "cn";
import type * as React from "react";

/** "US" → 🇺🇸. The same helper as unive-v22's `flagFromCountryCode`. */
export function flagFromCountryCode(code: string): string {
  return String.fromCodePoint(...[...code.toUpperCase()].map((char) => 0x1f1e6 - 65 + char.charCodeAt(0)));
}

/**
 * A country's flag, as the emoji the product already uses. Decorative: the
 * country's name always sits next to it, so screen readers skip it.
 */
export function Flag({ code, className, ...props }: React.ComponentProps<"span"> & { code: string }): React.ReactElement {
  return (
    <span aria-hidden className={cn("inline-block shrink-0 text-lg leading-none", className)} data-slot="flag" {...props}>
      {flagFromCountryCode(code)}
    </span>
  );
}
