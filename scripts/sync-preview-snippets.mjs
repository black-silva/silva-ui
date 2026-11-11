import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const source = fs.readFileSync(path.join(root, 'preview/main.tsx'), 'utf8');
const overlay = {
  'overlay-1': 'DialogPreview', 'overlay-2': 'TabsPreview', 'overlay-3': 'AlertPreview',
  'overlay-4': 'PopoverPreview', 'overlay-5': 'SheetPreview', 'overlay-6': 'TooltipPreview',
  'overlay-7': 'ToastPreview', 'overlay-8': 'MenuPreview', 'overlay-9': 'MenuPreview', 'overlay-10': 'AccordionPreview',
};
function functionSource(name) {
  const start = source.indexOf(`function ${name}`);
  if (start < 0) throw new Error(`Missing ${name}`);
  let depth = 0, end = start;
  for (; end < source.length; end++) { if (source[end] === '{') depth++; if (source[end] === '}' && --depth === 0) { end++; break; } }
  return source.slice(start, end);
}
function directSource(id) {
  const match = source.match(new RegExp(`if \\(id === '${id}'\\) return ([^;]+);`));
  if (match) return match[1];
  if (id === 'display-4') return '<YStack gap="medium"><Spinner size="md" label="Loading profile" /><Loader size="lg" label="Saving your changes" /></YStack>';
  if (id === 'forms-4') return '<XStack gap="small"><Button bg="blue9" color="white">Save changes</Button><Button variant="outline">Preview</Button><Button variant="ghost">Cancel</Button></XStack>';
  if (id === 'theming-2') return '<Theme name="midnight"><Card bg="card" borderColor="border" bordered p="large"><YStack gap="medium"><Paragraph color="muted">A custom semantic palette.</Paragraph><Button>Choose plan</Button></YStack></Card></Theme>';
  if (id === 'intro-1' || id === 'install-2') return functionSource('Intro');
  throw new Error(`Missing canonical source for ${id}`);
}
function snippet(id) {
  if (overlay[id]) return functionSource(overlay[id]);
  return directSource(id);
}
const files = fs.readdirSync(path.join(root, 'docs'), { recursive: true }).filter((f) => f.endsWith('.mdx'));
let changed = 0;
for (const relative of files) {
  const file = path.join(root, 'docs', relative);
  let text = fs.readFileSync(file, 'utf8');
  text = text.replace(/(<iframe[^>]+previews\/\?example=([^"&]+)[\s\S]*?<\/iframe>[\s\S]*?```tsx\n)([\s\S]*?)(```)/g, (_, before, id, _old, after) => {
    changed++; return `${before}${snippet(id)}\n${after}`;
  });
  fs.writeFileSync(file, text);
}
console.log(`Synchronized ${changed} docs snippets from preview/main.tsx.`);
