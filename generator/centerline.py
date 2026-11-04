"""
Centreline and width profile of the "un" icon, extracted from the traced
artwork (not redrawn). The loaders animate this: the stroke flows along its
own centreline like a wave.

    python3 -I centerline.py     # writes ../src/lib/un-geometry.json
"""
from __future__ import annotations

import collections
import json
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import cv2
import numpy as np

import logo as T

OUT = pathlib.Path(__file__).resolve().parent.parent / "src" / "lib" / "un-geometry.json"


def thin(m: np.ndarray) -> np.ndarray:
    """Zhang-Suen thinning, vectorised."""
    img = np.pad(m.astype(np.uint8), 1)
    while True:
        changed = False
        for step in (0, 1):
            P = [img[1:-1, 1:-1], img[:-2, 1:-1], img[:-2, 2:], img[1:-1, 2:], img[2:, 2:],
                 img[2:, 1:-1], img[2:, :-2], img[1:-1, :-2], img[:-2, :-2]]
            p1, p2, p3, p4, p5, p6, p7, p8, p9 = P
            nb = [p2, p3, p4, p5, p6, p7, p8, p9, p2]
            B = sum(n.astype(int) for n in nb[:8])
            A = sum(((nb[i] == 0) & (nb[i + 1] == 1)).astype(int) for i in range(8))
            if step == 0:
                c = (p2 * p4 * p6 == 0) & (p4 * p6 * p8 == 0)
            else:
                c = (p2 * p4 * p8 == 0) & (p2 * p6 * p8 == 0)
            rm = (p1 == 1) & (B >= 2) & (B <= 6) & (A == 1) & c
            if rm.any():
                img[1:-1, 1:-1][rm] = 0
                changed = True
        if not changed:
            return img[1:-1, 1:-1]


def skeleton_path(small):
    """Shortest skeleton path from the top of the first stem to the foot of
    the last; spurs are skipped automatically."""
    sk = thin(small)
    pts = set(zip(*np.nonzero(sk)))
    near = lambda p: min(pts, key=lambda q: (q[0] - p[0]) ** 2 + (q[1] - p[1]) ** 2)
    start, goal = near((933, 619)), near((1820, 1953))  # (y, x) at 2x
    prev, dq = {start: None}, collections.deque([start])
    while dq:
        p = dq.popleft()
        if p == goal:
            break
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                q = (p[0] + dy, p[1] + dx)
                if q in pts and q not in prev:
                    prev[q] = p
                    dq.append(q)
    path, p = [], goal
    while p:
        path.append(p)
        p = prev[p]
    return np.array(path[::-1], float)[:, ::-1] / 2  # (x, y) artwork px


def resample(P, step):
    s = np.concatenate([[0], np.cumsum(np.hypot(*np.diff(P, axis=0).T))])
    t = np.arange(0, s[-1], step)
    return np.stack([np.interp(t, s, P[:, 0]), np.interp(t, s, P[:, 1])], 1)


