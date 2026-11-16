// TypeScript preserves the source's bundler-style specifiers in declarations.
// Make relative references Node ESM-compatible without changing their exports.
import fs from 'node:fs';
import path from 'node:path';
// TypeScript 7's native compiler does not expose the JavaScript compiler API.
import { parse } from '@babel/parser';

const root = path.resolve('dist/types');

function declarationFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? declarationFiles(file) : entry.name.endsWith('.d.ts') ? [file] : [];
  });
}

function nodeSpecifier(file, specifier) {
  if (!specifier.startsWith('./') && !specifier.startsWith('../')) return specifier;
  const target = path.resolve(path.dirname(file), specifier);
  // Already explicit JavaScript specifiers resolve to their declaration counterpart.
  for (const [extension, declaration] of [['.js', '.d.ts'], ['.mjs', '.d.mts'], ['.cjs', '.d.cts']]) {
    if (specifier.endsWith(extension) && fs.existsSync(target.slice(0, -extension.length) + declaration)) return specifier;
  }
  // This also handles source files named *.css.ts, emitted as *.css.d.ts.
  if (fs.existsSync(target + '.d.ts')) return specifier + '.js';
  if (fs.existsSync(path.join(target, 'index.d.ts'))) return specifier.replace(/\/$/, '') + '/index.js';
  throw new Error(`Cannot resolve declaration specifier ${JSON.stringify(specifier)} in ${file}`);
}

for (const file of declarationFiles(root)) {
  const text = fs.readFileSync(file, 'utf8');
  const source = parse(text, { sourceType: 'module', sourceFilename: file, plugins: [['typescript', { dts: true }]] });
  const edits = [];
  function visit(node) {
    let literal;
    if (['ImportDeclaration', 'ExportNamedDeclaration', 'ExportAllDeclaration'].includes(node.type)) literal = node.source;
    else if (node.type === 'TSImportType') literal = node.argument;
    else if (node.type === 'TSExternalModuleReference') literal = node.expression;
    if (literal?.type === 'StringLiteral') {
      const replacement = nodeSpecifier(file, literal.value);
      if (replacement !== literal.value) edits.push({ start: literal.start, end: literal.end, replacement: JSON.stringify(replacement) });
    }
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) value.forEach((child) => { if (child?.type) visit(child); });
      else if (value?.type) visit(value);
    }
  }
  visit(source.program);
  let output = text;
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    output = output.slice(0, edit.start) + edit.replacement + output.slice(edit.end);
  }
  if (output !== text) fs.writeFileSync(file, output);
}
