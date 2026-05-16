#!/usr/bin/env node
// Syncs markdown from Plan_C_Family_of_5/ + bookings/ into site/src/pages/docs/
// so each .md is browsable on the phone app. Run automatically by `npm run build`.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(siteRoot, '..');
const outDir = path.join(siteRoot, 'src/pages/docs');

const SOURCES = [
  { from: path.join(repoRoot, 'Plan_C_Family_of_5'), to: '' },
  { from: path.join(repoRoot, 'bookings'), to: 'bookings' },
];

// Files we don't want to expose as routes
const EXCLUDE_BASENAMES = new Set([]);

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip raw/ subdir of wishlist (raw CSVs, not markdown)
      if (entry.name === 'raw') continue;
      out.push(...await walk(full));
    } else if (entry.name.endsWith('.md')) {
      out.push(full);
    }
  }
  return out;
}

// Astro reads frontmatter; we inject a layout reference resolved relative to the .md file.
function buildFrontmatter(title, targetAbs) {
  const layoutAbs = path.join(siteRoot, 'src/layouts/DocLayout.astro');
  let rel = path.relative(path.dirname(targetAbs), layoutAbs).replace(/\\/g, '/');
  if (!rel.startsWith('.')) rel = './' + rel;
  return `---\nlayout: ${rel}\ntitle: ${JSON.stringify(title)}\n---\n\n`;
}

function deriveTitle(content, fallback) {
  const m = content.match(/^#\s+(.+)$/m);
  if (m) return m[1].replace(/[`*_]/g, '').trim();
  return fallback;
}

// Rewrite intra-repo markdown links so they work in the site context.
// In source: [foo](menus/tokyo.md), [bar](../bookings/flights.md), etc.
// On site: convert to absolute /JapanTrip2026/docs/<resolved> paths.
function rewriteLinks(content, srcAbsPath) {
  return content.replace(/\]\(([^)]+\.md)(#[^)]*)?\)/g, (match, link, hash) => {
    // External absolute URLs would not have .md; ignore those.
    if (/^https?:/.test(link)) return match;
    const abs = path.resolve(path.dirname(srcAbsPath), link);
    // Find which source root this resolves under
    for (const src of SOURCES) {
      if (abs.startsWith(src.from + path.sep) || abs === src.from) {
        let rel = path.relative(src.from, abs).replace(/\\/g, '/');
        rel = rel.replace(/\.md$/, '');
        const prefix = src.to ? `/${src.to}` : '';
        return `](/JapanTrip2026/docs${prefix}/${rel}${hash || ''})`;
      }
    }
    // Fallback: leave the link, but strip .md so 404s are more obvious
    return match;
  });
}

async function clearDir(dir) {
  if (!(await exists(dir))) return;
  await fs.rm(dir, { recursive: true, force: true });
}

async function main() {
  await clearDir(outDir);
  await fs.mkdir(outDir, { recursive: true });

  let count = 0;
  for (const src of SOURCES) {
    if (!(await exists(src.from))) {
      console.warn(`[sync-content] missing source: ${src.from}`);
      continue;
    }
    const files = await walk(src.from);
    for (const file of files) {
      const rel = path.relative(src.from, file);
      const base = path.basename(rel);
      if (EXCLUDE_BASENAMES.has(base)) continue;
      const targetRel = path.join(src.to, rel);
      const targetAbs = path.join(outDir, targetRel);
      await fs.mkdir(path.dirname(targetAbs), { recursive: true });
      const raw = await fs.readFile(file, 'utf8');
      const title = deriveTitle(raw, base.replace(/\.md$/, ''));
      const rewritten = rewriteLinks(raw, file);
      const out = buildFrontmatter(title, targetAbs) + rewritten;
      await fs.writeFile(targetAbs, out, 'utf8');
      count++;
    }
  }

  console.log(`[sync-content] wrote ${count} markdown files into ${path.relative(siteRoot, outDir)}`);
}

main().catch(err => { console.error(err); process.exit(1); });
