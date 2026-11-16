// Test a real packed install outside the repository, without its tsconfig or node_modules.
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from '@babel/parser';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'silva-consumer-'));
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
// Optionally test another installed TypeScript version without changing project dependencies.
const compiler = process.env.SILVA_TEST_TSC || path.join(root, 'node_modules', 'typescript', 'bin', 'tsc');

// Check that the entry point's named value and type re-exports are unchanged.
function exportsIn(file) {
  const source = parse(fs.readFileSync(file, 'utf8'), { sourceType: 'module', plugins: ['typescript'] });
  return source.program.body.flatMap((statement) => {
    if (statement.type !== 'ExportNamedDeclaration') return [];
    return statement.specifiers.map((element) => `${statement.exportKind === 'type' || element.exportKind === 'type' ? 'type' : 'value'}:${element.exported.name}`);
  }).sort();
}

try {
  const pack = JSON.parse(execFileSync(npm, ['pack', '--json', '--ignore-scripts', '--pack-destination', temp], { cwd: root, encoding: 'utf8' }));
  const tarball = path.join(temp, pack[0].filename);
  const consumer = path.join(temp, 'consumer');
  fs.mkdirSync(consumer);
  fs.writeFileSync(path.join(consumer, 'package.json'), JSON.stringify({ private: true, type: 'module' }));
  execFileSync(npm, ['install', '--ignore-scripts', '--no-audit', '--no-fund', '--save-exact', tarball, 'hono@4.13.13'], { cwd: consumer, stdio: 'pipe' });
  for (const fixture of ['valid.tsx', 'invalid.tsx']) fs.copyFileSync(path.join(root, 'e2e', 'package-consumer', fixture), path.join(consumer, fixture));
  const sourceExports = exportsIn(path.join(root, 'src/index.ts'));
  assert.deepEqual(exportsIn(path.join(consumer, 'node_modules/silva-ui/dist/types/index.d.ts')), sourceExports, 'packed declarations must preserve the named public exports');
  const runtime = JSON.parse(execFileSync(process.execPath, ['--input-type=module', '-e', "import * as lib from 'silva-ui'; console.log(JSON.stringify({ exports: Object.keys(lib).sort(), style: import.meta.resolve('silva-ui/style.css') }));"], { cwd: consumer, encoding: 'utf8' }));
  assert.deepEqual(runtime.exports, sourceExports.filter((name) => name.startsWith('value:')).map((name) => name.slice(6)).sort(), 'packed runtime exports must match the public values');
  assert.ok(fs.existsSync(fileURLToPath(runtime.style)), 'exported stylesheet must exist in the tarball');

  for (const resolution of ['node16', 'nodenext', 'bundler']) {
    for (const skipLibCheck of [false, true]) {
      const config = {
        compilerOptions: {
          target: 'ES2022', module: resolution === 'bundler' ? 'ESNext' : resolution,
          moduleResolution: resolution, jsx: 'react-jsx', jsxImportSource: 'hono/jsx',
          strict: true, noEmit: true, skipLibCheck, types: [], noUncheckedSideEffectImports: true,
        },
        files: ['valid.tsx'],
      };
      const configPath = path.join(consumer, 'tsconfig.json');
      fs.writeFileSync(configPath, JSON.stringify(config));
      let result = spawnSync(process.execPath, [compiler, '-p', configPath, '--pretty', 'false'], { cwd: consumer, encoding: 'utf8' });
      assert.equal(result.status, 0, `${resolution} skipLibCheck=${skipLibCheck}: valid fixture failed\n${result.stdout}\n${result.stderr}`);
      config.files = ['invalid.tsx'];
      fs.writeFileSync(configPath, JSON.stringify(config));
      result = spawnSync(process.execPath, [compiler, '-p', configPath, '--pretty', 'false'], { cwd: consumer, encoding: 'utf8' });
      const diagnostics = [...result.stdout.matchAll(/^invalid\.tsx\((\d+),\d+\): error TS(\d+):/gm)].map((m) => `${m[1]}:${m[2]}`);
      assert.ok(result.status !== null && result.status !== 0, `${resolution} skipLibCheck=${skipLibCheck}: invalid fixture unexpectedly passed\n${result.stdout}\n${result.stderr}`);
      assert.deepEqual(diagnostics, ['2:2322', '3:2322', '4:2322', '5:2322'], `${resolution} skipLibCheck=${skipLibCheck}: wrong errors\n${result.stdout}\n${result.stderr}`);
      assert.equal((result.stdout.match(/error TS\d+:/g) || []).length, 4, `Unexpected additional diagnostics:\n${result.stdout}`);
      console.log(`PASS ${resolution} skipLibCheck=${skipLibCheck}: valid types, no any exports, four expected invalid diagnostics`);
    }
  }
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
