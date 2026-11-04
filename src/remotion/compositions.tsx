/**
 * Remotion compositions for brand motion. Every value is a function of the
 * frame (no CSS animation), so a render is identical every time. Preview
 * them on /motion; render with the Remotion CLI.
 */
import type React from "react";
import { AbsoluteFill, Easing, Img, interpolate, useCurrentFrame } from "remotion";
import logo from "@/lib/logo-paths.json";
import { flowPath, iconPath, UN_VIEWBOX as B, writePath } from "@/lib/un-wave";

export const FPS = 30;
const INK = "#1D1B18";
const PAPER = "#F9F9F7";
/** The hero's entrance curve. */
const unive = Easing.bezier(0.22, 1, 0.36, 1);
const pen = Easing.bezier(0.65, 0, 0.35, 1);

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

function UnSvg({ children, width }: { children: React.ReactNode; width: number }) {
  return (
    <svg viewBox={`${B.x} ${B.y} ${B.width} ${B.height}`} width={width} fill={INK}>
      {children}
    </svg>
  );
}

/** Square loop: the "un" flows along itself. Two periods per loop. */
export const FLOW_FRAMES = 96;
export function FlowLoop({ background = PAPER, ink = INK }: { background?: string; ink?: string }) {
  const frame = useCurrentFrame();
  const f = flowPath((frame / FLOW_FRAMES) * 2);
  return (
    <AbsoluteFill style={{ background, alignItems: "center", justifyContent: "center" }}>
      <svg viewBox={`${B.x} ${B.y} ${B.width} ${B.height}`} width={640} fill={ink}>
        <path transform={`translate(${f.dx} ${f.dy})`} d={f.d} />
      </svg>
    </AbsoluteFill>
  );
}

/** Square loop: written, then lifted off. */
export const WRITE_FRAMES = 84;
export function WriteLoop({ background = PAPER, ink = INK }: { background?: string; ink?: string }) {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background, alignItems: "center", justifyContent: "center" }}>
      <svg viewBox={`${B.x} ${B.y} ${B.width} ${B.height}`} width={640} fill={ink}>
        <path d={writePath(frame / WRITE_FRAMES)} />
      </svg>
    </AbsoluteFill>
  );
}

/**
 * Brand sting, 16:9, 5 s.
 *   0-42   a pen writes the "un"
 *   42-102 it flows one wave length, settling back into itself
 *   96-150 it rises and gives way to the wordmark; the hero's meadow
 *          horizon rises behind, as it does on the landing page
 */
export const STING_FRAMES = 150;
export function BrandSting() {
  const frame = useCurrentFrame();

  const written = interpolate(frame, [0, 42], [0, 1], { ...clamp, easing: pen });
  const flow = interpolate(frame, [42, 102], [0, 1], { ...clamp, easing: Easing.inOut(Easing.sin) });
  const f = flowPath(flow);

  const iconOut = interpolate(frame, [96, 122], [0, 1], { ...clamp, easing: unive });
  const wordIn = interpolate(frame, [106, 136], [0, 1], { ...clamp, easing: unive });
  const horizon = interpolate(frame, [100, 150], [0, 1], { ...clamp, easing: unive });

  const iconStyle: React.CSSProperties = {
    position: "absolute",
    opacity: 1 - iconOut,
    translate: `0 ${-60 * iconOut}px`,
    scale: String(1 - 0.12 * iconOut),
  };

  return (
    <AbsoluteFill style={{ background: PAPER }}>
      <AbsoluteFill
        style={{
          top: "46%",
          opacity: horizon,
          translate: `0 ${(1 - horizon) * 28}%`,
          background: "linear-gradient(to bottom, #f9f9f7 0%, #e8e2d6 42%, #6a6348 82%, #413a2d 100%)",
        }}
      >
        <Img
          src="/scenes/horizon-2.webp"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "bottom",
            maskImage: "linear-gradient(to bottom, transparent, black 30%)",
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={iconStyle}>
          <UnSvg width={520}>
            {frame < 42 ? (
              <path d={iconPath(0, written)} />
            ) : (
              <path transform={`translate(${f.dx} ${f.dy})`} d={f.d} />
            )}
          </UnSvg>
        </div>
        <svg
          viewBox={logo.wordmark.viewBox}
          width={760}
          fill={INK}
          style={{ opacity: wordIn, translate: `0 ${(1 - wordIn) * 18}px`, marginTop: -160 }}
        >
          <path fillRule="evenodd" d={logo.wordmark.d} />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
