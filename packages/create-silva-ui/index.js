#!/usr/bin/env node
import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { cancel, intro, isCancel, note, outro, select, spinner, text } from "@clack/prompts";
import { adapterOptions } from "./lib/adapters.js";
import { categoryOptions, getSsrFiles } from "./lib/ssr-project.js";

const projectNamePattern = /^[a-z0-9][a-z0-9._-]*$/i;
const staticOption = { value: "static", label: "Static SPA", hint: "Portable Vite + Ruta browser app." };
const validCategories = new Set(["static", ...categoryOptions.map((option) => option.value)]);
const validAdapters = new Set(adapterOptions.map((option) => option.value));

function validateProjectName(value) {
  const name = value.trim();
  if (!name) return "Project name is required.";
  if (!projectNamePattern.test(name)) return "Use letters, numbers, ., _ or -; and start with a letter or number.";
  return undefined;
}

async function choose(message, options, preset) {
  if (preset) return preset;
  const answer = await select({ message, options });
  if (isCancel(answer)) {
    cancel("Project creation cancelled.");
    process.exit(0);
  }
  return answer;
}

intro("create-silva-ui");
const positionalName = process.argv[2];
if (positionalName?.startsWith("-")) {
  cancel("Usage: npm create silva-ui@latest <project-name>");
  process.exit(1);
}

let name = positionalName?.trim();
if (!name) {
  const promptedName = await text({ message: "Project name", placeholder: "my-silva-ui-app", validate: validateProjectName });
  if (isCancel(promptedName)) {
    cancel("Project creation cancelled.");
    process.exit(0);
  }
  name = promptedName.trim();
}

const error = validateProjectName(name);
if (error) {
  cancel(error);
  process.exit(1);
}

const categoryPreset = process.env.SILVA_UI_TEMPLATE;
if (categoryPreset && !validCategories.has(categoryPreset)) {
  cancel(`SILVA_UI_TEMPLATE must be one of: ${[...validCategories].join(", ")}`);
  process.exit(1);
}
const category = await choose("What are you building?", [staticOption, ...categoryOptions], categoryPreset);

let adapter;
if (category !== "static") {
  const adapterPreset = process.env.SILVA_UI_ADAPTER;
  if (adapterPreset && !validAdapters.has(adapterPreset)) {
    cancel(`SILVA_UI_ADAPTER must be one of: ${[...validAdapters].join(", ")}`);
    process.exit(1);
  }
  adapter = await choose("Where will it run?", adapterOptions, adapterPreset);
}

const packageRoot = dirname(fileURLToPath(import.meta.url));
const destination = resolve(process.cwd(), name);
const creating = spinner();
creating.start("Creating project...");

try {
  await mkdir(destination);
  if (category === "static") {
    await cp(resolve(packageRoot, "template"), destination, { recursive: true });
    const packagePath = resolve(destination, "package.json");
    const manifest = JSON.parse(await readFile(packagePath, "utf8"));
    manifest.name = name;
    await writeFile(packagePath, `${JSON.stringify(manifest, null, 2)}\n`);
  } else {
    for (const [relativePath, content] of Object.entries(getSsrFiles(name, category, adapter))) {
      const output = resolve(destination, relativePath);
      await mkdir(dirname(output), { recursive: true });
      await writeFile(output, content);
    }
  }
  creating.stop("Project created.");
  note(`cd ${name}\nnpm install\nnpm run typecheck\nnpm run dev`, "Next steps");
  outro(`Ready: ${name}`);
} catch (creationError) {
  creating.stop("Project creation failed.");
  cancel(`Could not create ${name}: ${creationError.message}`);
  process.exit(1);
}
