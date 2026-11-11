import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const sections = ['display', 'forms', 'layout', 'overlays', 'typography'];
const errors = [];
const docs = [];
const globalTypeNames = new Set(['HTMLElement']);
const iframeReferences = [];
const prohibitedConsumerPattern = /<(?:div|span|main|option)\b/i;
const prohibitedCssPattern = /(?:\bimport\s+(?:[^'";]+\s+from\s+)?['"][^'"]*\.css(?:[?#][^'"]*)?['"]|@import\b|(?:href|src)\s*=\s*['"][^'"]*\.css(?:[?#][^'"]*)?['"])/i;
const prohibitedSnippetPattern = /(?:\bclass\s*=|\bstyle\s*=)/i;
const expectedPreviewIds = new Set(['api-installation-a']);
for (let index = 1; index <= 38; index += 1) {
  const number = String(index).padStart(2, '0');
  expectedPreviewIds.add(`api-${number}-a`);
  expectedPreviewIds.add(`api-${number}-b`);
}

const reportProhibited = (location, content) => {
  if (prohibitedCssPattern.test(content)) errors.push(`${location}: contains a prohibited CSS import or reference`);
  if (prohibitedSnippetPattern.test(content)) errors.push(`${location}: contains a prohibited class= or style= attribute`);
  if (prohibitedConsumerPattern.test(content)) errors.push(`${location}: contains a prohibited raw consumer tag (div/span/main/option)`);
};

const extractStageExpression = (source, api) => {
  const match = source.match(new RegExp(`case '${api}': return stage\\(`));
  if (!match || match.index === undefined) return null;
  const start = match.index + match[0].length;
  let depth = 1;
  let quote = null;
  let escaped = false;
  for (let index = start; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (character === '\\') escaped = true;
      else if (character === quote) quote = null;
      continue;
    }
    if (character === "'" || character === '"' || character === '`') quote = character;
    else if (character === '(') depth += 1;
    else if (character === ')' && --depth === 0) return source.slice(start, index);
  }
  return null;
};

const walkDocs = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walkDocs(entryPath));
    else if (entry.name.endsWith('.mdx')) files.push(entryPath);
  }
  return files;
};

