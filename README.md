# Independent sets in strong powers of the 7-cycle

An independent set of size 1129 in `C₇^⊠6`, with a certificate and two verifiers.

| | value | source |
|---|---|---|
| product `α(C₇⁵)·α(C₇) = 367·3` | 1101 | Polak and Schrijver, 2019 |
| previous best known | 1120 | Itty, Rosin, Carstensen, Reichman, [arXiv:2607.21517](https://arxiv.org/abs/2607.21517), Table 5 |
| this repository | **1129** | `alpha-C7-6-1129.txt` |

This improves a table entry, not the Shannon capacity bound. The record `Θ(C₇) ≥ 3.25883262…`
comes from a recursion in a high power, and a single sixth-power set would have to reach 1198
to match it. Here `1129^(1/6) = 3.22687635…`. The Lovász bound gives `α(C₇^⊠6) ≤ ϑ(C₇)^6 =
1333.51…`, so 1129 is 0.847 of it.

## Verify

```
node verify.mjs alpha-C7-6-1129.txt 7 6
python verify.py alpha-C7-6-1129.txt 7 6
```

Both print

```
OK: 1129 distinct vertices of C_7^6, pairwise non-adjacent
    alpha(C_7^6) >= 1129, so Theta(C_7) >= 1129^(1/6) = 3.22687635
```

The two have no dependencies and share no code, so agreement between them is not evidence
from one implementation. Both do the naive `O(|S|²·n)` all-pairs test, which is slow but short
enough to read; on 1129 vertices it takes under a second. Changing one coordinate of one vertex
makes both report adjacent pairs and exit with a nonzero status.

A third check comes from outside this repository. `CC_6_7_1129.txt` holds the same set in the
format and naming of the Itty et al. repository, so their `verifier.py` reads it directly and
reports `inferred n 6 k 7 m 1129` and `True`.

## Certificate format

One vertex per line, six digits over `0..6`, the first digit being coordinate 0. Lines
starting with `#` and blank lines are ignored.

```
# C_7^6  |S| = 1129
540000
...
```

Distinct vertices of `C_q^⊠n` are adjacent exactly when their cyclic distance is at most 1 in
every coordinate, so an independent set is a code in `Z_q^n` of minimum cyclic Chebyshev
distance 2. These are the same objects as limited-magnitude error-detecting codes with
wrap-around.

## Files

| file | contents |
|---|---|
| `alpha-C7-6-1129.txt` | the certificate, 1129 vertices |
| `CC_6_7_1129.txt` | the same set in the format and naming of the Itty et al. repository, so their `verifier.py` reads it directly |
| `alpha-C7-6-1128.txt` | a 1128-vertex set, reached from several seeds |
| `verify.mjs` | verifier, Node.js 20+, no dependencies |
| `verify.py` | verifier, Python 3, standard library only |
| `note.tex` | the accompanying note |

## How it was found

Local search over the 117 649 vertices of `C₇^⊠6`, starting from the 1120-vertex set of Itty
et al. For each vertex outside the current set we track how many members it is adjacent to. A
vertex adjacent to none is added. A vertex adjacent to exactly one member can be exchanged for
that member, which keeps the size fixed but moves the set sideways and sometimes frees a
further vertex. When nothing helps for a while the set is perturbed rather than restarted.
Several seeds gave 1128, one gave 1129.

The starting set matters. Local search from a random start reached only 317 to 323 in the
times we tried. A free search over abelian subgroups of `Z_N^6`, quantised into `Z_7^6` as in
Polak and Schrijver, gave a conflict-free orbit of size 1092 at `N = 1092`, and unions of such
orbits did not improve on it.

## Local optimality

Fix a coordinate `d` and let `L_j = {x ∈ S : x_d = j}`. Layers `j` and `j'` can contain
adjacent vertices only if `|j − j'| ≤ 1` in `Z₇`, and if `|j − j'| = 1` the `d`-coordinate is
already close, so adjacency depends only on the other five coordinates. Two moves follow, and
1129 is fixed by both.

Re-optimising one layer: `L_j` meets only `L_{j−1}` and `L_{j+1}`, so with those frozen the
new layer is a maximum independent set of `C₇^⊠5` on the rests avoiding their closed
neighbourhoods. This gains nothing in any of the six directions.

Re-optimising two adjacent layers together: what the Baumert et al. argument constrains is the
pair sum, since `L_j ∪ L_{j+1}` is independent in `C₇^⊠5` and so `2|S| ≤ 7·α(C₇^⊠5)`. Treating
a pair jointly lets vertices move between the two layers, which the single-layer move cannot
do. Over 15 sweeps with 8 perturbations the size never went above 1129. Each perturbation
forced six or seven vertices in, which evicts about forty since every vertex has `3⁶ − 1 = 728`
neighbours, and the sweeps recovered exactly those forty.

The same pair move took a 105-vertex set in `C₇^⊠4` to 108 during this work, so it is not a
weak move. One difference is worth recording: in dimension four the layer subproblem lives in
`Z₇³` and was solved exactly, while in dimension six it lives in `Z₇⁵`, has around 11 000
vertices, and was solved heuristically from a warm start.

## Citation

Please cite this archive together with the source of the starting set, Itty, Rosin, Carstensen
and Reichman, [arXiv:2607.21517](https://arxiv.org/abs/2607.21517).

## License

Code and data: MIT. The note: CC BY 4.0.
