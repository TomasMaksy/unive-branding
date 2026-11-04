"""
Unive logo, traced from the original hand-drawn artwork and edited as shapes.

The original drawings (source/original-*.webp) are the master. This script
traces them into clean SVG and applies a short, explicit list of edits, so
every change to the original is visible in code and easy to undo:

  wordmark  - traced as drawn (u-n-i joined); e moved 14px right because
              v and e crowded each other
  icon      - the dot is dropped: the body alone reads "un". The favicon is
              the same shape on an ink tile; at 16px the squiggle fills in
              to one solid middle stem, which still reads "un"

All coordinates are in the original artwork's pixels.

    python3 -I logo.py           # writes ../logo/*.svg
"""

from __future__ import annotations

import json
import math
import pathlib

import cv2
import numpy as np

HERE = pathlib.Path(__file__).resolve().parent
SRC = HERE / "source"
OUT = HERE.parent / "public" / "logo"
LIB = HERE.parent / "src" / "lib"

INK = "#1D1B18"
PAPER = "#F9F9F7"
MEADOW = "#6F7644"  # = --roadmap-olive in the web app

S = 4  # work at 4x the artwork's resolution for smooth edges


# --------------------------------------------------------------------------
# Raster helpers (all inputs in artwork pixels; scaled by S internally)
# --------------------------------------------------------------------------
def load(name: str) -> np.ndarray:
    g = cv2.imread(str(SRC / name), cv2.IMREAD_GRAYSCALE)
    g = cv2.resize(g, None, fx=S, fy=S, interpolation=cv2.INTER_CUBIC)
    return (g < 128).astype(np.uint8)


def capsule(m, p0, p1, r0, r1=None, value=1):
    """Tapered capsule from p0 (radius r0) to p1 (radius r1)."""
    r1 = r0 if r1 is None else r1
    p0, p1 = np.array(p0, float) * S, np.array(p1, float) * S
    r0, r1 = r0 * S, r1 * S
    d = p1 - p0
    n = np.array([-d[1], d[0]]) / (np.hypot(*d) or 1)
    poly = np.array([p0 + n * r0, p1 + n * r1, p1 - n * r1, p0 - n * r0])
    cv2.fillPoly(m, [poly.round().astype(np.int32)], value)
    cv2.circle(m, tuple(p0.round().astype(int)), int(round(r0)), value, -1)
    cv2.circle(m, tuple(p1.round().astype(int)), int(round(r1)), value, -1)
    return m


def rect(m, x0, y0, x1, y1, value=0):
    m[int(y0 * S):int(y1 * S), int(x0 * S):int(x1 * S)] = value
    return m


def shift(m, dx, dy=0):
    M = np.float32([[1, 0, dx * S], [0, 1, dy * S]])
    return cv2.warpAffine(m, M, (m.shape[1], m.shape[0]), flags=cv2.INTER_NEAREST)


def region(m, x0, y0, x1, y1):
    out = np.zeros_like(m)
    out[int(y0 * S):int(y1 * S), int(x0 * S):int(x1 * S)] = m[int(y0 * S):int(y1 * S), int(x0 * S):int(x1 * S)]
    return out


def soften(m, sigma=2.0):
    """Blur and re-threshold: melts seams from edits into one organic shape."""
    f = cv2.GaussianBlur(m.astype(np.float32), (0, 0), sigma * S)
    return (f > 0.5).astype(np.uint8)


def soften_region(m, x0, y0, x1, y1, sigma):
    sl = (slice(int(y0 * S), int(y1 * S)), slice(int(x0 * S), int(x1 * S)))
    pad = int(3 * sigma * S)
    big = (slice(sl[0].start - pad, sl[0].stop + pad), slice(sl[1].start - pad, sl[1].stop + pad))
    f = cv2.GaussianBlur(m[big].astype(np.float32), (0, 0), sigma * S)
    out = m.copy()
    out[sl] = (f[pad:-pad, pad:-pad] > 0.5).astype(np.uint8)
    return out


def components(m):
    n, lab, stats, _ = cv2.connectedComponentsWithStats(m, connectivity=8)
    return [(lab == i).astype(np.uint8) for i in range(1, n)], stats[1:]


# --------------------------------------------------------------------------
# Trace: contours -> smoothed closed cubic paths (holes kept, evenodd)
# --------------------------------------------------------------------------
def contour_path(pts: np.ndarray, spacing=9.0) -> str:
    return points_path(contour_points(pts, spacing))


def contour_points(pts: np.ndarray, spacing=9.0) -> np.ndarray:
    pts = pts.reshape(-1, 2).astype(float) / S
    # resample evenly along the contour
    closed = np.vstack([pts, pts[:1]])
    seg = np.hypot(*np.diff(closed, axis=0).T)
    s = np.concatenate([[0], np.cumsum(seg)])
    n = max(16, int(s[-1] / spacing))
    t = np.linspace(0, s[-1], n, endpoint=False)
    p = np.stack([np.interp(t, s, closed[:, 0]), np.interp(t, s, closed[:, 1])], 1)
    # light circular smoothing to remove pixel stair-steps
    k = np.array([1, 4, 6, 4, 1], float) / 16
    for _ in range(2):
        p = sum(np.roll(p, i - 2, axis=0) * k[i] for i in range(5))
    return p


