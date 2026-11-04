import { adapters } from "./adapters.js";

export const categories = {
  "full-stack": { label: "Full-stack SSR", description: "Hono pages with a small /api example." },
  "ssr-only": { label: "SSR-only", description: "Hono pages with normal server navigation." }
};

export const categoryOptions = Object.entries(categories).map(([value, category]) => ({ value, label: category.label, hint: category.description }));

const app = (fullStack) => `import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import { H1, Text, YStack } from "silva-ui";
${fullStack ? "import { api } from \"./api\";" : ""}

export function createApp() {
  const app = new Hono();
  app.use("*", jsxRenderer(({ children }) => (
    <html lang="en"><head><meta charSet="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>Silva UI</title></head><body>{children}</body></html>
  )));
  app.get("/", (c) => c.render(<YStack gap="large"><H1>Silva UI SSR</H1><Text as="p">Your Hono JSX starter is ready.</Text></YStack>));
  app.get("/about", (c) => c.render(<YStack gap="medium"><H1>About</H1><Text as="p">This route uses normal server navigation.</Text></YStack>));
  ${fullStack ? "app.route(\"/api\", api);" : ""}
  app.notFound((c) => c.text("Not found", 404));
  return app;
}
`;

const api = `import { Hono } from "hono";

export const api = new Hono();
api.get("/message", (c) => c.json({ message: "Hello from Silva UI" }));
`;

const tsconfig = `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "jsxImportSource": "hono/jsx"
  },
  "include": ["src", "api", "netlify"]
}
`;

function manifest(name, adapter) {
  const definition = adapters[adapter];
  const packageData = definition.packages ?? {};
  return {
    name,
    version: "0.1.0",
    private: true,
    type: "module",
    scripts: { typecheck: "tsc --noEmit", ...definition.scripts },
    dependencies: { hono: "^4.13.13", "silva-ui": "^1.2.0", ...(packageData.dependencies ?? {}) },
    devDependencies: { typescript: "^5.7.3", ...(packageData.devDependencies ?? {}) }
  };
}

export function getSsrFiles(name, category, adapter) {
  if (!categories[category]) throw new Error(`Unknown category: ${category}`);
  if (!adapters[adapter]) throw new Error(`Unknown adapter: ${adapter}`);
  const fullStack = category === "full-stack";
  const definition = adapters[adapter];
  const files = {
    "package.json": `${JSON.stringify(manifest(name, adapter), null, 2)}\n`,
    "tsconfig.json": tsconfig,
    "src/app.tsx": app(fullStack),
    "README.md": `# ${name}\n\n${categories[category].label} starter for ${definition.label}.\n\nRuntime: ${definition.runtime}. Support tier: ${definition.tier}.\n\nRun \`npm install\`, \`npm run typecheck\`, then \`npm run dev\`.\n\nThe generator never creates cloud resources, stores secrets, or deploys on your behalf.\n`
  };
  if (fullStack) files["src/api.ts"] = api;
  Object.assign(files, definition.files);
  return files;
}