def gauss(a, sig):
    k = np.exp(-0.5 * (np.arange(-3 * sig, 3 * sig + 1) / sig) ** 2)
    k /= k.sum()
    return np.convolve(np.pad(a, (len(k) // 2,), mode="edge"), k, "valid")


def catmull(P, n=10):
    P = np.vstack([P[:1], P, P[-1:]])
    out = []
    for i in range(1, len(P) - 2):
        p0, p1, p2, p3 = P[i - 1], P[i], P[i + 1], P[i + 2]
        for t in np.linspace(0, 1, n, endpoint=False):
            out.append(0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t
                              + (-p0 + 3 * p1 - 3 * p2 + p3) * t ** 3))
    out.append(P[-2])
    return np.array(out)


# The squiggle's counters are slits in the drawing, so the skeleton cuts
# straight through it. The stroke really runs up stem 2 to the top, down
# stem 3 to the baseline and up stem 4; these points (artwork px, measured
# on the icon) guide it there.
SQUIGGLE = [(494, 700), (503, 650), (510, 600), (513, 550), (516, 505), (525, 472), (545, 455),
            (565, 451), (585, 456), (598, 474), (601, 510), (600, 560), (599, 610), (602, 660),
            (614, 710), (630, 760), (641, 810), (645, 860), (650, 905), (664, 930), (680, 937),
            (696, 930), (710, 905), (716, 860), (719, 810), (724, 760), (731, 715)]


def main():
    m = T.icon()
    small = (cv2.resize(m, None, fx=0.5, fy=0.5, interpolation=cv2.INTER_AREA) > 0).astype(np.uint8)
    dist = cv2.distanceTransform(small, cv2.DIST_L2, 5) / 2.0
    sk = resample(skeleton_path(small), 2)
    sk = np.stack([gauss(sk[:, 0], 6), gauss(sk[:, 1], 6)], 1)
    s = np.concatenate([[0], np.cumsum(np.hypot(*np.diff(sk, axis=0).T))])
    a, b = np.searchsorted(s, 650), np.searchsorted(s, 1302)
    guide = np.vstack([sk[:a:12], np.array(SQUIGGLE, float), sk[b + 10::12], sk[-1:]])
    P = resample(catmull(guide), 2)
    W = np.array([dist[int(round(y * 2)), int(round(x * 2))] for x, y in P])
    P = np.stack([gauss(P[:, 0], 7), gauss(P[:, 1], 7)], 1)
    # Near the slit tips the distance transform reads the slit as an edge and
    # thins the stem; no stem in the drawing is thinner than r = 42.
    R = gauss(np.maximum(W, 42), 10) * 1.03  # stroke radius

    # Fit check against the traced icon.
    rec = np.zeros((m.shape[0] // 4, m.shape[1] // 4), np.uint8)
    for (x, y), r in zip(P, R):
        cv2.circle(rec, (int(round(x)), int(round(y))), int(round(r)), 1, -1)
    orig = cv2.resize(m, (rec.shape[1], rec.shape[0]), interpolation=cv2.INTER_AREA) > 0
    r = rec.astype(bool)
    print(f"fit IoU {(r & orig).sum() / (r | orig).sum():.3f}")

    # One period of the wave: from stem 1 to stem 5, both cut where they
    # descend through the same height, so the pattern tiles seamlessly.
    cut_y = 690.0
    down = np.diff(P[:, 1]) > 0
    cross = [i for i in range(len(P) - 1) if down[i] and P[i, 1] <= cut_y < P[i + 1, 1]]
    i0, i1 = cross[0], cross[-1]
    s = np.concatenate([[0], np.cumsum(np.hypot(*np.diff(P, axis=0).T))])
    print(f"stem 1 cut x={P[i0, 0]:.1f} r={R[i0]:.1f}   stem 5 cut x={P[i1, 0]:.1f} r={R[i1]:.1f}")

    period = P[i0:i1 + 1].copy()
    radius = R[i0:i1 + 1].copy()
    shift = period[-1] - period[0]
    # Blend the radius across the seam so it tiles without a step.
    n = len(radius)
    ramp = np.clip(np.arange(n) / 60, 0, 1) * np.clip((n - 1 - np.arange(n)) / 60, 0, 1)
    seam = (radius[0] + radius[-1]) / 2
    radius = seam + (radius - seam) * ramp
    # Snap the period's end exactly onto (start + shift).
    period[-1] = period[0] + shift

    out = {
        "note": "Generated by generator/centerline.py from the traced icon. Do not edit.",
        "units": "artwork px (icon canvas 1254x1254)",
        "period": [[round(x, 2), round(y, 2), round(r, 2)] for (x, y), r in zip(period, radius)],
        "shift": [round(shift[0], 2), round(shift[1], 2)],
        "tail": round(float(s[i0]), 2),          # icon length before the seam
        "head": round(float(s[-1] - s[i1]), 2),  # icon length after the seam
        "full": [[round(x, 2), round(y, 2), round(r, 2)] for (x, y), r in zip(P[::2], R[::2])],
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(out, separators=(",", ":")))
    print("wrote", OUT.name, f"{OUT.stat().st_size / 1024:.0f} KB", "period pts", n, "shift", out["shift"])


if __name__ == "__main__":
    main()
