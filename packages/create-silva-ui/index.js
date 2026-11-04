#!/usr/bin/env node
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cancel, intro, isCancel, note, outro, spinner, text } from '@clack/prompts';

const projectNamePattern = /^[a-z0-9][a-z0-9._-]*$/i;

function validateProjectName(value) {
  const name = value.trim();
  if (!name) {
    return 'Project name is required.';
  }

  if (!projectNamePattern.test(name)) {
    return 'Use letters, numbers, ".", "_" or "-"; and start with a letter or number.';
  }

  return undefined;
}

intro('create-silva-ui');

const positionalName = process.argv[2];
if (positionalName?.startsWith('-')) {
  cancel('Flags are not supported. Run: npm create silva-ui@latest <project-name>');
  process.exit(1);
}

let name = positionalName?.trim();
if (!name) {
  const promptedName = await text({
    message: 'Project name',
    placeholder: 'my-silva-ui-app',
    validate: validateProjectName,
  });

  if (isCancel(promptedName)) {
    cancel('Project creation cancelled.');
    process.exit(0);
  }

  name = promptedName.trim();
}

const validationError = validateProjectName(name);
if (validationError) {
  cancel(validationError);
  process.exit(1);
}

const packageRoot = dirname(fileURLToPath(import.meta.url));
const destination = resolve(process.cwd(), name);
const creating = spinner();
creating.start('Creating project...');

try {
  await mkdir(destination);
  await cp(resolve(packageRoot, 'template'), destination, { recursive: true });
  const packagePath = resolve(destination, 'package.json');
  const manifest = JSON.parse(await readFile(packagePath, 'utf8'));
  manifest.name = name;
  await writeFile(packagePath, `${JSON.stringify(manifest, null, 2)}\n`);
  creating.stop('Project created.');
  note(`cd ${name}\nnpm install\nnpm run dev`, 'Next steps');
  outro(`Ready: ${name}`);
} catch (error) {
  creating.stop('Project creation failed.');
  cancel(`Could not create ${name}: ${error.message}`);
  process.exit(1);
}
