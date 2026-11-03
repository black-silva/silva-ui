#!/usr/bin/env node
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const name = process.argv[2];
if (!name || name.startsWith('-')) {
  console.error('Usage: npm create silva-ui@latest <project-name>');
  process.exit(1);
}

const packageRoot = dirname(fileURLToPath(import.meta.url));
const destination = resolve(process.cwd(), name);

try {
  await mkdir(destination);
  await cp(resolve(packageRoot, 'template'), destination, { recursive: true });
  const packagePath = resolve(destination, 'package.json');
  const manifest = JSON.parse(await readFile(packagePath, 'utf8'));
  manifest.name = name;
  await writeFile(packagePath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Created ${name}.`);
  console.log('Next:');
  console.log(`  cd ${name}`);
  console.log('  npm install');
  console.log('  npm run dev');
} catch (error) {
  console.error(`Could not create ${name}: ${error.message}`);
  process.exit(1);
}
