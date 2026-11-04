/**
 * The "un" as a wave.
 *
 * `un-geometry.json` holds the icon's centreline and stroke radius, extracted
 * from the traced artwork by generator/centerline.py. One stretch of it (stem 1
 * to stem 5) is a period: repeated end to end it makes an endless "ununun"
 * wave. Every loader is a window onto that wave:
 *
 *   flow   the whole icon slides along its own path, like a wave travelling
 *          through water; the camera follows, so it stays in place
 *   write  the icon is written by a pen, then the pen lifts it off again
 *   ribbon a long, thin wave for progress, written left to right
 *
 * Everything here is a pure function of a phase or progress value, so the
 * same code drives requestAnimationFrame and the SVG exports.
 */
import geometry from "./un-geometry.json";

export type Sample = { x: number; y: number; r: number };

export const PERIOD = geometry.period as [number, number, number][];
export const FULL = geometry.full as [number, number, number][];
export const SHIFT = geometry.shift as [number, number];
/** Icon length before the period's seam, and after it. */
export const TAIL = geometry.tail;
export const HEAD = geometry.head;
/** The flow trims the stroke ends a little, where the endless wave would start to hook into the next letter. */
export const TRIM = 0.72;

export function arcLengths(points: [number, number, number][]): number[] {
  const s = [0];
  for (let i = 1; i < points.length; i++) {
    s.push(s[i - 1] + Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]));
  }
  return s;
}

const PERIOD_S = arcLengths(PERIOD);
const FULL_S = arcLengths(FULL);
/** Arc length of one period of the wave, in artwork px. */
export const PERIOD_LENGTH = PERIOD_S[PERIOD_S.length - 1];
/** Arc length of the whole icon. */
export const ICON_LENGTH = FULL_S[FULL_S.length - 1];

export function lookup(points: [number, number, number][], s: number[], at: number): Sample {
  let lo = 0;
  let hi = s.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (s[mid] <= at) lo = mid;
    else hi = mid;
  }
  const t = s[hi] === s[lo] ? 0 : (at - s[lo]) / (s[hi] - s[lo]);
  const a = points[lo];
  const b = points[hi];
  return { x: a[0] + (b[0] - a[0]) * t, y: a[1] + (b[1] - a[1]) * t, r: a[2] + (b[2] - a[2]) * t };
}

/** A point on the endless wave. s = 0 is where stem 1 is cut. */
export function onWave(s: number): Sample {
  const k = Math.floor(s / PERIOD_LENGTH);
  const p = lookup(PERIOD, PERIOD_S, s - k * PERIOD_LENGTH);
  return { x: p.x + k * SHIFT[0], y: p.y + k * SHIFT[1], r: p.r };
}

/** A point on the icon itself (with its real free ends). */
export function onIcon(s: number): Sample {
  return lookup(FULL, FULL_S, Math.min(Math.max(s, 0), ICON_LENGTH));
}

const fmt = (v: number) => (Math.round(v * 10) / 10).toString();

/**
 * A variable-width stroke drawn as overlapping discs along `at(s)`, one
 * path. With the nonzero fill rule the discs merge into one clean shape:
 * no folds on tight bends and no seams, at any size. `step` is the spacing
 * in artwork px; the edge ripples by about step² / 8r, so keep it near
 * DISC_STEP(px per artwork px) for the size you draw at.
 */
export function strokeDiscs(
  at: (s: number) => Sample,
  from: number,
  to: number,
  opts: { step?: number; width?: number; count?: number } = {},
): string {
  const len = to - from;
  if (len < 0) return "";
  const step = opts.step ?? 6;
  const w = opts.width ?? 1;
  // A fixed `count` gives every frame the same commands (for SMIL export):
  // each disc then glides along the stroke from frame to frame.
  const n = opts.count ?? Math.max(1, Math.ceil(len / step));
  let d = "";
  for (let i = 0; i <= n; i++) {
    const p = at(from + (len * i) / n);
    const r = p.r * w;
    if (r <= 0) continue;
    d += `M${fmt(p.x - r)} ${fmt(p.y)}a${fmt(r)} ${fmt(r)} 0 1 0 ${fmt(2 * r)} 0a${fmt(r)} ${fmt(r)} 0 1 0 ${fmt(-2 * r)} 0`;
  }
  return d;
}

