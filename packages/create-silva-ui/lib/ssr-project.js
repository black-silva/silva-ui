import { adapters } from "./adapters.js";
import { readFileSync } from "node:fs";

// Keep the SSR starters self-contained: edge runtimes cannot assume a public
// directory or a Node filesystem at request time.
const silvaStyles = [1, 2, 3, 4, 5].map((part) => readFileSync(new URL(`../template/silva-ui.css.br.base64.${part}`, import.meta.url), "utf8").trim()).join("");

export const categories = {
  "full-stack": { label: "Full-stack SSR", description: "Hono pages with a small /api example." },
  "ssr-only": { label: "SSR-only", description: "Hono pages with normal server navigation." }
};

export const categoryOptions = Object.entries(categories).map(([value, category]) => ({ value, label: category.label, hint: category.description }));

function moduleExtension(adapter) {
  return adapter === "deno" ? ".tsx" : adapter === "node" ? ".js" : "";
}

function stylesheetModuleExtension(adapter) {
  return adapter === "deno" ? ".ts" : "";
}

function runtimeImport(adapter, specifier) {
  return specifier;
}

function silvaImport(adapter) {
  return "silva-ui";
}

function supportTier(definition, category) {
  return definition.support?.[category] ?? definition.tier;
}

const app = (fullStack, adapter) => {
 const servesPackageStyles = adapter === "cloudflare" || adapter === "node" || adapter === "bun" || adapter === "fastly" || adapter === "deno";
 const nodeStaticStyles = adapter === "node" ? `app.get("/silva-ui.css", serveStatic({ path: "./public/silva-ui.css" }));` : "";
 const denoStaticStyles = adapter === "deno" ? `app.get("/silva-ui.css", serveStatic({ path: "./public/silva-ui.css" }));` : "";
 const bunStaticStyles = adapter === "bun" ? `app.get("/silva-ui.css", (c) => c.body(Bun.file("public/silva-ui.css"), 200, { "Content-Type": "text/css; charset=utf-8" }));` : "";
 const fastlyStaticStyles = adapter === "fastly" ? `const silvaStyles = includeBytes("../public/silva-ui.css");\napp.get("/silva-ui.css", (c) => c.body(silvaStyles, 200, { "Content-Type": "text/css; charset=utf-8" }));` : "";
 return `import { Hono } from "${runtimeImport(adapter, "hono")}";
import { jsxRenderer } from "${runtimeImport(adapter, "hono/jsx-renderer")}";
${adapter === "node" ? 'import { serveStatic } from "@hono/node-server/serve-static";' : adapter === "deno" ? 'import { serveStatic } from "hono/deno";' : ""}
${adapter === "fastly" ? 'import { includeBytes } from "fastly:experimental";' : ""}
import { Home } from "./pages/Home${moduleExtension(adapter)}";
import { About } from "./pages/About${moduleExtension(adapter)}";
${!servesPackageStyles ? `import silvaStyles from "./silva-ui.css${stylesheetModuleExtension(adapter)}";` : ""}
${fullStack ? `import { api } from "./api.ts";` : ""}

export function createApp() {
  const app = new Hono();
  app.use("*", jsxRenderer(({ children }) => (
    <html lang="en"><head><meta charSet="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><link rel="stylesheet" href="/silva-ui.css" /><title>Silva UI</title></head><body>{children}</body></html>
  )));
  ${!servesPackageStyles ? `app.get("/silva-ui.css", (c) => c.body(silvaStyles, 200, { "Content-Type": "text/css; charset=utf-8", "Content-Encoding": "br" }));` : ""}${nodeStaticStyles}${denoStaticStyles}${bunStaticStyles}${fastlyStaticStyles}
  app.get("/", (c) => c.render(<Home />));
  app.get("/about", (c) => c.render(<About />));
  ${fullStack ? `app.route("/api", api);` : ""}
  app.notFound((c) => c.text("Not found", 404));
  return app;
}
`;
};

const layout = (adapter) => `import type { Child } from "${runtimeImport(adapter, "hono/jsx")}";
import { Anchor, Box, H2, Text, Theme, XStack, YStack } from "${silvaImport(adapter, true)}";

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

const apiMessageButton = (adapter) => `import { Box, Text, YStack } from "${silvaImport(adapter, true)}";

export function ApiMessageButton() {
  return (
    <YStack gap="small">
      <Box as="button" id="api-message-button" type="button" bg="primary" color="primaryContrast" borderRadius="medium" p="medium">
        Call the API
      </Box>
      <Text id="api-message" aria-live="polite" color="muted">The API message will appear here.</Text>
      <script dangerouslySetInnerHTML={{ __html: 'document.getElementById("api-message-button")?.addEventListener("click", async () => { const target = document.getElementById("api-message"); if (!target) return; target.textContent = "Loading…"; try { const response = await fetch("/api/message"); const data = await response.json(); target.textContent = data.message; } catch { target.textContent = "Could not load the API message."; } });' }} />
    </YStack>
  );
}
`;

const home = (adapter, fullStack) => `import { Anchor, Card, H1, Text, YStack } from "${silvaImport(adapter, true)}";
import { Layout } from "../components/Layout${moduleExtension(adapter)}";
${fullStack ? `import { ApiMessageButton } from "../components/ApiMessageButton${moduleExtension(adapter)}";` : ""}

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
        ${fullStack ? "<ApiMessageButton />" : ""}
      </YStack>
    </Layout>
  );
}
`;

const about = (adapter) => `import { Card, H1, Text, YStack } from "${silvaImport(adapter, true)}";
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

const api = (adapter) => `import { Hono } from "${runtimeImport(adapter, "hono")}";

export const api = new Hono();
api.get("/message", (c) => c.json({ message: "Hello from Silva UI" }));
`;

const tsconfig = (adapter) => `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true,
    "allowImportingTsExtensions": true,
    "jsx": "react-jsx",
    "jsxImportSource": "hono/jsx"${adapter === "fastly" ? ',\n    "types": ["@fastly/js-compute"]' : ""}
  },
  "include": ["src", "api"]
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
    "tsconfig.json": tsconfig(adapter),
    "src/app.tsx": app(fullStack, adapter),
    "README.md": `# ${name}\n\n${categories[category].label} starter for ${definition.label}.\n\nRuntime: ${definition.runtime}. Support tier: ${supportTier(definition, category)}.\n\nRun \`npm install\`, \`npm run typecheck\`, then \`npm run dev\`.\n\nPut routes in \`src/pages\` and shared UI in \`src/components\`.${fullStack ? " The home page includes a small /api/message example." : ""}\n\nThe generator never creates cloud resources, stores secrets, or deploys on your behalf.\n`
  };
  if (adapter !== "cloudflare" && adapter !== "node" && adapter !== "bun" && adapter !== "fastly" && adapter !== "deno") files["src/silva-ui.css.ts"] = `const silvaStyles = Uint8Array.from(atob(${JSON.stringify(silvaStyles)}), (character) => character.charCodeAt(0));\n\nexport default silvaStyles;\n`;
  files["src/components/Layout.tsx"] = layout(adapter);
  files["src/pages/Home.tsx"] = home(adapter, fullStack);
  files["src/pages/About.tsx"] = about(adapter);
  if (fullStack) {
    files["src/api.ts"] = api(adapter);
    files["src/components/ApiMessageButton.tsx"] = apiMessageButton(adapter);
  }
  Object.assign(files, definition.files);
  return files;
}
