/* ===========================================================================
   build-md.mjs — optional Node path for regenerating the plain-text twin.

       node tools/build-md.mjs

   Writes ../alignmentday.md from js/content.js. Needs Node 14+. The zero-tooling
   alternative is tools/generate-markdown.html in a browser.
   =========================================================================== */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import vm from "node:vm";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

/* content.js and markdown.js are browser-style classic scripts; run them in a
   sandbox that gives them a `window`/`globalThis` to attach to. */
const sandbox = {};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
sandbox.module = undefined;
vm.createContext(sandbox);

for (const file of ["js/content.js", "tools/markdown.js"]) {
  const code = readFileSync(resolve(root, file), "utf8");
  vm.runInContext(code, sandbox, { filename: file });
}

const md = sandbox.alignmentToMarkdown(sandbox.ALIGNMENT_DAY);
const target = resolve(root, "alignmentday.md");
writeFileSync(target, md, "utf8");
console.log("Wrote " + target + " (" + md.length + " chars)");
