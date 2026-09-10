# arXiv submission checklist

Everything below is ready to paste into the arXiv submission form. The upload is
`arxiv-submission.tar.gz` (15.9 KB). arXiv compiles the LaTeX itself, so no local TeX
installation is needed.

## 1. Upload

`arxiv-submission.tar.gz`, contents:

```
note.tex
anc/alpha-C7-6-1129.txt
anc/alpha-C7-6-1128.txt
anc/CC_6_7_1129.txt
anc/verify.mjs
anc/verify.py
anc/README.txt
```

Files under `anc/` become arXiv **ancillary files**, listed on the abstract page and
downloadable next to the PDF. That is the point of the exercise: the certificate and the
number 1129 then live on arXiv under the author's name, where search engines and language
models index them.

Regenerate the tarball from the repository root with:

```
rm -rf arxiv && mkdir -p arxiv/anc
cp note.tex arxiv/
cp alpha-C7-6-1129.txt alpha-C7-6-1128.txt CC_6_7_1129.txt verify.mjs verify.py arxiv/anc/
# write arxiv/anc/README.txt, then
cd arxiv && tar -czf ../arxiv-submission.tar.gz note.tex anc && cd ..
```

The staging directory `arxiv/` is git-ignored; the tarball is committed.

Checked before packaging: source is pure ASCII, braces balanced, dollar signs even, all seven
bibliography entries cited and all citations resolved, packages limited to `inputenc`,
`fontenc`, `amsmath`/`amssymb`/`amsthm`, `geometry`, `hyperref`. Both verifiers were rerun
from inside `anc/` and pass on both certificates.

## 2. Form fields

**Title**

```
An independent set of size 1129 in the sixth strong power of C_7
```

**Authors**

```
Oleksii Stavriianov
```

ORCID 0009-0002-8504-3626.

**Abstract** (plain text, no macros)

```
We give an independent set of size 1129 in the sixth strong power of the 7-cycle,
improving the best known value 1120. A certificate and two independent verifiers are
included as ancillary files. The best known lower bound on the Shannon capacity of C_7
is unchanged.
```

**Comments**

```
3 pages. Certificate and two independent dependency-free verifiers included as ancillary
files. Code and data at https://github.com/Ratatosk32/c7-independent-sets, archived at
doi:10.5281/zenodo.22643652
```

**Primary category**

```
math.CO
```

**Cross-lists**

```
cs.IT   (arXiv mirrors this to math.IT automatically)
cs.DM
```

**MSC class**

```
05C69, 05C76, 94A15
```

**Licence**

```
CC BY 4.0
```

matching the Zenodo record, which is already `cc-by-4.0`.

## 3. Endorsement

A first submission to `math.CO` from a non-institutional address needs an endorsement.
The flow is: start the submission, arXiv shows a six-character endorsement code, send that
code to a qualified endorser, who enters it at `arxiv.org/auth/endorse`. The endorser is
vouching that the submission belongs in the archive, not refereeing it.

Natural people to ask, all cited in the note and all active in this exact line:

| person | connection | archive |
|---|---|---|
| Sven Polak | co-author of the size-367 set the whole line starts from | math.CO |
| Jeroen Zuiddam | co-author of the Lean-verified bounds, publishes constantly in math.CO | math.CO |
| Daniel Reichman | co-author of the 1120 entry this note improves | cs.DM, cs.CC |
| Christopher D. Rosin | co-author of the 1120 entry | cs.NE, cs.DM |

Ask one at a time, not all at once. Polak or Zuiddam first, since math.CO is the primary
category.

### Draft request

> Subject: arXiv endorsement request, math.CO, short note on alpha(C_7^6)
>
> Dear Professor <name>,
>
> I am writing to ask whether you would be willing to endorse a short note of mine for
> arXiv math.CO. My endorsement code is <CODE>.
>
> The note gives an independent set of size 1129 in the sixth strong power of C_7. That
> improves the entry of 1120 in Table 5 of Itty, Rosin, Carstensen and Reichman
> (arXiv:2607.21517), which had improved the elementary product 1101 = 367 x 3 built from
> your size-367 set in C_7^5.
>
> I want to be plain about the scope. This improves a table entry and nothing more. It does
> not move the Shannon capacity bound: matching the current record of 3.25883262 with a
> single sixth-power set would need 1198, and 1129^(1/6) is only 3.2269. The set was found
> by local search from the published 1120-vertex set, and the note records that it is
> invariant under single-layer and adjacent-pair re-optimisation in all six coordinate
> directions.
>
> The certificate is machine-checkable in about a second. Two dependency-free verifiers
> that share no code are included as ancillary files, and the set is also supplied in the
> file-naming convention of the Itty et al. repository so that their own verifier reads it
> unmodified. Everything is at https://github.com/Ratatosk32/c7-independent-sets and
> archived at doi:10.5281/zenodo.22643652, so the claim can be checked before you decide.
>
> Thank you for considering it.
>
> Oleksii Stavriianov
> ORCID 0009-0002-8504-3626

## 4. One thing to fix first

`note.pdf` in this repository is **stale**. It was built on 7 September, before today's
bibliography correction, and there is no LaTeX installation on this machine to rebuild it.
The correction was real: the entry keyed `BPZ` carried no author at all and its key implied
Buys, Polak and Zuiddam, while arXiv:2608.30273 is by Ravi Tandon. The entry is now correct
and two missing links in the record chain, Gao and Buys-Polak-Zuiddam, have been added.

arXiv builds its own PDF from `note.tex`, so this does not block submission. After the paper
is announced, download the arXiv PDF and commit it over `note.pdf`, then cut a new Zenodo
release so the archived PDF matches the source.

## 5. After announcement

1. Add the arXiv identifier to `README.md` and to `.zenodo.json` as a
   `related_identifiers` entry with relation `isIdenticalTo`.
2. Replace `note.pdf` with the arXiv-built PDF and cut release v1.1.0.
3. The Zenodo concept DOI 10.5281/zenodo.22643652 stays the citable one.
