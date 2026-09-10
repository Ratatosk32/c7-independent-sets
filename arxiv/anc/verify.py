#!/usr/bin/env python3
"""Standalone verifier for independent sets in strong powers of a cycle.

An independent verification path, written so that it shares no code with verify.mjs:
if both agree, a bug would have to be present in two separate implementations.

    python verify.py alpha-C7-6-1129.txt 7 6

A certificate line is one vertex of C_q^{boxtimes n}, given as n digits (first digit is
coordinate 0). Blank lines and lines starting with '#' are ignored. Two distinct vertices
are adjacent iff their cyclic distance is at most 1 in every coordinate, so the set is
independent iff every pair is at cyclic distance at least 2 in some coordinate.
"""
import sys


def cyclic_distance(a, b, q):
    d = abs(a - b) % q
    return min(d, q - d)


def main():
    if len(sys.argv) < 2:
        print("usage: python verify.py <certificate file> [q=7] [n=6]", file=sys.stderr)
        return 2
    path = sys.argv[1]
    q = int(sys.argv[2]) if len(sys.argv) > 2 else 7
    n = int(sys.argv[3]) if len(sys.argv) > 3 else 6

    vertices = []
    with open(path, encoding="utf-8") as handle:
        for lineno, raw in enumerate(handle, start=1):
            line = raw.strip()
            if not line or line.startswith("#"):
                continue
            parts = line.replace(",", " ").split() if (" " in line or "," in line) else list(line)
            digits = [int(p) for p in parts]
            if len(digits) != n:
                print(f"line {lineno}: expected {n} coordinates, got {len(digits)}", file=sys.stderr)
                return 1
            if any(d < 0 or d >= q for d in digits):
                print(f"line {lineno}: coordinate outside 0..{q - 1}", file=sys.stderr)
                return 1
            vertices.append(tuple(digits))

    if len(set(vertices)) != len(vertices):
        print("certificate contains duplicate vertices", file=sys.stderr)
        return 1

    violations = 0
    for i in range(len(vertices)):
        for j in range(i + 1, len(vertices)):
            if all(cyclic_distance(vertices[i][c], vertices[j][c], q) <= 1 for c in range(n)):
                violations += 1
                if violations <= 5:
                    a = "".join(map(str, vertices[i]))
                    b = "".join(map(str, vertices[j]))
                    print(f"adjacent pair: {a} and {b}", file=sys.stderr)

    if violations:
        print(f"NOT INDEPENDENT: {violations} adjacent pairs", file=sys.stderr)
        return 1

    size = len(vertices)
    print(f"OK: {size} distinct vertices of C_{q}^{n}, pairwise non-adjacent")
    print(f"    alpha(C_{q}^{n}) >= {size}, so Theta(C_{q}) >= {size}^(1/{n}) = {size ** (1.0 / n):.8f}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
