import { cn } from "cn";
import { CircleAlertIcon, CircleCheckIcon, InfoIcon, TriangleAlertIcon, XIcon } from "lucide-react";
import type * as React from "react";
import { UnLoader } from "@/components/brand/un-loader";

/**
 * A floating note: the menu's surface (a white squircle with a soft
 * shadow), a filled state disc, a title and an optional line under it.
 * `loading` swaps the disc for the flowing "un".
 */
export type ToastVariant = "success" | "error" | "warning" | "info" | "loading";

const ICONS: Record<Exclude<ToastVariant, "loading">, React.ReactNode> = {
  success: <CircleCheckIcon className="size-5 fill-success text-white" />,
  error: <CircleAlertIcon className="size-5 fill-danger text-white" />,
  warning: <TriangleAlertIcon className="size-5 fill-warning text-white" />,
  info: <InfoIcon className="size-5 fill-ink text-white" />,
};

export function Toast({
  variant = "success",
  title,
  description,
  action,
  onDismiss,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  variant?: ToastVariant;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** A small button on the end: Undo, Retry. */
  action?: React.ReactNode;
  /** Shows a small × that calls this. Timing and stacking stay with the caller. */
  onDismiss?: () => void;
}): React.ReactElement {
  const loading = variant === "loading";
  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={cn(
        "squircle flex w-full max-w-sm gap-3 bg-white px-4 py-3.5 text-[15px] text-ink [--sq:var(--radius-xl)] shadow-[0_8px_28px_rgb(29_27_24/0.10),0_0_0_1px_rgb(29_27_24/0.06)]",
        description && !loading ? "items-start" : "items-center",
        className,
      )}
      data-slot="toast"
      data-variant={variant}
      {...props}
    >
      {loading ? (
        <span className="grid h-5 w-6 shrink-0 place-items-center">
          <UnLoader size={14} label="" className="block text-ink" />
        </span>
      ) : (
        <span className="shrink-0">{ICONS[variant]}</span>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="font-medium">{title}</span>
        {description ? <span className="text-graphite">{description}</span> : null}
      </div>
      {action ? <div className="-me-1 shrink-0 self-center">{action}</div> : null}
      {onDismiss ? (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          className="-me-1.5 -mt-0.5 grid size-7 shrink-0 cursor-pointer place-items-center self-start rounded-full text-pebble transition-colors hover:bg-ink/[0.05] hover:text-ink"
        >
          <XIcon className="size-4" />
        </button>
      ) : null}
    </div>
  );
}
