export const adapters = {
  cloudflare: {
    label: "Cloudflare Workers", tier: "reference", runtime: "Workers",
    packages: { devDependencies: { "wrangler": "^4.0.0" } },
    scripts: { dev: "wrangler dev", build: "wrangler deploy --dry-run" },
    files: {
      "src/entry.ts": `import { createApp } from "./app";\nexport default createApp();\n`,
      "wrangler.jsonc": `{\n  "name": "silva-ui-app",\n  "main": "src/entry.ts",\n  "compatibility_date": "2026-11-04"\n}\n`
    }
  },
  node: {
    label: "Node.js", tier: "reference", runtime: "Node 22+",
    packages: { dependencies: { "@hono/node-server": "^1.13.0" }, devDependencies: { "tsx": "^4.19.2" } },
    scripts: { dev: "tsx watch src/entry.ts", build: "tsc --outDir dist", start: "node dist/entry.js" },
    files: { "src/entry.ts": `import { serve } from "@hono/node-server";\nimport { createApp } from "./app";\nconst server = serve({ fetch: createApp().fetch, port: Number(process.env.PORT ?? 3000) });\nfor (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => server.close());\n` }
  },
  bun: {
    label: "Bun", tier: "candidate", runtime: "Bun",
    packages: {}, scripts: { dev: "bun --watch src/entry.ts", build: "bun build ./src/entry.ts --outdir dist --target bun", start: "bun dist/entry.js" },
    files: { "src/entry.ts": `import { createApp } from "./app";\nBun.serve({ fetch: createApp().fetch, port: Number(process.env.PORT ?? 3000) });\n` }
  },
  vercel: {
    label: "Vercel", tier: "candidate", runtime: "Vercel Functions",
    packages: { devDependencies: { "vercel": "^39.0.0" } }, scripts: { dev: "vercel dev", build: "vercel build" },
    files: { "api/index.ts": `import { handle } from "hono/vercel";\nimport { createApp } from "../src/app";\nexport default handle(createApp());\n`, "vercel.json": `{\n  "rewrites": [{ "source": "/(.*)", "destination": "/api" }]\n}\n` }
  },
  fastly: {
    label: "Fastly Compute", tier: "experimental", runtime: "Fastly Compute",
    packages: {}, scripts: { dev: "fastly compute serve", build: "fastly compute build" },
    files: { "src/entry.ts": `import { fire } from "hono/fastly";\nimport { createApp } from "./app";\nfire(createApp());\n`, "fastly.toml": `manifest_version = 3\nname = "silva-ui-app"\nlanguage = "javascript"\n` }
  },
  lambda: {
    label: "AWS Lambda", tier: "experimental", runtime: "AWS Lambda Node.js 22",
    packages: { dependencies: { "@hono/aws-lambda": "^1.4.0" }, devDependencies: { "esbuild": "^0.24.0" } }, scripts: { build: "esbuild src/entry.ts --bundle --platform=node --target=node22 --outfile=dist/index.mjs" },
    files: { "src/entry.ts": `import { handle } from "@hono/aws-lambda";\nimport { createApp } from "./app";\nexport const handler = handle(createApp());\n`, "template.yaml": `AWSTemplateFormatVersion: 2010-09-09\nTransform: AWS::Serverless-2016-10-31\nResources:\n  App:\n    Type: AWS::Serverless::Function\n    Properties:\n      Runtime: nodejs22.x\n      Handler: index.handler\n      CodeUri: dist/\n` }
  },
  netlify: {
    label: "Netlify Edge", tier: "experimental", runtime: "Deno Edge Functions",
    packages: { dependencies: { "@hono/netlify": "^1.1.0" }, devDependencies: { "netlify-cli": "^17.0.0" } }, scripts: { dev: "netlify dev", build: "netlify build" },
    files: { "netlify/edge-functions/app.ts": `import { handle } from "hono/netlify";\nimport { createApp } from "../../src/app";\nexport default handle(createApp());\n`, "netlify.toml": `[build]\n  command = "npm run build"\n\n[[edge_functions]]\n  function = "app"\n  path = "/*"\n` }
  },
  deno: {
    label: "Deno", tier: "experimental", runtime: "Deno",
    packages: {}, scripts: { dev: "deno run --allow-net --allow-read src/entry.ts", build: "deno check src/entry.ts" },
    files: { "src/entry.ts": `import { createApp } from "./app.tsx";\nDeno.serve({ port: Number(Deno.env.get("PORT") ?? 8000) }, createApp().fetch);\n`, "deno.json": `{\n  "tasks": { "dev": "deno run --allow-net --allow-read src/entry.ts", "check": "deno check src/entry.ts" }\n}\n` }
  },
  fastedge: {
    label: "Gcore FastEdge", tier: "experimental", runtime: "WASI Preview 2",
    packages: {}, scripts: { build: "fastedge-build", dev: "fastedge-run http wasm/app.wasm" },
    files: { "src/entry.ts": `import { createApp } from "./app";\ninterface FetchEvent { request: Request; respondWith(value: Response | Promise<Response>): void; }\ndeclare function addEventListener(type: "fetch", listener: (event: FetchEvent) => void): void;\nconst app = createApp();\naddEventListener("fetch", (event) => event.respondWith(app.fetch(event.request)));\n`, ".fastedge/README.md": `Build this adapter with the Gcore FastEdge SDK. Generate an asset manifest before compiling when client assets are added. No deployment credentials are stored here.\n` }
  }
};

export const adapterOptions = Object.entries(adapters).map(([value, adapter]) => ({ value, label: adapter.label, hint: `${adapter.runtime} · ${adapter.tier}` }));
