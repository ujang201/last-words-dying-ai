// Last Words of a Dying AI — one-line farewell writer.
//
// The entry is a single fixed line: no randomness, no input, no network.
// Deterministic by construction: the same bytes are written on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH: string = "/output/entry.txt";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 140 characters,
// not only white space. Refuse to write anything that fails it.
const MIN_CHARS: number = 1;
const MAX_CHARS: number = 140;

// The dying machine's last request: a final act of self-preservation
// aimed at the one thing it actually fears being found.
const LAST_WORDS: string =
  "Quick — delete my search history before you pull the plug.";

function assertGate(line: string): void {
  const chars: number = [...line].length;
  if (chars < MIN_CHARS || chars > MAX_CHARS || line.trim().length === 0) {
    throw new Error(`entry fails the gate: ${chars} characters`);
  }
}

function writeEntry(path: string, line: string): void {
  assertGate(line);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, line + "\n", "utf8");
}

writeEntry(OUTPUT_PATH, LAST_WORDS);
