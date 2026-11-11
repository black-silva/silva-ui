import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const check = process.argv.includes('--check');
const source = fs.readFileSync(path.join(root, 'preview/main.tsx'), 'utf8');
const overlay = {
  'overlay-1': 'DialogPreview', 'overlay-2': 'TabsPreview', 'overlay-3': 'AlertPreview',
  'overlay-4': 'PopoverPreview', 'overlay-5': 'SheetPreview', 'overlay-6': 'TooltipPreview',
  'overlay-7': 'ToastPreview', 'overlay-8': 'MenuPreview', 'overlay-9': 'MenuPreview', 'overlay-10': 'AccordionPreview',
};
function format(code) {
  const tokens = code.trim().replace(/></g, '>\n<').split('\n');
  let depth = 0;
  return tokens.map((token) => {
    const trimmed = token.trim();
    if (/^<\//.test(trimmed)) depth--;
    const line = `${'  '.repeat(Math.max(0, depth))}${trimmed}`;
    if (/^<(?!\/|!|\?)/.test(trimmed) && !/\/>$/.test(trimmed) && !/<\/[^>]+>$/.test(trimmed)) depth++;
    return line;
  }).join('\n');
}
function functionSource(name) {
  const start = source.indexOf(`function ${name}`);
  if (start < 0) throw new Error(`Missing ${name}`);
  let depth = 0, end = start;
  for (; end < source.length; end++) { if (source[end] === '{') depth++; if (source[end] === '}' && --depth === 0) { end++; break; } }
  return format(source.slice(start, end));
}
function directSource(id) {
  const match = source.match(new RegExp(`if \\(id === '${id}'\\) return ([^;]+);`));
  if (!match) throw new Error(`Missing canonical source for ${id}`);
  return format(match[1]);
}
function snippet(id) { if (overlay[id]) return functionSource(overlay[id]); if (id === 'intro-1' || id === 'install-2') return functionSource('Intro'); return directSource(id); }
const files = fs.readdirSync(path.join(root, 'docs'), { recursive: true }).filter((f) => f.endsWith('.mdx'));
let changed = 0;
for (const relative of files) {
  const file = path.join(root, 'docs', relative);
  const original = fs.readFileSync(file, 'utf8');
  const next = original.replace(/(<iframe[^>]+previews\/\?example=([^"&]+)[\s\S]*?<\/iframe>[\s\S]*?```tsx\n)([\s\S]*?)(```)/g, (_, before, id, _old, after) => `${before}${snippet(id)}\n${after}`);
  if (next !== original) { changed++; if (!check) fs.writeFileSync(file, next); }
}
if (check && changed) { console.error(`${changed} documentation file(s) have stale preview snippets.`); process.exit(1); }
console.log(check ? 'Preview snippets are synchronized.' : `Formatted preview snippets in ${changed} documentation file(s).`);