/** Disc spacing that keeps the edge within ~0.15 screen px at `scale` px per artwork px. */
export const DISC_STEP = (scale: number) => Math.min(28, Math.max(3, Math.sqrt((8 * 40 * 0.15) / scale)));

/**
 * Outline of a variable-width stroke along `at(s)` for s in [from, to], with
 * round caps. On the inside of tight bends the offset is held inside the
 * bend's radius, so the outline never folds over itself.
 */
export function strokeOutline(
  at: (s: number) => Sample,
  from: number,
  to: number,
  opts: { step?: number; width?: number; count?: number } = {},
): string {
  // A fixed `count` keeps the same commands in every frame (SMIL can then
  // tween between frames); otherwise an empty stroke draws nothing.
  const len = opts.count ? Math.max(to - from, 0.01) : to - from;
  if (len < 1 && !opts.count) return "";
  const step = opts.step ?? 9;
  const widthScale = opts.width ?? 1;
  const n = opts.count ?? Math.max(8, Math.ceil(len / step));
  const pts: Sample[] = [];
  for (let i = 0; i <= n; i++) {
    const p = at(from + (len * i) / n);
    pts.push({ ...p, r: p.r * widthScale });
  }

  const left: [number, number][] = [];
  const right: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const a = pts[Math.max(0, i - 1)];
    const b = pts[Math.min(n, i + 1)];
    const p = pts[i];
    let tx = b.x - a.x;
    let ty = b.y - a.y;
    const tl = Math.hypot(tx, ty) || 1;
    tx /= tl;
    ty /= tl;
    // Signed curvature from the turn between neighbouring chords.
    let kappa = 0;
    if (i > 0 && i < n) {
      const ax = p.x - a.x;
      const ay = p.y - a.y;
      const bx = b.x - p.x;
      const by = b.y - p.y;
      const cross = ax * by - ay * bx;
      const la = Math.hypot(ax, ay);
      const lb = Math.hypot(bx, by);
      kappa = (2 * cross) / (la * lb * (la + lb) || 1);
    }
    const limit = kappa === 0 ? Number.POSITIVE_INFINITY : 0.97 / Math.abs(kappa);
    // Normal (-ty, tx) points to the left of travel. kappa > 0 turns left.
    const rl = kappa > 0 ? Math.min(p.r, limit) : p.r;
    const rr = kappa < 0 ? Math.min(p.r, limit) : p.r;
    left.push([p.x - ty * rl, p.y + tx * rl]);
    right.push([p.x + ty * rr, p.y - tx * rr]);
  }

  const capEnd = pts[n];
  const capStart = pts[0];
  let d = `M${fmt(left[0][0])} ${fmt(left[0][1])}`;
  d += smooth(left);
  d += `A${fmt(capEnd.r)} ${fmt(capEnd.r)} 0 0 0 ${fmt(right[n][0])} ${fmt(right[n][1])}`;
  d += smooth(right.slice().reverse());
  d += `A${fmt(capStart.r)} ${fmt(capStart.r)} 0 0 0 ${fmt(left[0][0])} ${fmt(left[0][1])}Z`;
  return d;
}

/** Quadratic smoothing through polyline midpoints (no corners, cheap). */
function smooth(p: [number, number][]): string {
  let d = "";
  for (let i = 1; i < p.length - 1; i++) {
    const mx = (p[i][0] + p[i + 1][0]) / 2;
    const my = (p[i][1] + p[i + 1][1]) / 2;
    d += `Q${fmt(p[i][0])} ${fmt(p[i][1])} ${fmt(mx)} ${fmt(my)}`;
  }
  const last = p[p.length - 1];
  d += `L${fmt(last[0])} ${fmt(last[1])}`;
  return d;
}

