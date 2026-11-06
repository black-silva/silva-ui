import { adapters } from "./adapters.js";

export const categories = {
  "full-stack": { label: "Full-stack SSR", description: "Hono pages with a small /api example." },
  "ssr-only": { label: "SSR-only", description: "Hono pages with normal server navigation." }
};

export const categoryOptions = Object.entries(categories).map(([value, category]) => ({ value, label: category.label, hint: category.description }));

function moduleExtension(adapter) {
  return adapter === "netlify" ? ".tsx" : "";
}

function silvaImport(adapter) {
  return adapter === "netlify" ? "../node_modules/silva-ui/dist/library/silva-ui.js" : "silva-ui";
}

const app = (fullStack, adapter) => `${adapter === "netlify" ? "// @ts-nocheck\n" : ""}import { Hono } from "${adapter === "netlify" ? "../node_modules/hono/dist/index.js" : "hono"}";
import { jsxRenderer } from "${adapter === "netlify" ? "../node_modules/hono/dist/middleware/jsx-renderer/index.js" : "hono/jsx-renderer"}";
${fullStack ? `import { H1, Text, YStack } from "${silvaImport(adapter)}";
import { api } from "./api.ts";` : `import { Home } from "./pages/Home${moduleExtension(adapter)}";
import { About } from "./pages/About${moduleExtension(adapter)}";`}

export function createApp() {
  const app = new Hono();
  app.use("*", jsxRenderer(({ children }) => (
    <html lang="en"><head><meta charSet="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>Silva UI</title></head><body>{children}</body></html>
  )));
  ${fullStack ? `app.get("/", (c) => c.render(<YStack gap="large"><H1>Silva UI SSR</H1><Text as="p">Your Hono JSX starter is ready.</Text></YStack>));
  app.get("/about", (c) => c.render(<YStack gap="medium"><H1>About</H1><Text as="p">This route uses normal server navigation.</Text></YStack>));
  app.route("/api", api);` : `app.get("/", (c) => c.render(<Home />));
  app.get("/about", (c) => c.render(<About />));`}
  app.notFound((c) => c.text("Not found", 404));
  return app;
}
`;

const layout = (adapter) => `import type { Child } from "hono/jsx";
import { Anchor, Box, H2, Text, Theme, XStack, YStack } from "${silvaImport(adapter)}";

interface LayoutProps {
  children: Child;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Theme name="green">
      <YStack gap="xl" p="medium" bg="background">
        <XStack alignItems="center" justifyContent="space-between" gap="medium" flexWrap="wrap">
          <Box href="/" textDecoration="none" color="secondary">
            <H2 fontSize="xl">silva-ui</H2>
          </Box>
          <XStack aria-label="Main navigation" gap="medium">
            <Anchor href="/" color="secondary">Home</Anchor>
            <Anchor href="/about" color="secondary">About</Anchor>
          </XStack>
        </XStack>

        {children}

        <Box as="footer" borderWidth={1} borderStyle="solid" borderColor="border" borderRadius="medium" p="medium">
          <Text color="muted" fontSize="sm">Built with Silva UI.</Text>
        </Box>
      </YStack>
    </Theme>
  );
}
`;

const home = (adapter) => `import { Anchor, Card, H1, Text, YStack } from "${silvaImport(adapter)}";
import { Layout } from "../components/Layout${moduleExtension(adapter)}";

export function Home() {
  return (
    <Layout>
      <YStack gap="large">
        <YStack gap="small">
          <H1 color="primary">Welcome to Silva UI</H1>
          <Text color="muted" lineHeight="relaxed">
            A small starting point for building your app.
          </Text>
        </YStack>

        <Card p="large" backgroundColor="ocean">
          <YStack gap="medium">
            <Text color="primaryContrast" fontWeight="bold">Start building</Text>
            <Text color="primaryContrast">Edit src/pages/Home.tsx and make this page yours.</Text>
            <Anchor href="/about" color="primaryContrast" fontWeight="bold">Meet the project</Anchor>
          </YStack>
        </Card>
      </YStack>
    </Layout>
  );
}
`;

const about = (adapter) => `import { Card, H1, Text, YStack } from "${silvaImport(adapter)}";
import { Layout } from "../components/Layout${moduleExtension(adapter)}";

export function About() {
  return (
    <Layout>
      <YStack gap="large">
        <YStack gap="small">
          <H1>About this starter</H1>
          <Text as="p" color="muted" lineHeight="relaxed">
            It has two pages, one shared layout, and normal server navigation.
          </Text>
        </YStack>

        <Card p="large">
          <YStack gap="medium">
            <Text as="p">Add pages in src/pages, then define their paths in src/app.tsx.</Text>
          </YStack>
        </Card>
      </YStack>
    </Layout>
  );
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
    "allowImportingTsExtensions": true,
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
    "src/app.tsx": app(fullStack, adapter),
    "README.md": `# ${name}\n\n${categories[category].label} starter for ${definition.label}.\n\nRuntime: ${definition.runtime}. Support tier: ${definition.tier}.\n\nRun \`npm install\`, \`npm run typecheck\`, then \`npm run dev\`.\n\nFor SSR-only apps, put routes in \`src/pages\` and shared UI in \`src/components\`.\n\nThe generator never creates cloud resources, stores secrets, or deploys on your behalf.\n`
  };
  if (!fullStack) {
    files["src/components/Layout.tsx"] = layout(adapter);
    files["src/pages/Home.tsx"] = home(adapter);
    files["src/pages/About.tsx"] = about(adapter);
  }
  if (adapter === "netlify") {
    files["src/netlify-silva-ui.d.ts"] = `declare module "../node_modules/silva-ui/dist/library/silva-ui.js" {
  export { Anchor, Box, Card, H1, H2, Text, Theme, XStack, YStack } from "silva-ui";
}
`;
    files["src/netlify-hono-dom.ts"] = `// @ts-nocheck
export { useEffect, useState } from "../node_modules/hono/dist/jsx/hooks/index.js";
`;
    files["src/netlify-hono-jsx-runtime.ts"] = `// @ts-nocheck
export * from "../node_modules/hono/dist/jsx/jsx-runtime.js";
`;
    files["import_map.json"] = `{
  "imports": {
    "hono/jsx/dom": "./src/netlify-hono-dom.ts",
    "hono/jsx/jsx-runtime": "./src/netlify-hono-jsx-runtime.ts"
  }
}
`;
  }
  if (fullStack) files["src/api.ts"] = api;
  Object.assign(files, definition.files);
  return files;
}
