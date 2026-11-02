"""Build public/map/world.json for the About page travel map.

Source: Natural Earth 1:50m admin 0 countries with the large lakes cut out (public domain),
https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_admin_0_countries_lakes.geojson

    python3 scripts/build-world.py path/to/ne_50m_admin_0_countries_lakes.geojson

Output is a list of {n: name, a: ADM0_A3, c: MultiPolygon coordinates}.
Rings are simplified lightly (Douglas-Peucker, TOL degrees) and rounded to 2 decimals.
Overseas territories are dropped from countries whose highlight should cover only
the European mainland (France without French Guiana and the other DOMs, the
Netherlands without the Caribbean islands).
"""
import json
import sys

TOL = 0.02
SKIP = {"ATA"}  # Antarctica sits off the bottom of the chart
# keep only polygons whose first point falls in this lon/lat box
MAINLAND = {"FRA": (-6, 41, 10, 52), "NLD": (2, 50, 8, 54)}


def dp(pts, tol):
    if len(pts) < 3:
        return pts
    keep = [False] * len(pts)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        a, b = stack.pop()
        (x1, y1), (x2, y2) = pts[a], pts[b]
        dx, dy = x2 - x1, y2 - y1
        L2 = dx * dx + dy * dy
        best, idx = -1.0, -1
        for i in range(a + 1, b):
            px, py = pts[i]
            if L2 == 0:
                d = (px - x1) ** 2 + (py - y1) ** 2
            else:
                t = max(0, min(1, ((px - x1) * dx + (py - y1) * dy) / L2))
                d = (px - x1 - t * dx) ** 2 + (py - y1 - t * dy) ** 2
            if d > best:
                best, idx = d, i
        if idx >= 0 and best > tol * tol:
            keep[idx] = True
            stack += [(a, idx), (idx, b)]
    return [p for p, k in zip(pts, keep) if k]


def ring(r):
    out = []
    for x, y in dp(r, TOL):
        p = [round(x, 2), round(y, 2)]
        if not out or out[-1] != p:
            out.append(p)
    if out[0] != out[-1]:
        out.append(out[0])
    return out if len(out) >= 4 else None


def main(src, dst="public/map/world.json"):
    feats = json.load(open(src))["features"]
    world = []
    for f in feats:
        a = f["properties"]["ADM0_A3"]
        if a in SKIP:
            continue
        g = f["geometry"]
        polys = g["coordinates"] if g["type"] == "MultiPolygon" else [g["coordinates"]]
        if a in MAINLAND:
            x0, y0, x1, y1 = MAINLAND[a]
            polys = [p for p in polys if x0 <= p[0][0][0] <= x1 and y0 <= p[0][0][1] <= y1]
        out = []
        for p in polys:
            rings = [ring(r) for r in p]
            if rings[0]:
                out.append([r for r in rings if r])
        if out:
            world.append({"n": f["properties"]["NAME"], "a": a, "c": out})
    world.sort(key=lambda c: c["n"], reverse=True)
    json.dump(world, open(dst, "w"), separators=(",", ":"))
    print(len(world), "countries,", sum(len(r) for c in world for p in c["c"] for r in p), "points")


if __name__ == "__main__":
    main(*sys.argv[1:])
