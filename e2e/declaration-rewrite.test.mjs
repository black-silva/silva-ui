import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('../scripts/fix-declaration-specifiers.mjs', import.meta.url));

test('rewrites declaration module specifiers without touching other strings', () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'silva-declarations-'));
  try {
    const types = path.join(temp, 'dist/types');
    fs.mkdirSync(path.join(types, 'dir'), { recursive: true });
    for (const file of ['a.d.ts', 'style.css.d.ts', 'dir/index.d.ts']) {
      fs.writeFileSync(path.join(types, file), 'export declare const value: string;\n');
    }
    const input = [
      "import { value } from './a';",
      "export { value as fromDir } from './dir';",
      "export * from './style.css';",
      "export type A = import('./a').value;",
      "import Existing = require('./a.js');",
      "export { external } from 'external-package';",
      "export declare const literal: './a';",
      '',
    ].join('\n');
    const entry = path.join(types, 'index.d.ts');
    fs.writeFileSync(entry, input);
    const run = () => spawnSync(process.execPath, [script], { cwd: temp, encoding: 'utf8' });
    let result = run();
    assert.equal(result.status, 0, result.stderr);
    const output = fs.readFileSync(entry, 'utf8');
    assert.match(output, /from "\.\/a\.js"/);
    assert.match(output, /from "\.\/dir\/index\.js"/);
    assert.match(output, /from "\.\/style\.css\.js"/);
    assert.match(output, /import\("\.\/a\.js"\)/);
    assert.match(output, /require\('\.\/a\.js'\)/);
    assert.match(output, /from 'external-package'/);
    assert.match(output, /literal: '\.\/a'/);
    result = run();
    assert.equal(result.status, 0, result.stderr);
    assert.equal(fs.readFileSync(entry, 'utf8'), output, 'rewrite must be idempotent');
    fs.writeFileSync(entry, "export * from './missing';\n");
    result = run();
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Cannot resolve declaration specifier/);
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
});
