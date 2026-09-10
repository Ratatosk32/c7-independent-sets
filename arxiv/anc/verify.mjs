// Standalone verifier for independent sets in strong powers of a cycle.
//
// No dependencies, no build step. Reads a certificate file whose lines are vertices of
// C_q^{boxtimes n}, written as n digits (the first digit is coordinate 0); blank lines and
// lines beginning with '#' are ignored.
//
//   node verify.mjs alpha-C7-6-1129.txt 7 6
//
// Two vertices of C_q^{boxtimes n} are ADJACENT iff they are distinct and their cyclic
// distance is at most 1 in EVERY coordinate; equivalently a set is independent iff every
// pair of distinct members is at cyclic distance at least 2 in at least one coordinate.
// So an independent set is exactly a code in Z_q^n with minimum cyclic Chebyshev distance 2.
//
// The check below is the naive O(|S|^2 n) all-pairs comparison, chosen deliberately: it is
// short enough to audit by eye, which matters more here than speed. For |S| = 1129 it runs
// in well under a second.

import { readFileSync } from 'node:fs';

const file = process.argv[2];
const q = Number(process.argv[3] ?? 7);
const n = Number(process.argv[4] ?? 6);
if (!file || !Number.isInteger(q) || q < 3 || !Number.isInteger(n) || n < 1) {
  console.error('usage: node verify.mjs <certificate file> [q=7] [n=6]');
  process.exit(2);
}

const vertices = [];
const lines = readFileSync(file, 'utf8').split(/\r?\n/);
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line === '' || line.startsWith('#')) continue;
  const digits = /[,\s]/.test(line) ? line.split(/[,\s]+/).map(Number) : [...line].map(Number);
  if (digits.length !== n) { console.error(`line ${i + 1}: expected ${n} coordinates, got ${digits.length}`); process.exit(1); }
  for (const d of digits) {
    if (!Number.isInteger(d) || d < 0 || d >= q) { console.error(`line ${i + 1}: coordinate ${d} outside 0..${q - 1}`); process.exit(1); }
  }
  vertices.push(digits);
}

const cyclicDistance = (a, b) => { const d = Math.abs(a - b) % q; return Math.min(d, q - d); };

// duplicates
const seen = new Set();
for (let i = 0; i < vertices.length; i++) {
  const key = vertices[i].join(',');
  if (seen.has(key)) { console.error(`duplicate vertex ${key}`); process.exit(1); }
  seen.add(key);
}

// all pairs
let violations = 0;
for (let i = 0; i < vertices.length; i++) {
  for (let j = i + 1; j < vertices.length; j++) {
    let far = false;
    for (let c = 0; c < n; c++) {
      if (cyclicDistance(vertices[i][c], vertices[j][c]) >= 2) { far = true; break; }
    }
    if (!far) {
      violations++;
      if (violations <= 5) console.error(`adjacent pair: ${vertices[i].join('')} and ${vertices[j].join('')}`);
    }
  }
}

if (violations > 0) { console.error(`NOT INDEPENDENT: ${violations} adjacent pairs`); process.exit(1); }
console.log(`OK: ${vertices.length} distinct vertices of C_${q}^${n}, pairwise non-adjacent`);
console.log(`    alpha(C_${q}^${n}) >= ${vertices.length}, so Theta(C_${q}) >= ${vertices.length}^(1/${n}) = ${Math.pow(vertices.length, 1 / n).toFixed(8)}`);
