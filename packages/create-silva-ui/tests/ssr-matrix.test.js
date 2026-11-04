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

test("invalid composition fails fast", () => {
  assert.throws(() => getSsrFiles("matrix-app", "ssr-only", "not-an-adapter"));
  assert.throws(() => getSsrFiles("matrix-app", "not-a-category", "node"));
});
