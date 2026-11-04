import { cn } from "cn";
import type React from "react";
import logo from "@/lib/logo-paths.json";

type LogoProps = Omit<React.SVGProps<SVGSVGElement>, "viewBox"> & {
  /** Accessible name. Pass "" when a visible label already names it. */
  title?: string;
};

function Glyph({ viewBox, d, title, className, ...props }: LogoProps & { viewBox: string; d: string }) {
  const named = title !== "";
  return (
    <svg
      viewBox={viewBox}
      role={named ? "img" : undefined}
      aria-label={named ? title : undefined}
      aria-hidden={named ? undefined : true}
      className={cn("block h-auto fill-current", className)}
      {...props}
    >
      <path fillRule="evenodd" d={d} />
    </svg>
  );
}

/** The hand-drawn "unive". Colour follows `currentColor`. */
export function Wordmark({ title = "Unive", ...props }: LogoProps) {
  return <Glyph viewBox={logo.wordmark.viewBox} d={logo.wordmark.d} title={title} {...props} />;
}

/** The "un" icon. It never has a dot. Colour follows `currentColor`. */
export function Mark({ title = "Unive", ...props }: LogoProps) {
  return <Glyph viewBox={logo.mark.viewBox} d={logo.mark.d} title={title} {...props} />;
}

/** The icon on a tile: the app icon, favicon and avatar shape. */
export function AppIcon({
  tone = "ink",
  rounded = "ios",
  className,
  style,
  title = "Unive",
}: {
  tone?: "ink" | "paper" | "meadow" | "brick";
  rounded?: "ios" | "favicon" | "circle";
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}) {
  const [x, y, w, h] = logo.markSquare.viewBox.split(" ").map(Number);
  const bg = { ink: "var(--ink)", paper: "var(--paper)", meadow: "var(--meadow)", brick: "var(--brick)" }[tone];
  const fg = tone === "paper" ? "var(--ink)" : "var(--paper)";
  const rx = rounded === "circle" ? w / 2 : rounded === "favicon" ? w * 0.22 : w * 0.225;
  return (
    <svg
      viewBox={logo.markSquare.viewBox}
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      className={cn("block", className)}
      style={style}
    >
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={bg} />
      <path fillRule="evenodd" fill={fg} d={logo.mark.d} />
    </svg>
  );
}
