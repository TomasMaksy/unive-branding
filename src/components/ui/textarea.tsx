"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import { mergeProps } from "@base-ui/react/merge-props";
import { cn } from "cn";
import type * as React from "react";

export type TextareaProps = React.ComponentPropsWithoutRef<"textarea"> &
  React.RefAttributes<HTMLTextAreaElement> & {
    size?: "sm" | "default" | "lg" | number;
    unstyled?: boolean;
  };

export function Textarea({
  className,
  size = "default",
  unstyled = false,
  ref,
  ...props
}: TextareaProps): React.ReactElement {
  return (
    <span
      className={
        cn(
          !unstyled &&
            cn("flex min-w-0 max-w-full overflow-x-hidden squircle [--sq:var(--radius-lg)]", "relative w-full bg-mist text-[15px] text-foreground transition-[background-color,box-shadow] duration-200 hover:bg-mist-hover has-focus-visible:bg-white has-focus-visible:shadow-[0_0_0_1.5px_var(--meadow),0_0_0_5px_color-mix(in_oklab,var(--meadow)_16%,transparent)] has-aria-invalid:bg-danger-soft has-aria-invalid:shadow-[0_0_0_1.5px_var(--danger)] has-focus-visible:has-aria-invalid:bg-white has-focus-visible:has-aria-invalid:shadow-[0_0_0_1.5px_var(--danger),0_0_0_5px_color-mix(in_oklab,var(--danger)_16%,transparent)] has-disabled:opacity-48"),
          !unstyled && className,
        ) || undefined
      }
      data-size={size}
      data-slot="textarea-control"
    >
      <FieldPrimitive.Control
        ref={ref}
        value={props.value}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        render={(defaultProps: React.ComponentProps<"textarea">) => (
          <textarea
            className={cn(
              "field-sizing-content w-full min-w-0 max-w-full break-words rounded-[inherit] outline-none [overflow-wrap:anywhere]",
              // Text starts 16 px in, like the input's, so a form lines up.
              !unstyled && size === "default" && "min-h-24 px-4 py-2.5 placeholder:text-pebble",
              !unstyled && size === "sm" && "min-h-20 px-3.5 py-2 text-sm placeholder:text-pebble",
              !unstyled && size === "lg" && "min-h-28 px-5 py-3 text-base placeholder:text-pebble",
              unstyled && className,
            )}
            data-slot="textarea"
            {...mergeProps(defaultProps, props)}
          />
        )}
      />
    </span>
  );
}

export { FieldPrimitive };
