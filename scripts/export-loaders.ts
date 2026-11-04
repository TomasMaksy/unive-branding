/**
 * Writes the loaders as self-contained looping SVGs (SMIL, no JS), for
 * places React can't reach: emails, Webflow, native splash, <img src>.
 *
 *   bun scripts/export-loaders.ts      # writes public/loaders/*.svg
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  UN_VIEWBOX as B,
  easeInOut,
  HEAD,
  ICON_LENGTH,
  onIcon,
  onWave,
  PERIOD_LENGTH,
  type Sample,
  SHIFT,
  TAIL,
  TRIM,
} from "../src/lib/un-wave";

const OUT = fileURLToPath(new URL("../public/loaders/", import.meta.url));
const INK = "#1D1B18";
/** One disc per 11 artwork px: the edge stays smooth past 300 px tall. */
const SPACING = 11;
const f1 = (v: number) => (Math.round(v * 10) / 10).toString();
const f4 = (v: number) => (Math.round(v * 1e4) / 1e4).toString();
const f5 = (v: number) => (Math.round(v * 1e5) / 1e5).toString();

function svg(label: string, body: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="${B.x} ${B.y} ${B.width} ${B.height}" role="img" aria-label="${label}"><title>${label}</title>${body}</svg>\n`;
}

/**
 * A centreline as an SVG path, sampled every 2 px from `a` to `b`, and a
 * map from stroke position to the fraction of the path's length there.
 */
function rail(at: (s: number) => Sample, a: number, b: number) {
  const n = Math.ceil((b - a) / 2);
  const pts = Array.from({ length: n + 1 }, (_, i) => at(a + ((b - a) * i) / n));
  const len = [0];
  for (let i = 1; i <= n; i++) len.push(len[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
  const total = len[n];
  const frac = (s: number) => {
    const u = Math.min(n, Math.max(0, ((s - a) / (b - a)) * n));
    const i = Math.min(n - 1, Math.floor(u));
    return (len[i] + (len[i + 1] - len[i]) * (u - i)) / total;
  };
  const d = `M${pts.map((p) => `${f1(p.x)} ${f1(p.y)}`).join("L")}`;
  return { d, frac };
}

/**
 * A value over one loop, sampled densely, as SMIL `values` and `keyTimes`.
 * SMIL interpolates linearly between keys, and every key is a corner in
 * the motion: with evenly spaced keys (16 or 28 per loop) those corners
 * came several times a second and read as shaking. Here keys go only
 * where the curve bends, so the linear pieces stay within `tol` artwork px
 * of the true motion (well under a screen pixel at any size).
 */
function keys(f: (t: number) => number, tol: number, samples = 600) {
  const T = Array.from({ length: samples + 1 }, (_, i) => i / samples);
  const V = T.map(f);
  const keep = new Set([0, samples]);
  const split = (a: number, b: number) => {
    let worst = -1;
    let at = -1;
    for (let i = a + 1; i < b; i++) {
      const lin = V[a] + ((V[b] - V[a]) * (T[i] - T[a])) / (T[b] - T[a]);
      const e = Math.abs(V[i] - lin);
      if (e > worst) [worst, at] = [e, i];
    }
    if (worst > tol) {
      keep.add(at);
      split(a, at);
      split(at, b);
    }
  };
  split(0, samples);
  const idx = [...keep].sort((x, y) => x - y);
  return { values: idx.map((i) => V[i]), times: idx.map((i) => T[i]) };
}

/**
 * Both loaders are a row of discs, each riding the centreline with
 * <animateMotion>, so every disc follows the real curve and the edge stays
 * still. (Morphing an outline re-samples its edge every frame: it shimmers.)
 */
const TOL = 0.45;
function disc(r: (t: number) => number, at: (t: number) => number, frac: (s: number) => number, length: number, dur: number) {
  const R = keys(r, TOL);
  const M = keys(at, TOL);
  const rv = R.values.map(f1).join(";");
  return (
    `<circle r="${f1(R.values[0])}">` +
    `<animate attributeName="r" dur="${dur}s" repeatCount="indefinite" values="${rv}" keyTimes="${R.times.map(f4).join(";")}"/>` +
    `<animateMotion dur="${dur}s" repeatCount="indefinite" calcMode="linear" keyPoints="${M.values.map((s) => f5(frac(s))).join(";")}" keyTimes="${M.times.map(f4).join(";")}"><mpath xlink:href="#c"/></animateMotion></circle>`
  );
}

/** Flow: the discs travel one period along the wave while the view follows. */
function flow(dur = 2.4) {
  const a = -TAIL * TRIM;
  const len = PERIOD_LENGTH + (TAIL + HEAD) * TRIM;
  const R = rail(onWave, a, a + len + PERIOD_LENGTH);
  const n = Math.ceil(len / SPACING);
  let discs = "";
  for (let k = 0; k <= n; k++) {
    const o = a + (len * k) / n;
    discs += disc((t) => onWave(o + PERIOD_LENGTH * t).r, (t) => o + PERIOD_LENGTH * t, R.frac, len, dur);
  }
  // After one period the wave looks exactly as it started, a period on:
  // the view moves back by SHIFT, so the loop closes without a seam.
  return svg(
    "Loading",
    `<defs><path id="c" d="${R.d}"/></defs><g fill="${INK}"><animateTransform attributeName="transform" type="translate" dur="${dur}s" repeatCount="indefinite" values="0 0;${f1(-SHIFT[0])} ${f1(-SHIFT[1])}"/>${discs}</g>`,
  );
}

/** Write: the pen writes the icon, then lifts it off from the start. */
function write(dur = 2.8) {
  const R = rail(onIcon, 0, ICON_LENGTH);
  const n = Math.ceil(ICON_LENGTH / SPACING);
  const head = (p: number) => easeInOut(Math.min(1, p / 0.5)) * ICON_LENGTH;
  const tail = (p: number) => easeInOut(Math.max(0, (p - 0.5) / 0.5)) * ICON_LENGTH;
  let discs = "";
  for (let k = 0; k <= n; k++) {
    const at = (p: number) => tail(p) + ((head(p) - tail(p)) * k) / n;
    discs += disc((p) => onIcon(at(p)).r, at, R.frac, ICON_LENGTH, dur);
  }
  return svg(
    "Loading",
    `<defs><path id="c" d="${R.d}"/></defs><g fill="${INK}">` +
      // The pen's touch-down and lift-off fade rather than pop.
      `<animate attributeName="opacity" dur="${dur}s" repeatCount="indefinite" values="0;1;1;0;0" keyTimes="0;0.04;0.95;0.99;1"/>${discs}</g>`,
  );
}

mkdirSync(OUT, { recursive: true });
for (const [name, text] of [
  ["un-flow.svg", flow()],
  ["un-write.svg", write()],
] as const) {
  writeFileSync(join(OUT, name), text);
  console.log(name, `${(text.length / 1024).toFixed(0)} KB`);
}
