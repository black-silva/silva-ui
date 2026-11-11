import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const sections = ['display', 'forms', 'layout', 'overlays', 'typography'];
const errors = [];
const docs = [];
const globalTypeNames = new Set(['HTMLElement']);
const iframeReferences = [];

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
    for (const [, id, code] of isComponentApiPage ? pairs : []) {
      if (!code.trim()) errors.push(`${relative}: ${id} has an empty Code snippet`);
      const imported = new Set([...code.matchAll(/import\s*{([^}]+)}/g)].flatMap(match => match[1].split(',').map(name => name.trim())));
      for (const [, component] of code.matchAll(/<([A-Z][A-Za-z0-9]*)\b/g)) {
        if (!globalTypeNames.has(component) && !imported.has(component)) errors.push(`${relative}: ${id} uses ${component} without importing it`);
      }
      docs.push({ relative, id, code });
    }
  }

const preview = await readFile(path.join(root, 'preview/main.tsx'), 'utf8');
const implementationIds = [...preview.matchAll(/^\s*['"]([^'"]+)['"]:\s*\(\)\s*=>\s*<ApiExample\b/gm)].map(match => match[1]);
const implementationIdSet = new Set(implementationIds);
for (const { relative, id } of iframeReferences) {
  if (!implementationIdSet.has(id)) errors.push(`${relative}: iframe example ${id} has no preview implementation`);
}
const documentedIds = new Set(iframeReferences.map(item => item.id));
for (const id of implementationIds) if (!documentedIds.has(id)) errors.push(`preview/main.tsx: ${id} has no documentation iframe`);

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
