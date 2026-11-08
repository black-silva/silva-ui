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
  assert.equal(adapters.cloudflare.support["full-stack"], "fully-supported");
  assert.equal(adapters.node.tier, "fully-supported");
  assert.equal(adapters.node.support["ssr-only"], "fully-supported");
  assert.equal(adapters.node.support["full-stack"], "fully-supported");
  assert.equal(adapters.bun.tier, "fully-supported");
  assert.equal(adapters.bun.support["ssr-only"], "fully-supported");
  assert.equal(adapters.bun.support["full-stack"], "fully-supported");
  assert.equal(adapters.fastly.tier, "fully-supported");
  assert.equal(adapters.fastly.support["ssr-only"], "fully-supported");
  assert.equal(adapters.fastly.support["full-stack"], "fully-supported");
  assert.match(getSsrFiles("matrix-app", "full-stack", "node")["README.md"], /Support tier: fully-supported\./);
  assert.match(getSsrFiles("matrix-app", "full-stack", "bun")["README.md"], /Support tier: fully-supported\./);
  assert.match(getSsrFiles("matrix-app", "full-stack", "fastly")["README.md"], /Support tier: fully-supported\./);
  assert.equal(adapters.deno.tier, "fully-supported");
  assert.equal(adapters.deno.support["ssr-only"], "fully-supported");
  assert.equal(adapters.deno.support["full-stack"], "fully-supported");
  const denoSsrOnly = getSsrFiles("matrix-app", "ssr-only", "deno");
  assert.match(denoSsrOnly["package.json"], /"deno": "\^2\.9\.6"/);
  assert.match(denoSsrOnly["package.json"], /deno run --allow-net --allow-read --allow-env src\/entry\.ts/);
  assert.match(denoSsrOnly["src/app.tsx"], /\.\/pages\/Home\.tsx/);
  assert.match(denoSsrOnly["src/app.tsx"], /serveStatic\(\{ path: "\.\/public\/silva-ui\.css" \}\)/);
  assert.match(cloudflareFullStack["README.md"], /Support tier: fully-supported\./);
  const cloudflare = JSON.parse(cloudflareSsrOnly["package.json"]);
  assert.equal(cloudflare.scripts["prepare:styles"], "node scripts/copy-silva-styles.js");
  assert.ok(cloudflareSsrOnly["scripts/copy-silva-styles.js"]);
  assert.match(cloudflareSsrOnly["src/app.tsx"], /href="\/silva-ui\.css"/);
  assert.match(cloudflareFullStack["src/app.tsx"], /href="\/silva-ui\.css"/);
  assert.match(cloudflareSsrOnly["wrangler.jsonc"], /"directory": "\.\/public"/);
  assert.match(cloudflareSsrOnly["wrangler.jsonc"], /"binding": "ASSETS"/);
  assert.match(cloudflareSsrOnly["scripts/copy-silva-styles.js"], /import\.meta\.resolve\("silva-ui\/style\.css"\)/);
  for (const category of ["ssr-only", "full-stack"]) {
    const cloudflareFiles = getSsrFiles("matrix-app", category, "cloudflare");
    assert.equal(cloudflareFiles["src/silva-ui.css.ts"], undefined);
    assert.match(cloudflareFiles["scripts/copy-silva-styles.js"], /import\.meta\.resolve\("silva-ui\/style\.css"\)/);
  }

  const fastlyFiles = getSsrFiles("matrix-app", "full-stack", "fastly");
  const fastly = JSON.parse(fastlyFiles["package.json"]);
  assert.equal(fastly.dependencies["@fastly/hono-fastly-compute"], "^0.3.10");
  assert.ok(fastly.dependencies["@fastly/js-compute"]);
  assert.ok(fastly.devDependencies["@fastly/cli"]);
  assert.match(fastlyFiles["src/entry.ts"], /@fastly\/hono-fastly-compute/);
  assert.match(fastlyFiles["fastly.toml"], /build = "npm run build"/);


});

test("adapters serve Silva styles through their runtime-appropriate flow", () => {
  for (const name of Object.keys(adapters).filter((name) => !["cloudflare", "node", "bun", "fastly", "deno"].includes(name))) {
    for (const category of ["ssr-only", "full-stack"]) {
      const files = getSsrFiles("matrix-app", category, name);
      assert.ok(files["src/silva-ui.css.ts"], `${name} embeds the Silva stylesheet`);
      assert.match(files["src/silva-ui.css.ts"], /Uint8Array\.from\(atob/);
      assert.ok(files["src/silva-ui.css.ts"].length > 30_000, `${name} includes the compressed stylesheet`);
      assert.match(files["src/app.tsx"], /href="\/silva-ui\.css"/);
      assert.match(files["src/app.tsx"], /Content-Encoding": "br"/);
      assert.match(files["src/app.tsx"], /app\.get\("\/silva-ui\.css"/);
    }
  }
  for (const category of ["ssr-only", "full-stack"]) {
    const node = getSsrFiles("matrix-app", category, "node");
    const packageJson = JSON.parse(node["package.json"]);
    assert.equal(node["src/silva-ui.css.ts"], undefined);
    assert.match(node["scripts/copy-silva-styles.js"], /import\.meta\.resolve\("silva-ui\/style\.css"\)/);
    assert.match(node["src/app.tsx"], /serveStatic\(\{ path: "\.\/public\/silva-ui\.css" \}\)/);
    assert.equal(packageJson.scripts["prepare:styles"], "node scripts/copy-silva-styles.js");
  }
  for (const category of ["ssr-only", "full-stack"]) {
    const deno = getSsrFiles("matrix-app", category, "deno");
    const packageJson = JSON.parse(deno["package.json"]);
    assert.equal(deno["src/silva-ui.css.ts"], undefined);
    assert.match(deno["scripts/copy-silva-styles.ts"], /require\.resolve\("silva-ui\/style\.css"\)/);
    assert.match(deno["src/app.tsx"], /import \{ serveStatic \} from "hono\/deno"/);
    assert.equal(packageJson.scripts["prepare:styles"], "deno run --allow-read --allow-write scripts/copy-silva-styles.ts");
  }
  for (const category of ["ssr-only", "full-stack"]) {
    const bun = getSsrFiles("matrix-app", category, "bun");
    const packageJson = JSON.parse(bun["package.json"]);
    assert.equal(bun["src/silva-ui.css.ts"], undefined);
    assert.match(bun["scripts/copy-silva-styles.ts"], /import\.meta\.resolve\("silva-ui\/style\.css"\)/);
    assert.match(bun["src/app.tsx"], /Bun\.file\("public\/silva-ui\.css"\)/);
    assert.equal(packageJson.scripts["prepare:styles"], "bun scripts/copy-silva-styles.ts");
  }
  for (const category of ["ssr-only", "full-stack"]) {
    const fastly = getSsrFiles("matrix-app", category, "fastly");
    const packageJson = JSON.parse(fastly["package.json"]);
    assert.equal(fastly["src/silva-ui.css.ts"], undefined);
    assert.match(fastly["scripts/copy-silva-styles.js"], /import\.meta\.resolve\("silva-ui\/style\.css"\)/);
    assert.match(fastly["src/app.tsx"], /includeBytes\("\.\/public\/silva-ui\.css"\)/);
    assert.equal(packageJson.scripts["prepare:styles"], "node scripts/copy-silva-styles.js");
  }
});

test("invalid composition fails fast", () => {
  assert.throws(() => getSsrFiles("matrix-app", "ssr-only", "not-an-adapter"));
  assert.throws(() => getSsrFiles("matrix-app", "not-a-category", "node"));
});
