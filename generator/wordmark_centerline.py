"""
Pen paths through the wordmark: the centreline and stroke radius of each
letter, in the order a hand writes them. The wave-to-wordmark film morphs
the icon's "un" onto the first stretch of "uni" and then writes the rest.

    python3 -I wordmark_centerline.py   # writes ../src/lib/wordmark-geometry.json

Each glyph is guided by a few hand-placed points (artwork px, measured on
the original), then every point is pulled onto the stroke's medial ridge
and given the stroke's half-width there. A fit check prints the IoU of the
redrawn strokes against the traced letters.
"""
from __future__ import annotations

import json
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import cv2
import numpy as np

import logo as T
import strokefit as F
from centerline import catmull, gauss, resample

OUT = pathlib.Path(__file__).resolve().parent.parent / "src" / "lib" / "wordmark-geometry.json"

# How a hand writes it. "uni" is one stroke: down the u, up and over the
# hump, down into the valley, over the n's arch, down, then up the i and
# back down its stem to the tail. The i's stem is retraced, as in cursive.
# Where the drawing is one solid blob a fold below holds the guides.
GUIDES = {
    "uni": [
        (268, 196), (264, 280), (265, 380), (276, 460), (305, 505), (345, 518), (388, 500), (418, 455),
        (442, 385), (458, 310), (476, 240), (503, 190), (530, 240), (546, 310), (560, 400), (577, 490),
        (600, 546), (624, 495), (646, 400), (668, 300), (694, 240), (725, 212), (757, 204), (790, 213),
        (818, 240), (836, 300), (852, 400), (870, 490), (896, 548), (932, 532), (968, 498), (1000, 450),
        (1008, 360), (1010, 290), (1011, 236), (1012, 205), (1013, 236), (1014, 290),
        (1018, 380), (1031, 460), (1042, 515), (1054, 550),
    ],
    # Down the left arm, round the point, up the right arm.
    "v": [
        (1158, 204), (1176, 280), (1198, 380), (1222, 460), (1250, 515), (1282, 530), (1316, 505),
        (1344, 440), (1370, 360), (1398, 275), (1426, 202),
    ],
    # From the bar's left end, up and round the loop anticlockwise, down the
    # back, round the bowl and out to the tail.
    "e": [
        (1532, 412), (1580, 392), (1630, 368), (1676, 330), (1704, 280), (1708, 232), (1680, 200),
        (1636, 192), (1590, 210), (1548, 258), (1522, 320), (1512, 390), (1516, 456), (1534, 505),
        (1570, 538), (1615, 546), (1665, 533), (1710, 500), (1752, 462),
    ],
}

# Where the stroke folds back on itself (the hump between u and n, the
# valley, the i's top) the drawing is one solid blob, so the medial ridge
# would merge the two passes into a spike. The guides are kept there.
# Each fold: (x, y, zone radius, unused).
FOLDS = {"uni": [(503, 190, 150, 0), (600, 546, 125, 0), (896, 548, 50, 0), (1012, 205, 90, 0)], "v": [], "e": []}

# Where each pen path hands over: the icon's "un" maps onto uni[0:UN_END].
UN_END = (896, 544)


def fold_weight(P, folds):
    """1 away from every fold, easing to 0 inside a fold's zone."""
    keep = np.ones(len(P))
    for fx, fy, zone, _ in folds:
        keep = np.minimum(keep, np.clip((np.hypot(P[:, 0] - fx, P[:, 1] - fy) - zone) / 20, 0, 1))
    return keep


# Which ends are free tips (the e starts inside its own stroke).
FREE_ENDS = {"uni": (0, -1), "v": (0, -1), "e": (-1,)}


def glyph(name, mask, dx=0.0):
    P = resample(catmull(np.array(GUIDES[name], float), 12), 2)
    P = np.stack([gauss(P[:, 0], 4), gauss(P[:, 1], 4)], 1)
    keep = fold_weight(P, FOLDS[name])
    P, R = F.fit(P, mask, 2.0, keep=keep)
    P, R = F.ridge(P, R, mask, 2.0, keep)
    R = F.reach_edges(P, R, mask, 2.0, 1 - fold_weight(P, FOLDS[name]))
    # Close the hairline left between two passes over solid ink (u–n join).
    P, R = F.bridge(P, R, mask, 2.0)
    # And keep two passes from filling the tip of a narrow notch (the valley).
    P, R = F.trim_spill(P, R, mask, 2.0)
    P, R = F.extend_caps(P, R, mask, 2.0, ends=FREE_ENDS[name])
    P, R = F.resample(P, 2, R)
    P[:, 0] += dx
    return P, R


