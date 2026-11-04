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
/**
 * The iOS icon outline: a superellipse (|x|^5 + |y|^5 = 1), whose corners
 * ease into the sides with no visible join, unlike a rounded rectangle.
 */
function squircle(x: number, y: number, w: number, h: number, n = 5, steps = 96) {
  const pts: string[] = [];
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * 2 * Math.PI;
    const c = Math.cos(t);
    const s = Math.sin(t);
    const px = x + w / 2 + (w / 2) * Math.sign(c) * Math.abs(c) ** (2 / n);
    const py = y + h / 2 + (h / 2) * Math.sign(s) * Math.abs(s) ** (2 / n);
    pts.push(`${px.toFixed(1)} ${py.toFixed(1)}`);
  }
  return `M${pts.join("L")}Z`;
}

export function AppIcon({
  tone = "ink",
  rounded = "ios",
  className,
  style,
  title = "Unive",
}: {
  tone?: "ink" | "paper" | "meadow";
  rounded?: "ios" | "favicon" | "circle";
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}) {
  const [x, y, w, h] = logo.markSquare.viewBox.split(" ").map(Number);
  const bg = { ink: "var(--ink)", paper: "var(--paper)", meadow: "var(--meadow)" }[tone];
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
      {rounded === "ios" ? (
        <path d={squircle(x, y, w, h)} fill={bg} />
      ) : (
        <rect x={x} y={y} width={w} height={h} rx={rx} fill={bg} />
      )}
      {/* Paper on white or paper needs an edge to read as a tile. */}
      {tone === "paper" ? (
        rounded === "ios" ? (
          <path d={squircle(x, y, w, h)} fill="none" stroke="var(--hairline)" strokeWidth={w * 0.008} />
        ) : (
          <rect x={x} y={y} width={w} height={h} rx={rx} fill="none" stroke="var(--hairline)" strokeWidth={w * 0.008} />
        )
      ) : null}
      <path fillRule="evenodd" fill={fg} d={logo.mark.d} />
    </svg>
  );
}