def points_path(p: np.ndarray, decimals: int = 1) -> str:
    n = len(p)
    f = lambda v: f"{v[0]:.{decimals}f} {v[1]:.{decimals}f}"
    d = [f"M{f(p[0])}"]
    for i in range(n):
        p0, p1, p2, p3 = p[i - 1], p[i], p[(i + 1) % n], p[(i + 2) % n]
        d.append(f"C{f(p1 + (p2 - p0) / 6)} {f(p2 - (p3 - p1) / 6)} {f(p2)}")
    return "".join(d) + "Z"


def trace(m) -> list[str]:
    cs, _ = cv2.findContours(m, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE)
    return [contour_path(c) for c in cs if cv2.contourArea(c) > 20 * S * S]


def bbox_of(m):
    ys, xs = np.nonzero(m)
    return xs.min() / S, ys.min() / S, (xs.max() + 1) / S, (ys.max() + 1) / S


# --------------------------------------------------------------------------
# Wordmark edits
# --------------------------------------------------------------------------
def stroke(m, pts, radii, value=1):
    """A curved stroke: capsules between consecutive points."""
    for (a, b), (ra, rb) in zip(zip(pts, pts[1:]), zip(radii, radii[1:])):
        capsule(m, a, b, ra, rb, value)
    return m


def wordmark():
    """The original wordmark, traced as drawn: u-n-i joined, v and e free.

    One edit only. v and e crowded each other (31px at their closest, where
    every other gap is 44px or more), so e moves 14px right. Nothing else
    is redrawn.
    """
    m = load("original-wordmark.webp")
    parts, stats = components(m)
    by = {}
    for p, st in zip(parts, stats):
        x, y, w, h = st[:4] / S
        if y < 100:
            by["dot"] = p
        elif x < 300:
            by["uni"] = p
        elif x < 1300:
            by["v"] = p
        else:
            by["e"] = p
    out = by["uni"] | by["dot"] | by["v"] | shift(by["e"], 14)
    return soften(out, 1.0), by["dot"]


# --------------------------------------------------------------------------
# Icon edits
# --------------------------------------------------------------------------
def icon():
    """The original icon's body, no dot: it reads "un". Only smoothed."""
    m = load("original-icon.webp")
    parts, stats = components(m)
    body = next(p for p, st in zip(parts, stats) if st[1] / S > 380)
    return soften(body, 1.0)


# --------------------------------------------------------------------------
# SVG output
# --------------------------------------------------------------------------
def svg(paths, box, fill=INK, bg=None, rx=None, title="Unive"):
    x, y, w, h = box
    body = ""
    if bg:
        r = f' rx="{rx}"' if rx else ""
        body += f'<rect x="{x}" y="{y}" width="{w}" height="{h}"{r} fill="{bg}"/>'
    body += f'<path fill="{fill}" fill-rule="evenodd" d="{"".join(paths)}"/>'
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x} {y} {w} {h}" '
            f'role="img" aria-label="{title}"><title>{title}</title>{body}</svg>\n')


def tight(m, pad):
    x0, y0, x1, y1 = bbox_of(m)
    return (round(x0 - pad, 1), round(y0 - pad, 1), round(x1 - x0 + 2 * pad, 1), round(y1 - y0 + 2 * pad, 1))


def square(m, fill_ratio):
    x0, y0, x1, y1 = bbox_of(m)
    side = max(x1 - x0, y1 - y0) / fill_ratio
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    return (round(cx - side / 2, 1), round(cy - side / 2, 1), round(side, 1), round(side, 1))


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for old in OUT.glob("*.svg"):
        old.unlink()
    write = lambda n, t: (OUT / n).write_text(t)

    wm, _ = wordmark()
    ic = icon()

    write("wordmark-ink.svg", svg(trace(wm), tight(wm, 8)))
    write("wordmark-paper.svg", svg(trace(wm), tight(wm, 8), fill=PAPER))
    write("mark-ink.svg", svg(trace(ic), tight(ic, 8)))
    write("mark-paper.svg", svg(trace(ic), tight(ic, 8), fill=PAPER))
    ib = square(ic, 0.68)
    write("app-icon-ink.svg", svg(trace(ic), ib, fill=PAPER, bg=INK))
    write("app-icon-paper.svg", svg(trace(ic), ib, bg=PAPER))
    write("app-icon-meadow.svg", svg(trace(ic), ib, fill=PAPER, bg=MEADOW))
    fb = square(ic, 0.8)
    write("favicon.svg", svg(trace(ic), fb, fill=PAPER, bg=MEADOW, rx=round(fb[2] * 0.22)))  # meadow: it stands out in a row of tabs
    # The same paths for React (src/components/brand/logo.tsx).
    LIB.mkdir(parents=True, exist_ok=True)
    (LIB / "logo-paths.json").write_text(json.dumps({
        "note": "Generated by generator/logo.py. Do not edit.",
        "wordmark": {"viewBox": " ".join(map(str, tight(wm, 8))), "d": "".join(trace(wm))},
        "mark": {"viewBox": " ".join(map(str, tight(ic, 8))), "d": "".join(trace(ic))},
        "markSquare": {"viewBox": " ".join(map(str, ib))},
    }))
    print("wrote", sorted(p.name for p in OUT.glob("*.svg")), "and logo-paths.json")


if __name__ == "__main__":
    main()
