"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "cn";
import { SearchIcon } from "lucide-react";
import type * as React from "react";

export type InputProps = Omit<
  InputPrimitive.Props & React.RefAttributes<HTMLInputElement>,
  "size"
> & {
  size?: "xs" | "sm" | "default" | "lg" | number;
  unstyled?: boolean;
  nativeInput?: boolean;
  inputClassName?: string;
};

export function Input({
  className,
  inputClassName: inputClassNameProp,
  size = "default",
  unstyled = false,
  nativeInput = false,
  style,
  ...props
}: InputProps): React.ReactElement {
  const inputClassName = cn(
    "h-10 w-full min-w-0 rounded-[inherit] px-4 leading-10 outline-none [transition:background-color_5000000s_ease-in-out_0s] placeholder:text-pebble",
    size === "xs" &&
      "h-8 px-3 text-sm leading-8",
    size === "sm" &&
      "h-9 px-3.5 leading-9",
    size === "lg" && "h-12 px-5 text-base leading-12",
    props.type === "search" &&
      "pl-10 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
    props.type === "file" &&
      "text-graphite file:me-3 file:bg-transparent file:font-medium file:text-ink file:text-sm",
    inputClassNameProp,
  );

  return (
    <span
      className={
        cn(
          !unstyled &&
            // iOS field: a filled warm grey with no border, white with a
            // meadow ring while focused. Every one-line field is a capsule;
            // only the multi-line textarea is a squircle.
            cn("inline-flex", "relative w-full bg-mist text-[15px] text-foreground transition-[background-color,box-shadow] duration-200 hover:bg-mist-hover has-focus-visible:bg-white has-focus-visible:shadow-[0_0_0_1.5px_var(--meadow),0_0_0_5px_color-mix(in_oklab,var(--meadow)_16%,transparent)] has-aria-invalid:bg-danger-soft has-aria-invalid:shadow-[0_0_0_1.5px_var(--danger)] has-focus-visible:has-aria-invalid:bg-white has-focus-visible:has-aria-invalid:shadow-[0_0_0_1.5px_var(--danger),0_0_0_5px_color-mix(in_oklab,var(--danger)_16%,transparent)] has-disabled:opacity-48", "rounded-full"),
          className,
        ) || undefined
      }
      data-size={size}
      data-slot="input-control"
    >
      {props.type === "search" && !unstyled ? (
        <SearchIcon aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-pebble" />
      ) : null}
      {nativeInput ? (
        <input
          className={inputClassName}
          data-slot="input"
          size={typeof size === "number" ? size : undefined}
          style={typeof style === "function" ? undefined : style}
          {...props}
        />
      ) : (
        <InputPrimitive
          className={inputClassName}
          data-slot="input"
          size={typeof size === "number" ? size : undefined}
          style={style}
          {...props}
        />
      )}
    </span>
  );
}

export { InputPrimitive };