/** The icon's box in artwork px, with room for the flow's travel. */
export const UN_VIEWBOX = { x: 110, y: 340, width: 1040, height: 700 } as const;

/**
 * Flow: phase 0..1 is one full loop. The icon slides one period along its
 * own path while the camera follows, so frame 0 and frame 1 are identical.
 */
export function flowPath(
  phase: number,
  count?: number,
  step?: number,
): { d: string; dx: number; dy: number } {
  const p = ((phase % 1) + 1) % 1;
  const s = p * PERIOD_LENGTH;
  const from = s - TAIL * TRIM;
  const to = s + PERIOD_LENGTH + HEAD * TRIM;
  return {
    // A fixed `count` is for SMIL export (same commands every frame); live
    // drawing uses discs, which stay clean at any size.
    d: count ? strokeOutline(onWave, from, to, { count }) : strokeDiscs(onWave, from, to, { step }),
    dx: -p * SHIFT[0],
    dy: -p * SHIFT[1],
  };
}

/**
 * Write: phase 0..1. The pen writes the icon (0 to 0.5), then lifts it off
 * from the start (0.5 to 1). Empty at both ends, so it loops cleanly.
 */
export function writePath(
  phase: number,
  opts: { ease?: (t: number) => number; count?: number; step?: number } = {},
): string {
  const ease = opts.ease ?? easeInOut;
  const p = ((phase % 1) + 1) % 1;
  const head = ease(Math.min(1, p / 0.5)) * ICON_LENGTH;
  const tail = ease(Math.max(0, (p - 0.5) / 0.5)) * ICON_LENGTH;
  if (opts.count) return strokeOutline(onIcon, tail, head, { count: opts.count });
  return head - tail < 0.5 ? "" : strokeDiscs(onIcon, tail, head, { step: opts.step });
}

/** Part of the icon drawn from its centreline: 0..1 of its length. */
export function iconPath(from = 0, to = 1, step?: number): string {
  return strokeDiscs(onIcon, from * ICON_LENGTH, to * ICON_LENGTH, { step });
}

/**
 * Ribbon: an endless "ununun" wave for progress bars, at the logo's own
 * stroke weight (so it reads as the mark, not a thin squiggle). `periods`
 * across, flowing at `phase`; `value` 0..1 is how much of it is written.
 * Returns the path in RIBBON_BOX(periods).
 */
export function ribbonPath(value: number, phase: number, periods = 6, width = 1, step = 14): string {
  const s0 = (((phase % 1) + 1) % 1) * PERIOD_LENGTH;
  const total = periods * PERIOD_LENGTH;
  const v = Math.min(1, Math.max(0, value));
  if (v <= 0) return "";
  return strokeDiscs(
    (s) => {
      const p = onWave(s);
      return { x: p.x - (s0 / PERIOD_LENGTH) * SHIFT[0], y: p.y, r: p.r };
    },
    s0,
    s0 + total * v,
    { width, step },
  );
}

const WAVE_TOP = Math.min(...PERIOD.map((p) => p[1] - p[2]));
const WAVE_BOTTOM = Math.max(...PERIOD.map((p) => p[1] + p[2]));
const WAVE_R = Math.max(...PERIOD.map((p) => p[2]));

export const RIBBON_BOX = (periods = 6) => ({
  x: PERIOD[0][0] - WAVE_R - 8,
  y: WAVE_TOP - 8,
  width: periods * SHIFT[0] + 2 * WAVE_R + 16,
  height: WAVE_BOTTOM - WAVE_TOP + 16,
});

export function easeInOut(t: number): number {
  // cubic-bezier(0.65, 0, 0.35, 1)-like: a calm pen, slow in and out.
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}