for (const filePath of (await walkDocs(path.join(root, 'docs'))).sort()) {
    const relative = path.relative(root, filePath);
    const source = await readFile(filePath, 'utf8');
    for (const [, id] of source.matchAll(/<iframe[^>]+example=([^"&\s]+)/g)) iframeReferences.push({ relative, id });
    const pairs = [...source.matchAll(/<Tab title="Preview">[\s\S]*?<iframe[^>]+example=([^"&]+)[\s\S]*?<\/Tab>\s*<Tab title="Code">[\s\S]*?```tsx\n([\s\S]*?)```[\s\S]*?<\/Tab>/g)];
    const isComponentApiPage = sections.includes(relative.split('/')[1]);
    if (isComponentApiPage && pairs.length < 2) errors.push(`${relative}: expected at least two Preview/Code pairs, found ${pairs.length}`);
    for (const [, id, code] of pairs) {
      if (!expectedPreviewIds.has(id)) continue;
      if (!code.trim()) errors.push(`${relative}: ${id} has an empty Code snippet`);
      reportProhibited(`${relative}: ${id} Code snippet`, code);
      const imported = new Set([...code.matchAll(/import\s*{([^}]+)}/g)].flatMap(match => match[1].split(',').map(name => name.trim())));
      const localComponents = new Set([...code.matchAll(/(?:function|const)\s+([A-Z][A-Za-z0-9]*)\b/g)].map(match => match[1]));
      for (const [, component] of code.matchAll(/<([A-Z][A-Za-z0-9]*)\b/g)) {
        if (!globalTypeNames.has(component) && !localComponents.has(component) && !imported.has(component)) errors.push(`${relative}: ${id} uses ${component} without importing it`);
      }
      docs.push({ relative, id, code });
    }
  }

const preview = await readFile(path.join(root, 'preview/main.tsx'), 'utf8');
reportProhibited('preview/main.tsx', preview);
const literalImplementationIds = [...preview.matchAll(/^\s*['"]([^'"]+)['"]:\s*\(\)\s*=>\s*<ApiExample\b/gm)].map(match => match[1]);
const hasGeneratedApiImplementations = /Object\.fromEntries\(Array\.from\(\{ length: 38 \}/.test(preview) && /`api-\$\{number\}-a`/.test(preview) && /`api-\$\{number\}-b`/.test(preview);
const implementationIds = hasGeneratedApiImplementations ? [...expectedPreviewIds] : literalImplementationIds;
if (hasGeneratedApiImplementations && !literalImplementationIds.includes('api-installation-a')) errors.push('preview/main.tsx: api-installation-a has no preview implementation');
const implementationIdSet = new Set(implementationIds);
for (const { relative, id } of iframeReferences) {
  if (!implementationIdSet.has(id)) errors.push(`${relative}: iframe example ${id} has no preview implementation`);
}
const documentedIds = new Set(iframeReferences.map(item => item.id));
for (const id of implementationIds) if (!documentedIds.has(id)) errors.push(`preview/main.tsx: ${id} has no documentation iframe`);

const apiOrderMatch = preview.match(/const api = \[([^\]]+)\]\[index\];/);
const apiOrder = apiOrderMatch ? [...apiOrderMatch[1].matchAll(/'([^']+)'/g)].map(match => match[1]) : [];
if (apiOrder.length !== 38) errors.push(`preview/main.tsx: expected 38 generated API names, found ${apiOrder.length}`);
const canonicalExamples = new Map([['api-installation-a', { api: 'installation', variant: 0 }]]);
for (const [index, api] of apiOrder.entries()) {
  const number = String(index + 1).padStart(2, '0');
  canonicalExamples.set(`api-${number}-a`, { api, variant: 0 });
  canonicalExamples.set(`api-${number}-b`, { api, variant: 1 });
}
if (docs.length !== 84) errors.push(`docs: expected 84 paired Preview/Code snippets, found ${docs.length}`);
for (const { relative, id, code } of docs) {
  const canonical = canonicalExamples.get(id);
  if (!canonical) {
    errors.push(`${relative}: ${id} has no canonical ApiExample mapping`);
    continue;
  }
  const expression = extractStageExpression(preview, canonical.api);
  if (!expression) {
    errors.push(`preview/main.tsx: ${canonical.api} has no extractable stage(...) expression`);
    continue;
  }
  const expectedSuffix = `const variant = ${canonical.variant};\n\n${expression}`;
  const trimmedCode = code.trim();
  const variantDeclarations = [...trimmedCode.matchAll(/const variant = [01];/g)];
  if (variantDeclarations.length !== 1 || !trimmedCode.endsWith(expectedSuffix)) {
    errors.push(`${relative}: ${id} must end with its literal ApiExample stage expression preceded immediately by const variant = ${canonical.variant};`);
  }
  if (/\bstage\s*\(/.test(code)) errors.push(`${relative}: ${id} includes stage(), which is preview host chrome`);
}

const compoundFamilies = {
  'docs/display/avatar.mdx': ['Avatar', 'AvatarImage', 'AvatarFallback'],
  'docs/display/card.mdx': ['Card', 'CardHeader', 'CardFooter'],
  'docs/forms/field.mdx': ['Field', 'FieldHelper', 'FieldError'],
  'docs/forms/radio-group.mdx': ['RadioGroup', 'RadioGroupItem'],
  'docs/forms/toggle-group.mdx': ['ToggleGroup', 'ToggleGroupItem'],
  'docs/overlays/accordion.mdx': ['Accordion', 'AccordionItem', 'AccordionTrigger', 'AccordionContent'],
  'docs/overlays/alert-dialog.mdx': ['AlertDialog', 'AlertDialogOverlay', 'AlertDialogContent', 'AlertDialogHeader', 'AlertDialogFooter', 'AlertDialogTitle', 'AlertDialogDescription', 'AlertDialogAction', 'AlertDialogCancel'],
  'docs/overlays/context-menu.mdx': ['ContextMenu', 'ContextMenuTrigger', 'ContextMenuContent', 'ContextMenuItem', 'ContextMenuSeparator', 'ContextMenuLabel', 'ContextMenuGroup'],
  'docs/overlays/dialog.mdx': ['Dialog', 'DialogOverlay', 'DialogContent', 'DialogHeader', 'DialogFooter', 'DialogTitle', 'DialogDescription', 'DialogClose'],
  'docs/overlays/menu.mdx': ['Menu', 'MenuTrigger', 'MenuContent', 'MenuItem', 'MenuSeparator', 'MenuLabel', 'MenuGroup'],
  'docs/overlays/popover.mdx': ['Popover', 'PopoverTrigger', 'PopoverContent', 'PopoverClose'],
  'docs/overlays/sheet.mdx': ['Sheet', 'SheetOverlay', 'SheetContent', 'SheetHeader', 'SheetFooter', 'SheetTitle', 'SheetDescription', 'SheetClose'],
  'docs/overlays/tabs.mdx': ['Tabs', 'TabList', 'Tab', 'TabPanel'],
  'docs/overlays/toast.mdx': ['ToastProvider', 'Toast', 'ToastTitle', 'ToastDescription', 'ToastClose'],
  'docs/overlays/tooltip.mdx': ['Tooltip', 'TooltipTrigger', 'TooltipContent'],
  'docs/typography/heading.mdx': ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
};
for (const [page, children] of Object.entries(compoundFamilies)) {
  const code = docs.filter(example => example.relative === page).map(example => example.code).join('\n');
  for (const child of children) {
    if (!new RegExp(`\\b${child}\\b`).test(code)) errors.push(`${page}: compound child ${child} is missing from code examples`);
    if (!new RegExp(`\\b${child}\\b`).test(preview)) errors.push(`preview/main.tsx: compound child ${child} is missing from preview implementations`);
  }
}

if (errors.length) {
  console.error(`Preview parity check failed (${errors.length} issue${errors.length === 1 ? '' : 's'}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Preview parity check passed: ${docs.length} Preview/Code pairs, ${implementationIds.length} preview implementations, and complete compound-family coverage.`);
