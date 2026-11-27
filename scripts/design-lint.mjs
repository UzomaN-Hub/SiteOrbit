#!/usr/bin/env node
/**
 * Design lint: fails the build when code drifts back to template-looking UI
 * (gradients, glows, pills, eyebrow labels, raw colours, dead links...).
 * Rules come from docs/redesign/TESTING.md §2. No dependencies.
 *
 *   node scripts/design-lint.mjs            # scan app/ components/ lib/ styles/
 *   node scripts/design-lint.mjs path ...   # scan specific files or folders
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const DEFAULT_DIRS = ["app", "components", "lib", "hooks", "store"];
const EXTENSIONS = [".ts", ".tsx", ".css"];

const norm = (file) => relative(ROOT, file).split(sep).join("/");
const nearLine = (lines, index, pattern, span = 3) =>
  lines.slice(Math.max(0, index - span), index + span + 1).some((line) => pattern.test(line));

/** Every rule in one list, so they're easy to adjust. */
const RULES = [
  { name: "No gradients", pattern: /gradient|\bbg-linear-|\b(from|via)-[a-z]+-\d|\bto-[a-z]+-\d/i },
  { name: "No gradient text", pattern: /bg-clip-text|text-transparent/ },
  {
    name: "No blur effects",
    pattern: /backdrop-blur|\bblur-|backdrop-filter/,
    allow: (file, lines, index) => /:\s*initial;/.test(lines[index]), // theme resets remove them
  },
  {
    name: "No glow shadows",
    pattern: /shadow-\[|shadow-(lg|xl|2xl)\b|drop-shadow/,
    allow: (file, lines, index) => /:\s*initial;/.test(lines[index]),
  },
  {
    name: "No raw colours",
    pattern: /#[0-9a-f]{3,8}\b|\brgba?\(|\bhsla?\(|\boklch\(/i,
    allow: (file) =>
      [
        "app/globals.css",
        "app/opengraph-image.tsx",
        "app/apple-icon.tsx",
        "app/layout.tsx", // theme-color meta tag
        "lib/constants/branding.ts", // client site theme defaults (customer content)
      ].includes(file),
  },
  {
    name: "No palette classes",
    pattern:
      /\b(text|bg|border|ring|from|to|fill|stroke)-(slate|gray|zinc|neutral|stone|red|orange|yellow|green|teal|cyan|emerald|indigo|violet|purple|blue|sky|pink|rose|white|black)(-\d|\/|\b)/,
  },
  { name: "No big or arbitrary radius", pattern: /rounded-(xl|2xl|3xl|4xl)\b|rounded-\[/ },
  {
    name: "Pills only on avatars, dots and radios",
    pattern: /rounded-full/,
    allow: (file, lines, index) =>
      /^components\/ui\/(avatar|radio)/.test(file) || nearLine(lines, index, /data-allow-round/),
  },
  { name: "No eyebrow labels", pattern: /uppercase.*tracking-|tracking-.*uppercase/ },
  {
    name: "No banned fonts",
    pattern: /\b(Inter|Geist|Sora|Space Grotesk)\b/,
  },
  {
    name: "No banned copy",
    pattern:
      /(?<!site)(?<!Site)(?<![\w-])orbit(?![\w-])|velocity|curator|control layer|surgical|\bpremium\b|\belite\b|seamless|supercharge|cutting-edge|next-generation|Ready to launch/i,
    // The logo's CSS class names describe the mark, not copy.
    allow: (file, lines, index) => /logo-orbit/.test(lines[index]),
  },
  { name: "No placeholder links", pattern: /href="#"|href=\{?["']#["']\}?|facebook\.com/ },
  {
    name: 'No href="/" except the logo',
    pattern: /href="\/"/,
    allow: (file) => file === "components/brand/logo.tsx" || file === "app/not-found.tsx",
  },
  { name: "No spinners for page loads", pattern: /animate-spin|Loader2/ },
];

function walk(target, out = []) {
  if (!existsSync(target)) return out;
  const stats = statSync(target);
  if (stats.isFile()) {
    if (EXTENSIONS.some((ext) => target.endsWith(ext))) out.push(target);
    return out;
  }
  for (const entry of readdirSync(target)) {
    if (entry === "node_modules" || entry.startsWith(".")) continue;
    walk(join(target, entry), out);
  }
  return out;
}

const targets = process.argv.slice(2).length ? process.argv.slice(2) : DEFAULT_DIRS;
const files = targets.flatMap((target) => walk(join(ROOT, target)));
const problems = [];

for (const absolute of files) {
  const file = norm(absolute);
  const lines = readFileSync(absolute, "utf8").split(/\r?\n/);

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    // Comments explain the rules; they aren't UI.
    if (trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*")) return;

    for (const rule of RULES) {
      if (!rule.pattern.test(line)) continue;
      if (rule.allow?.(file, lines, index)) continue;
      problems.push(`${file}:${index + 1}  ${rule.name}\n    ${trimmed.slice(0, 140)}`);
    }
  });
}

if (problems.length) {
  console.error(`Design lint found ${problems.length} problem(s):\n`);
  console.error(problems.join("\n"));
  console.error("\nSee docs/redesign/DESIGN.md for the rules.");
  process.exit(1);
}

console.log(`Design lint passed (${files.length} files checked).`);
