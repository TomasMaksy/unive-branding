/**
 * Writes the loaders as self-contained looping SVGs (SMIL, no JS), for
 * places React can't reach: emails, Webflow, native splash, <img src>.
 *
 *   bun scripts/export-loaders.ts      # writes public/loaders/*.svg
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { flowPath, UN_VIEWBOX as B, writePath } from "../src/lib/un-wave";

const OUT = fileURLToPath(new URL("../public/loaders/", import.meta.url));
const INK = "#1D1B18";
const int = (d: string) => d.replace(/-?\d+\.\d+/g, (n) => String(Math.round(Number(n))));

function svg(label: string, body: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${B.x} ${B.y} ${B.width} ${B.height}" role="img" aria-label="${label}"><title>${label}</title>${body}</svg>\n`;
}

function flow(frames = 48, dur = 2.4, count = 80) {
  const ds: string[] = [];
  const tx: string[] = [];
  for (let i = 0; i <= frames; i++) {
    const f = flowPath(i / frames, count);
    // The last frame equals the first one moved a period back: draw frame 0
    // again so the loop closes exactly.
    const g = i === frames ? flowPath(0, count) : f;
    ds.push(int(g.d));
    tx.push(i === frames ? "0 0" : `${f.dx.toFixed(1)} ${f.dy.toFixed(1)}`);
  }
  // Frame i's d is drawn in wave space; translate it by its own camera shift.
  return svg(
    "Loading",
    `<g><animateTransform attributeName="transform" type="translate" dur="${dur}s" repeatCount="indefinite" values="${tx.join(";")}"/>` +
      `<path fill="${INK}" d="${ds[0]}"><animate attributeName="d" dur="${dur}s" repeatCount="indefinite" values="${ds.join(";")}"/></path></g>`,
  );
}

function write(frames = 48, dur = 2.8, count = 80) {
  const ds: string[] = [];
  for (let i = 0; i <= frames; i++) ds.push(int(writePath((i / frames) % 1 || (i ? 0.9999 : 0), { count })));
  return svg(
    "Loading",
    `<path fill="${INK}" d="${ds[0]}"><animate attributeName="d" dur="${dur}s" repeatCount="indefinite" values="${ds.join(";")}"/>` +
      // The pen's touch-down and lift-off dots fade rather than pop.
      `<animate attributeName="opacity" dur="${dur}s" repeatCount="indefinite" values="0;1;1;0;0" keyTimes="0;0.04;0.95;0.99;1"/></path>`,
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
