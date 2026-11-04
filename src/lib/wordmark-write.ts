/**
 * A pen writing the wordmark, "unive" or "unive.ai", from the drawing's own
 * centrelines (generator/wordmark_centerline.py). Pure functions of phase,
 * like un-wave.ts: phase 0..1 is one loop.
 *
 *   0    to 0.62  the pen writes, stroke by stroke, dots as quick taps
 *   0.62 to 0.74  it holds
 *   0.74 to 1     it lifts off from the start, in the same order
 */
import { easeInOut, strokeDiscs, type Sample } from "./un-wave";
import g from "./wordmark-geometry.json";

export type WordmarkText = "unive" | "unive.ai";

type Pts = number[][];
type Item =
  | { kind: "stroke"; at: (s: number) => Sample; length: number }
  | { kind: "dot"; x: number; y: number; rx: number; ry: number };

/** A dot costs as much pen time as this many px of stroke; lifts cost GAP. */
const DOT = 140;
const GAP = 90;
const WRITE_END = 0.62;
const LIFT_START = 0.74;
/** Pen speed, px of stroke per second: the icon loader's. */
const SPEED = 1700;

function stroke(pts: Pts): Item {
  const s = [0];
  for (let i = 1; i < pts.length; i++) s.push(s[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const length = s[s.length - 1];
  const at = (v: number): Sample => {
    const x = Math.min(Math.max(v, 0), length);
    let lo = 0;
    let hi = s.length - 1;
    while (hi - lo > 1) {
      const m = (lo + hi) >> 1;
      if (s[m] <= x) lo = m;
      else hi = m;
    }
    const t = s[hi] === s[lo] ? 0 : (x - s[lo]) / (s[hi] - s[lo]);
    const a = pts[lo];
    const b = pts[hi];
    return { x: a[0] + (b[0] - a[0]) * t, y: a[1] + (b[1] - a[1]) * t, r: a[2] + (b[2] - a[2]) * t };
  };
  return { kind: "stroke", at, length };
}
const dot = ([x, y, rx, ry]: number[]): Item => ({ kind: "dot", x, y, rx, ry });

/** In writing order: "uni" in one stroke, the i's dot, v, e; then ., "ai", its dot. */
const UNIVE: Item[] = [stroke(g.uni), dot(g.dot), stroke(g.v), stroke(g.e)];
const AI: Item[] = [dot(g.period), stroke(g.ai), dot(g.aiDot)];

function timeline(text: WordmarkText) {
  const items = text === "unive" ? UNIVE : [...UNIVE, ...AI];
  let t = 0;
  const spans = items.map((item) => {
    const start = t;
    t += item.kind === "stroke" ? item.length : DOT;
    const span = { item, start, end: t };
    t += GAP;
    return span;
  });
  return { spans, total: t - GAP };
}
const TIMELINES = { unive: timeline("unive"), "unive.ai": timeline("unive.ai") };

/** The artwork's box for each lockup, in artwork px. */
export function wordmarkBox(text: WordmarkText) {
  const right = text === "unive" ? 1809.7 : g.aiRight + 24;
  return { x: 204.5, y: 50, width: right - 204.5, height: 561 };
}

/** One loop, in ms, at the icon loader's pen speed. */
export function wordmarkDuration(text: WordmarkText) {
  return Math.round((TIMELINES[text].total / SPEED / WRITE_END) * 1000);
}

function ellipse(x: number, y: number, rx: number, ry: number) {
  const f = (v: number) => (Math.round(v * 10) / 10).toString();
  return `M${f(x - rx)} ${f(y)}a${f(rx)} ${f(ry)} 0 1 0 ${f(2 * rx)} 0a${f(rx)} ${f(ry)} 0 1 0 ${f(-2 * rx)} 0`;
}

/** The written part of the wordmark at `phase`, as one path. */
export function wordmarkWritePath(phase: number, text: WordmarkText, step = 6): string {
  const { spans, total } = TIMELINES[text];
  const p = ((phase % 1) + 1) % 1;
  const head = easeInOut(Math.min(1, p / WRITE_END)) * total;
  const tail = easeInOut(Math.max(0, (p - LIFT_START) / (1 - LIFT_START))) * total;
  let d = "";
  for (const { item, start, end } of spans) {
    if (head <= start || tail >= end) continue;
    const a = Math.max(tail, start) - start;
    const b = Math.min(head, end) - start;
    if (item.kind === "stroke") {
      if (b - a > 0.5) d += strokeDiscs(item.at, a, b, { step });
    } else {
      // A tap: the dot swells in as the pen lands and shrinks away on lift.
      const k = (b - a) / DOT;
      const s = Math.sin((Math.min(1, k) * Math.PI) / 2);
      if (s > 0.02) d += ellipse(item.x, item.y, item.rx * s, item.ry * s);
    }
  }
  return d;
}
