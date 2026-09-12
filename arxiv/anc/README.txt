Ancillary files for "An independent set of size 1129 in the sixth strong power of C_7".

  alpha-C7-6-1129.txt   the certificate: 1129 vertices of C_7^(box 6), one per line,
                        six digits over 0..6, the first digit being coordinate 0
  alpha-C7-6-1128.txt   a second, independent set of size 1128 from a different seed
  CC_6_7_1129.txt       the same 1129-vertex set in the format and file-naming
                        convention of the Itty-Rosin-Carstensen-Reichman repository,
                        so that their verifier.py reads it without modification
  verify.mjs            verifier for Node.js 20, no dependencies
  verify.py             verifier for Python 3, no dependencies

Usage:

  node verify.mjs alpha-C7-6-1129.txt 7 6
  python verify.py alpha-C7-6-1129.txt 7 6

Each prints

  OK: 1129 distinct vertices of C_7^6, pairwise non-adjacent
      alpha(C_7^6) >= 1129, so Theta(C_7) >= 1129^(1/6) = 3.22687635

The two verifiers share no code and have no dependencies, so agreement between them is
not evidence from a single implementation. Both run the naive O(|S|^2 n) all-pairs test,
which is slow but short enough to audit by reading. Altering one coordinate of one vertex
makes both report adjacent pairs and exit with a nonzero status.

The search and both verifiers were written with the assistance of a large language model.
A certificate is true or false on its own terms, whatever produced it, and these two
programs are the means of settling it.
