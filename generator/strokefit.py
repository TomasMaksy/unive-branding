"""
Fit a pen stroke (centreline + radius) to a traced shape, so the union of
discs along the centreline covers the drawing as closely as possible.

Every point is moved, along its normal, to the midpoint between the two
edges of the stroke, and its radius set to half that width. Where the two
sides of a fold merge into one solid blob, a ray finds no edge within reach
and the point keeps its place and the distance transform's radius.
"""
from __future__ import annotations

import cv2
import numpy as np


def gauss(a, sig):
    if sig <= 0:
        return a
    k = np.exp(-0.5 * (np.arange(-3 * sig, 3 * sig + 1) / sig) ** 2)
    k /= k.sum()
    return np.convolve(np.pad(a, (len(k) // 2,), mode="edge"), k, "valid")


def resample(P, step, R=None):
    s = np.concatenate([[0], np.cumsum(np.hypot(*np.diff(P, axis=0).T))])
    t = np.linspace(0, s[-1], max(2, int(round(s[-1] / step)) + 1))
    out = np.stack([np.interp(t, s, P[:, 0]), np.interp(t, s, P[:, 1])], 1)
    return out if R is None else (out, np.interp(t, s, R))


def normals(P):
    T = np.gradient(gauss_pts(P, 2), axis=0)
    T /= np.linalg.norm(T, axis=1, keepdims=True) + 1e-9
    return T, np.stack([-T[:, 1], T[:, 0]], 1)


def gauss_pts(P, sig):
    return np.stack([gauss(P[:, 0], sig), gauss(P[:, 1], sig)], 1)


def march(mask, scale, p, d, reach):
    """Distance (artwork px) from p along d to the first pixel outside the mask."""
    h, w = mask.shape
    for t in np.arange(0, reach, 0.5):
        x = int((p[0] + d[0] * t) * scale)
        y = int((p[1] + d[1] * t) * scale)
        if x < 0 or y < 0 or x >= w or y >= h or not mask[y, x]:
            return t
    return None


def fit(P, mask, scale, reach=150, rounds=8, keep=None, smooth=6):
    """
    P: centreline (artwork px), mask: the shape at `scale` px per artwork px.
    keep: optional weights 0..1 (0 = never move this point).
    Returns (P, R).

    A disc never reaches further than the nearest edge plus a hair: near
    the tip of a slit the ray can slip past it and measure two strokes at
    once, but the slit is still the nearest edge, so the disc stops there.
    """
    dist = cv2.distanceTransform(mask.astype(np.uint8), cv2.DIST_L2, 5) / scale
    keep = np.ones(len(P)) if keep is None else keep
    for _ in range(rounds):
        _, N = normals(P)
        shift = np.zeros(len(P))
        for i, (p, n) in enumerate(zip(P, N)):
            a = march(mask, scale, p, n, reach)
            b = march(mask, scale, p, -n, reach)
            if a and b:
                shift[i] = (a - b) / 2
        P = P + N * (gauss(shift, smooth) * keep * 0.8)[:, None]
    # The edge fit leaves small kinks; at stroke radii of 80px a 10° kink
    # shows as a corner on the edge, so the line is smoothed once more.
    P = gauss_pts(P, smooth * 2)
    _, N = normals(P)
    R = np.empty(len(P))
    xi = np.clip((P[:, 0] * scale).astype(int), 0, mask.shape[1] - 1)
    yi = np.clip((P[:, 1] * scale).astype(int), 0, mask.shape[0] - 1)
    inscribed = dist[yi, xi]
    for i, (p, n) in enumerate(zip(P, N)):
        a = march(mask, scale, p, n, reach)
        b = march(mask, scale, p, -n, reach)
        R[i] = (a + b) / 2 if a and b and keep[i] > 0.5 else inscribed[i]
    R = np.minimum(R, inscribed * 1.16)
    return P, calm(gauss(R, smooth), P)


def calm(R, P, slope=0.6):
    """
    Limit how fast the radius may grow along the stroke. A disc much larger
    than its neighbours shows as a ball on the edge, so every radius is
    capped by its neighbours' plus `slope` per px of travel (both ways).
    """
    ds = np.concatenate([[0], np.hypot(*np.diff(P, axis=0).T)])
    R = R.copy()
    for i in range(1, len(R)):
        R[i] = min(R[i], R[i - 1] + slope * ds[i])
    for i in range(len(R) - 2, -1, -1):
        R[i] = min(R[i], R[i + 1] + slope * ds[i + 1])
    return gauss(R, 3)


def ridge(P, R, mask, scale, keep, reach=30, smooth=6):
    """
    Slide each point along its normal to the ridge of the distance field
    (the medial axis), where the largest disc fits, and take that disc. The
    union of medial discs is the shape itself, so heavy, uneven parts of a
    drawing (a bowl that sags) are covered too. Held points stay put.
    """
    dist = cv2.distanceTransform(mask.astype(np.uint8), cv2.DIST_L2, 5) / scale
    h, w = dist.shape

    def dt(q):
        xi = np.clip((q[..., 0] * scale).astype(int), 0, w - 1)
        yi = np.clip((q[..., 1] * scale).astype(int), 0, h - 1)
        return dist[yi, xi]

    _, N = normals(P)
    offs = np.arange(-reach, reach + 0.5, 0.5)
    q = P[:, None, :] + offs[None, :, None] * N[:, None, :]
    d = dt(q) - 0.01 * np.abs(offs)[None]
    best = offs[np.argmax(d, axis=1)]
    P2 = P + N * (gauss(best, smooth) * keep)[:, None]
    P2 = gauss_pts(P2, smooth)
    R2 = dt(P2) * 1.03
    return P2, calm(R * (1 - keep) + R2 * keep, P2)


def reach_edges(P, R, mask, scale, where, cap=1.35):
    """
    Where `where` is 1 (fold apexes: the round top of a hump, the foot of a
    valley), grow each disc to reach the drawn edge pixels nearest to it, so
    the turn is as full as the drawing. Never more than `cap` x the radius.
    """
    cs, _ = cv2.findContours(mask.astype(np.uint8), cv2.RETR_LIST, cv2.CHAIN_APPROX_NONE)
    E = np.vstack([c[:, 0, :] for c in cs]).astype(float) / scale
    near = np.empty(len(E), int)
    dmin = np.empty(len(E))
    for a in range(0, len(E), 2000):
        d = ((E[a:a + 2000, None, :] - P[None]) ** 2).sum(-1)
        near[a:a + 2000] = d.argmin(1)
        dmin[a:a + 2000] = np.sqrt(d.min(1))
    far = np.zeros(len(P))
    np.fmax.at(far, near, dmin)
    grown = np.clip(far, R, R * cap)
    return calm(R * (1 - where) + grown * where, P)


def extend_caps(P, R, mask, scale, reach=160, ends=(0, -1)):
    """Lengthen each end so its round cap reaches the drawn tip."""
    out = [P]
    radii = [R]
    for end in ends:
        p = P[end]
        q = P[end + 6] if end == 0 else P[end - 6]
        d = (p - q) / (np.linalg.norm(p - q) + 1e-9)
        tip = march(mask, scale, p, d, reach) or 0
        extra = tip - R[end]
        if extra > 1:
            n = int(extra // 2) + 1
            pts = np.array([p + d * extra * (k + 1) / n for k in range(n)])
            rr = np.full(n, R[end])
            if end == 0:
                out.insert(0, pts[::-1])
                radii.insert(0, rr)
            else:
                out.append(pts)
                radii.append(rr)
    return np.vstack(out), np.concatenate(radii)


def bridge(P, R, mask, scale, overlap=6.0, max_gap=16.0, fold=0.6, smooth=6):
    """
    Where the pen comes back alongside an earlier pass (up the u, down into
    the n) the drawing is solid between them, but each pass is fitted on its
    own, so a hairline crack can stay open between the two. Pair every
    point with the nearest point of the other pass whose straight line to
    it stays inside the drawing; if their discs don't overlap by `overlap`
    px, move both centres toward each other by s and grow both radii by s.
    The inner edges then meet and the outer edges stay where they were.

    Only true fold-backs count: the pair must be much closer in space than
    along the stroke (`fold`), so neighbours along a straight stroke or
    across an open bowl are left alone, and a pair whose line crosses white
    (a V-notch, a counter) is never bridged.
    """
    h, w = mask.shape
    s = np.concatenate([[0], np.cumsum(np.hypot(*np.diff(P, axis=0).T))])
    D = np.hypot(P[:, None, 0] - P[None, :, 0], P[:, None, 1] - P[None, :, 1])
    gap = D - R[:, None] - R[None, :]
    arc = np.abs(s[:, None] - s[None, :])
    back = D < fold * arc
    # A point the other pass already covers well (a retraced stem, a stroke
    # that starts inside itself) needs nothing; pairing it with a point
    # further along would only drag it sideways.
    covered = np.where(back, gap, np.inf).min(1) < -overlap
    ok = back & (gap > -overlap) & (gap < max_gap) & ~covered[:, None]
    shift = np.zeros(len(P))
    toward = np.zeros_like(P)
    ts = np.linspace(0, 1, 24)
    for i in np.nonzero(ok.any(1))[0]:
        for j in np.argsort(np.where(ok[i], gap[i], np.inf))[:4]:
            if not ok[i, j]:
                break
            q = P[i] + (P[j] - P[i]) * ts[:, None]
            xi = np.clip((q[:, 0] * scale).astype(int), 0, w - 1)
            yi = np.clip((q[:, 1] * scale).astype(int), 0, h - 1)
            if mask[yi, xi].all():
                shift[i] = (gap[i, j] + overlap) / 4
                toward[i] = (P[j] - P[i]) / D[i, j]
                break
    if not shift.any():
        return P, R
    # Smooth the push along the stroke so the edge bends, never kinks.
    shift = gauss(shift, smooth)
    toward = gauss_pts(toward, smooth)
    toward /= np.linalg.norm(toward, axis=1, keepdims=True) + 1e-9
    # Smoothing spreads the push onto neighbours beside a real counter (the
    # notch under the u–n join); there a grown disc would spill into the
    # white, so no disc may grow past the largest one the drawing holds.
    # The centre moves only as far as the radius grew: the outer edge stays.
    dist = cv2.distanceTransform(mask.astype(np.uint8), cv2.DIST_L2, 5) / scale
    Q = P + toward * shift[:, None]
    xi = np.clip((Q[:, 0] * scale).astype(int), 0, w - 1)
    yi = np.clip((Q[:, 1] * scale).astype(int), 0, h - 1)
    grow = np.clip(np.minimum(R + shift, dist[yi, xi] * 1.02) - R, 0, None)
    grow = np.minimum(grow, gauss(grow, 2))
    return P + toward * grow[:, None], R + grow


def trim_spill(P, R, mask, scale, tol=1.5, rounds=3, smooth=4):
    """
    The mirror of `bridge`: where two passes crowd a narrow notch (the V
    above the valley) their discs fill its tip. Where a disc reaches more
    than `tol` px past the drawn edge, step it back from that spot and
    shrink it by the same amount, so its far edge stays where it was.
    """
    h, w = mask.shape
    out = cv2.distanceTransform((1 - mask).astype(np.uint8), cv2.DIST_L2, 5) / scale
    ang = np.linspace(0, 2 * np.pi, 72, endpoint=False)
    ring = np.stack([np.cos(ang), np.sin(ang)], 1)
    for _ in range(rounds):
        q = P[:, None, :] + R[:, None, None] * ring[None]
        xi = np.clip((q[..., 0] * scale).astype(int), 0, w - 1)
        yi = np.clip((q[..., 1] * scale).astype(int), 0, h - 1)
        d = out[yi, xi]
        worst = d.argmax(1)
        excess = np.clip(d.max(1) - tol, 0, None)
        if not excess.any():
            break
        away = -ring[worst]
        step = gauss(excess / 2, smooth)
        away = gauss_pts(away * excess[:, None], smooth)
        away /= np.linalg.norm(away, axis=1, keepdims=True) + 1e-9
        P = P + away * step[:, None]
        R = R - step
    return P, R


def iou(P, R, mask, scale):
    rec = np.zeros_like(mask, np.uint8)
    for (x, y), r in zip(P, R):
        cv2.circle(rec, (int(round(x * scale * 4)), int(round(y * scale * 4))), int(round(r * scale * 4)), 1, -1, shift=2)
    a, b = rec.astype(bool), mask.astype(bool)
    return (a & b).sum() / (a | b).sum(), rec
