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
      assert.ok(files["src/components/Layout.tsx"], `${name} creates a shared layout`);
      assert.ok(files["src/pages/Home.tsx"], `${name} creates a home page`);
      assert.ok(files["src/pages/About.tsx"], `${name} creates an about page`);
      assert.match(files["README.md"], new RegExp(adapter.label));
      if (category === "full-stack") {
        assert.ok(files["src/api.ts"], `${name} creates an API overlay`);
        assert.ok(files["src/components/ApiMessageButton.tsx"], `${name} creates an API message component`);
      } else {
        assert.equal(files["src/api.ts"], undefined, `${name} omits the API overlay`);
        assert.equal(files["src/components/ApiMessageButton.tsx"], undefined, `${name} omits client API UI`);
      }
    }
  }
});

test("SSR-only starters separate routes from reusable UI without API behavior", () => {
  for (const name of Object.keys(adapters)) {
    const files = getSsrFiles("matrix-app", "ssr-only", name);
    assert.match(files["src/app.tsx"], /import \{ Home \} from "\.\/pages\/Home/);
    assert.match(files["src/app.tsx"], /import \{ About \} from "\.\/pages\/About/);
    assert.match(files["src/app.tsx"], /c\.render\(<Home \/>\)/);
    assert.doesNotMatch(files["src/app.tsx"], /app\.route\("\/api"/);
    assert.match(files["src/pages/Home.tsx"], /\.\.\/components\/Layout/);
    assert.doesNotMatch(files["src/pages/Home.tsx"], /ApiMessageButton/);
    assert.match(files["src/pages/Home.tsx"], /Edit src\/pages\/Home\.tsx/);
    assert.match(files["README.md"], /src\/pages/);
  }
});

test("full-stack starters organize pages and call their API from the home page", () => {
  for (const name of Object.keys(adapters)) {
    const files = getSsrFiles("matrix-app", "full-stack", name);
    assert.match(files["src/app.tsx"], /import \{ Home \} from "\.\/pages\/Home/);
    assert.match(files["src/app.tsx"], /app\.route\("\/api", api\)/);
    assert.match(files["src/pages/Home.tsx"], /\.\.\/components\/Layout/);
    assert.match(files["src/pages/Home.tsx"], /<ApiMessageButton \/>/);
    assert.match(files["src/components/ApiMessageButton.tsx"], /fetch\("\/api\/message"\)/);
    assert.match(files["src/components/ApiMessageButton.tsx"], /data\.message/);
  }
});

test("runtime adapters include their required compiler and type packages", () => {
  const bun = JSON.parse(getSsrFiles("matrix-app", "full-stack", "bun")["package.json"]);
  assert.ok(bun.devDependencies["@types/bun"]);
  assert.ok(bun.devDependencies["@types/node"]);

  const cloudflareSsrOnly = getSsrFiles("matrix-app", "ssr-only", "cloudflare");
  const cloudflareFullStack = getSsrFiles("matrix-app", "full-stack", "cloudflare");
  assert.equal(adapters.cloudflare.tier, "fully-supported");
  const cloudflare = JSON.parse(cloudflareSsrOnly["package.json"]);
  assert.equal(cloudflare.scripts["prepare:styles"], "node scripts/copy-silva-styles.js");
  assert.ok(cloudflareSsrOnly["scripts/copy-silva-styles.js"]);
  assert.match(cloudflareSsrOnly["src/app.tsx"], /href="\/silva-ui\.css"/);
  assert.match(cloudflareFullStack["src/app.tsx"], /href="\/silva-ui\.css"/);
  assert.match(cloudflareSsrOnly["wrangler.jsonc"], /"directory": "\.\/public"/);
  assert.match(cloudflareSsrOnly["wrangler.jsonc"], /"binding": "ASSETS"/);

  const vercelFiles = getSsrFiles("matrix-app", "full-stack", "vercel");
  assert.match(vercelFiles["api/index.ts"], /hono\/vercel/);
  assert.match(vercelFiles["api/index.ts"], /handle\(createApp\(\)\)/);
  assert.match(vercelFiles["vercel.json"], /"rewrites"/);
  assert.equal(vercelFiles["src/index.ts"], undefined);

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
  assert.match(netlifyFiles["import_map.json"], /hono\/jsx\/dom/);
  assert.match(netlifyFiles["netlify.toml"], /NETLIFY_EXPERIMENTAL_NPM_MODULES = "true"/);
});

test("invalid composition fails fast", () => {
  assert.throws(() => getSsrFiles("matrix-app", "ssr-only", "not-an-adapter"));
  assert.throws(() => getSsrFiles("matrix-app", "not-a-category", "node"));
});
