"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "cn";
import { XIcon } from "lucide-react";
import type React from "react";
import { useRef } from "react";
import { Button } from "./button";
import { ScrollArea } from "./scroll";

export const DialogCreateHandle: typeof DialogPrimitive.createHandle =
  DialogPrimitive.createHandle;

export const Dialog: typeof DialogPrimitive.Root = DialogPrimitive.Root;

export const DialogPortal: typeof DialogPrimitive.Portal =
  DialogPrimitive.Portal;

export function DialogTrigger(
  props: DialogPrimitive.Trigger.Props,
): React.ReactElement {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

export function DialogClose(
  props: DialogPrimitive.Close.Props,
): React.ReactElement {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

export function DialogBackdrop({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props): React.ReactElement {
  return (
    <DialogPrimitive.Backdrop
      className={cn(
        "fixed inset-0 z-[100] bg-ink/24 transition-all duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0",
        className,
      )}
      data-slot="dialog-backdrop"
      {...props}
    />
  );
}

export function DialogViewport({
  className,
  ...props
}: DialogPrimitive.Viewport.Props): React.ReactElement {
  return (
    <DialogPrimitive.Viewport
      className={cn(
        "fixed inset-0 z-[100] grid grid-rows-[1fr_auto_3fr] justify-items-center p-4",
        className,
      )}
      data-slot="dialog-viewport"
      {...props}
    />
  );
}

function DialogPopup({
  className,
  children,
  showCloseButton = true,
  closeProps,
  portalProps,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
  closeProps?: DialogPrimitive.Close.Props;
  portalProps?: DialogPrimitive.Portal.Props;
}): React.ReactElement {
  const popup = useRef<HTMLDivElement>(null);
  return (
    <DialogPortal {...portalProps}>
      <DialogBackdrop />
      <DialogViewport>
        <DialogPrimitive.Popup
          className={cn(
            // One white surface: no border, no footer bar, a soft shadow.
            "relative row-start-2 flex max-h-full min-h-0 w-full min-w-0 max-w-md origin-center flex-col squircle bg-white [--sq:var(--radius-3xl)] text-ink opacity-[calc(1-var(--nested-dialogs))] shadow-frame outline-none transition-[scale,opacity] duration-300 ease-unive will-change-transform data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:scale-96 data-starting-style:scale-96 sm:scale-[calc(1-0.1*var(--nested-dialogs))]",
            className,
          )}
          data-slot="dialog-popup"
          ref={popup}
          // Keyboard users land on the first control; a click opens it calm,
          // with no focus ring showing on a button.
          initialFocus={(type) => (type === "keyboard" ? true : popup.current)}
          {...props}
        >
          {children}
          {showCloseButton && (
            <DialogPrimitive.Close
              aria-label="Close"
              className="absolute end-3 top-3 text-pebble hover:text-ink"
              render={<Button size="icon-sm" variant="ghost" />}
              {...closeProps}
            >
              <XIcon />
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Popup>
      </DialogViewport>
    </DialogPortal>
  );
}

export function DialogHeader({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex flex-col gap-2 p-7 pe-14 pb-3",
      className,
    ),
    "data-slot": "dialog-header",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

/**
 * Buttons go in reading order, secondary first and primary last:
 *  - inline  (default) a row on the right; stacked full width on phones
 *  - stacked always full width, primary on top: for one decision that
 *            matters, or narrow dialogs
 *  - split   a tertiary action pinned left (Delete, Learn more), the rest
 *            on the right
 */
export function DialogFooter({
  className,
  variant = "default",
  layout = "inline",
  render,
  ...props
}: useRender.ComponentProps<"div"> & {
  variant?: "default" | "bare";
  layout?: "inline" | "stacked" | "split";
}): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex flex-col-reverse gap-2 px-7 pt-4 pb-7",
      layout === "inline" && "max-sm:*:w-full sm:flex-row sm:justify-end",
      layout === "stacked" && "*:w-full",
      layout === "split" && "max-sm:*:w-full sm:flex-row sm:justify-end sm:*:first:me-auto",
      variant === "bare" && "pt-2",
      className,
    ),
    "data-layout": layout,
    "data-slot": "dialog-footer",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function DialogTitle({
  className,
  ...props
}: DialogPrimitive.Title.Props): React.ReactElement {
  return (
    <DialogPrimitive.Title
      className={cn(
        "font-heading font-light text-2xl text-ink leading-tight tracking-[-0.03em]",
        className,
      )}
      data-slot="dialog-title"
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props): React.ReactElement {
  return (
    <DialogPrimitive.Description
      className={cn("text-graphite text-[15px] leading-relaxed", className)}
      data-slot="dialog-description"
      {...props}
    />
  );
}

export function DialogPanel({
  className,
  scrollFade = true,
  render,
  ...props
}: useRender.ComponentProps<"div"> & {
  scrollFade?: boolean;
}): React.ReactElement {
  const defaultProps = {
    className: cn(
      "px-7 py-2",
      className,
    ),
    "data-slot": "dialog-panel",
  };

  return (
    <ScrollArea scrollFade={scrollFade}>
      {useRender({
        defaultTagName: "div",
        props: mergeProps<"div">(defaultProps, props),
        render,
      })}
    </ScrollArea>
  );
}

export {
  DialogBackdrop as DialogOverlay,
  DialogPopup,
  DialogPopup as DialogContent,
  DialogPrimitive,
};
