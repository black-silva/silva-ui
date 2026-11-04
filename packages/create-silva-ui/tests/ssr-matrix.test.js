import assert from "node:assert/strict";
import test from "node:test";
import { adapters } from "../lib/adapters.js";
import { getSsrFiles } from "../lib/ssr-project.js";

test("every adapter composes both SSR categories", () => {
  for (const [name, adapter] of Object.entries(adapters)) {
    for (const category of ["ssr-only", "full-stack"]) {
      const files = getSsrFiles("matrix-app", category, name);
      assert.ok(files["src/app.tsx"], `${name} creates the shared app`);
      assert.ok(files["package.json"], `${name} creates a manifest`);
      assert.match(files["README.md"], new RegExp(adapter.label));
      if (category === "full-stack") assert.ok(files["src/api.ts"], `${name} creates an API overlay`);
      else assert.equal(files["src/api.ts"], undefined, `${name} omits the API overlay`);
    }
  }
});

test("runtime adapters include their required compiler and type packages", () => {
  const bun = JSON.parse(getSsrFiles("matrix-app", "full-stack", "bun")["package.json"]);
  assert.ok(bun.devDependencies["@types/bun"]);
  assert.ok(bun.devDependencies["@types/node"]);

  const fastlyFiles = getSsrFiles("matrix-app", "full-stack", "fastly");
  const fastly = JSON.parse(fastlyFiles["package.json"]);
  assert.equal(fastly.dependencies["@fastly/hono-fastly-compute"], "^0.3.10");
  assert.ok(fastly.dependencies["@fastly/js-compute"]);
  assert.ok(fastly.devDependencies["@fastly/cli"]);
  assert.match(fastlyFiles["src/entry.ts"], /@fastly\/hono-fastly-compute/);
  assert.match(fastlyFiles["fastly.toml"], /build = "npm run build"/);

  const fastedgeFiles = getSsrFiles("matrix-app", "full-stack", "fastedge");
  const fastedge = JSON.parse(fastedgeFiles["package.json"]);
  assert.equal(fastedge.devDependencies["@gcoredev/fastedge-sdk-js"], "^2.7.0");
  assert.equal(fastedge.scripts.build, "fastedge-build --config");
  assert.match(fastedgeFiles[".fastedge/build-config.js"], /tsConfigPath: "\.\/tsconfig\.json"/);

  const netlifyFiles = getSsrFiles("matrix-app", "full-stack", "netlify");
  const netlify = JSON.parse(netlifyFiles["package.json"]);
  assert.equal(netlify.dependencies?.["@hono/netlify"], undefined);
  assert.equal(netlify.devDependencies["netlify-cli"], "^27.16.2");
  assert.match(netlifyFiles["netlify/edge-functions/app.ts"], /app\.fetch\(request, context\)/);
  assert.match(netlifyFiles["src/app.tsx"], /node_modules\/hono\/dist\/index\.js/);
  assert.match(netlifyFiles["src/app.tsx"], /node_modules\/hono\/dist\/middleware\/jsx-renderer\/index\.js/);
  assert.match(netlifyFiles["src/app.tsx"], /node_modules\/silva-ui\/dist\/library\/silva-ui\.js/);
  assert.match(netlifyFiles["import_map.json"], /hono\/jsx\/dom/);
  assert.match(netlifyFiles["netlify.toml"], /NETLIFY_EXPERIMENTAL_NPM_MODULES = "true"/);
});

test("invalid composition fails fast", () => {
  assert.throws(() => getSsrFiles("matrix-app", "ssr-only", "not-an-adapter"));
  assert.throws(() => getSsrFiles("matrix-app", "not-a-category", "node"));
});