def dot_ai(out):
    """
    ".ai" in the same hand, for the unive.ai lockup. The artwork only spells
    "unive", so it is built from the drawing's own strokes: the a's stem and
    the joined i are the n's right leg and the i of "uni", moved along; only
    the a's bowl is new, drawn to the e's proportions with the pen's usual
    weight (heavier going down, lighter coming up). The period is a disc the
    size of the i's dot. One stroke, like "uni": round the bowl, down the
    stem, up into the i and back down; then the i's dot.
    """
    uni = np.array(out["uni"], float)
    near = lambda x, y: int(np.argmin(np.hypot(uni[:, 0] - x, uni[:, 1] - y)))
    leg = uni[near(836, 300):]  # the n's right leg below its arch, its foot, then the i

    # From the top right, over and down the left, round the bottom, up the
    # right side to x-height, and straight back down into the leg.
    bowl = np.array([
        (-2, -86), (-44, -100), (-106, -98), (-158, -66), (-190, 0), (-198, 86), (-186, 172),
        (-150, 228), (-98, 244), (-50, 220), (-22, 160), (-10, 80), (-4, 0), (-2, -50), (0, -84),
        (1, -44), (1, -8),
    ], float) + leg[0, :2]
    B = resample(catmull(bowl, 12), 4)
    T_ = np.gradient(B, axis=0)
    T_ /= np.linalg.norm(T_, axis=1, keepdims=True) + 1e-9
    r0 = float(leg[0, 2])
    BR = gauss(50 + 6 * T_[:, 1], 6)
    # The right side and the stem take the leg's weight, eased in.
    t = np.clip((np.arange(len(B)) / (len(B) - 1) - 0.62) / 0.3, 0, 1)
    w = t * t * (3 - 2 * t)
    BR = BR * (1 - w) + min(r0, 50) * w
    ai = np.vstack([np.column_stack([B, BR]), leg])

    e_right = max(x + r for x, y, r in out["e"])
    pr = 0.5 * (out["dot"][2] + out["dot"][3])
    period = [e_right + 34 + pr, 600 - pr, pr, pr]
    dx = period[0] + pr + 30 - (ai[:, 0] - ai[:, 2]).min()
    ai[:, 0] += dx
    i_dx = dx
    out["period"] = [round(v, 2) for v in period]
    out["ai"] = [[round(x, 2), round(y, 2), round(r, 2)] for x, y, r in ai]
    d = out["dot"]
    out["aiDot"] = [round(d[0] + i_dx, 2), d[1], d[2], d[3]]
    out["aiRight"] = round(float((ai[:, 0] + ai[:, 2]).max()), 2)


def main():
    m = T.load("original-wordmark.webp")
    parts, stats = T.components(m)
    by = {}
    for p, st in zip(parts, stats):
        x, y, w, h = st[:4] / T.S
        by["dot" if y < 100 else "uni" if x < 300 else "v" if x < 1300 else "e"] = p

    out = {
        "note": "Generated by generator/wordmark_centerline.py from the traced wordmark. Do not edit.",
        "units": "artwork px (wordmark canvas 2000x667), e already moved 14px right as in the logo",
    }
    full = np.zeros((m.shape[0] // 8, m.shape[1] // 8), np.uint8)
    rec = np.zeros_like(full)
    for name in ("uni", "v", "e"):
        small = (cv2.resize(by[name], None, fx=2 / T.S, fy=2 / T.S,
                            interpolation=cv2.INTER_AREA) > 0).astype(np.uint8)
        dx = 14.0 if name == "e" else 0.0
        P, R = glyph(name, small, dx)
        g = by[name] if name != "e" else T.shift(by[name], 14)
        full |= cv2.resize(g, (full.shape[1], full.shape[0]), interpolation=cv2.INTER_AREA) > 0
        for (x, y), r in zip(P, R):
            cv2.circle(rec, (int(round(x / 2)), int(round(y / 2))), int(round(r / 2)), 1, -1)
        out[name] = [[round(x, 2), round(y, 2), round(r, 2)] for (x, y), r in zip(P[::2], R[::2])]
        if name == "uni":
            ux, uy = UN_END
            k = int(np.argmin(np.hypot(P[:, 0] - ux, P[:, 1] - uy)))
            out["unEnd"] = k // 2
            # The i's top: the pen turns back on itself here, so the film
            # draws the two passes as separate strokes, each with a round cap.
            top = int(np.argmin(np.where(P[:, 0] > 990, P[:, 1], 1e9)))
            out["iTop"] = top // 2
        print(f"{name}: {len(P[::2])} pts, r {R.min():.0f}..{R.max():.0f}")

    a, b = rec.astype(bool), full.astype(bool)
    print(f"fit IoU {(a & b).sum() / (a | b).sum():.3f}")
    xs, ys = np.nonzero(by["dot"])[1] / T.S, np.nonzero(by["dot"])[0] / T.S
    out["dot"] = [round(float(xs.mean()), 2), round(float(ys.mean()), 2),
                  round(float(xs.max() - xs.min()) / 2, 2), round(float(ys.max() - ys.min()) / 2, 2)]

    vis = cv2.cvtColor((1 - b.astype(np.uint8)) * 255, cv2.COLOR_GRAY2BGR)
    vis[a & ~b] = (60, 60, 230)
    vis[~a & b] = (230, 160, 60)
    for name in ("uni", "v", "e"):
        pts = np.array([[x / 2, y / 2] for x, y, _ in out[name]], np.int32)
        cv2.polylines(vis, [pts], False, (40, 180, 40), 1)
    if len(sys.argv) > 1:
        cv2.imwrite(sys.argv[1], vis)

    dot_ai(out)
    OUT.write_text(json.dumps(out, separators=(",", ":")))
    print("wrote", OUT.name, f"{OUT.stat().st_size / 1024:.0f} KB")


if __name__ == "__main__":
    main()
