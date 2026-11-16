# Palette playground

[Try the hosted playground](https://black-silva.github.io/silva-ui-palette-playground/). The hosted site is a manually deployed snapshot in the separate [palette playground repository](https://github.com/black-silva/silva-ui-palette-playground), not an automatic deployment of this branch.

Test the palette migration from this branch with Hono JSX DOM and Silva UI components. From a fresh clone, check out this PR branch, then run:

```sh
npm ci
cd examples/palette-playground
npm run dev
```

Open the local URL printed by Vite. Node.js 20.19.x or 22.12+ is required; use a recent browser with `color-mix(in srgb-linear, ...)` support. The playground uses the **root** lockfile and dependencies; don't run a separate install inside the example. Vite aliases `silva-ui` to this checkout's `src/index.ts`, compiling its Vanilla Extract styles, so no published package or prebuilt `dist` is used.

Choose a preset or enter any supported CSS named colour and select **Apply colour** (or press Enter). Input is trimmed and case-insensitive. Invalid input leaves the current colour unchanged; CSS functions, hex values, `transparent`, `currentColor` and global keywords are not accepted. Compare shades 1–10, semantic surfaces, the hover/keyboard-focus swatch and the gradient in a built-in or dynamic light/dark scope. Dynamic scopes use the selected colour for semantic roles; built-in scopes retain their own accents. Check contrast in your own designs, including interactive states.

`named-colors.ts` contains a runtime allowlist mirroring this branch's `CSSNamedColor` union because the type is erased at runtime. Its type checks reject both extra and missing names: update the list whenever the union changes and run the example typecheck. Validation deliberately does not rely on browser CSS parsing, which accepts values outside the type.

Optional checks, from this directory:

```sh
npm run typecheck
npm run build
npm run preview
```

With the production preview running at its default URL, run `npm run test:browser` in another shell. Install Playwright Chromium first if needed (`npx playwright install chromium` from the root), or set `CHROMIUM_PATH` to an existing Chromium executable. Set `PLAYGROUND_URL` if the preview uses a different URL. The test checks the runtime list against the source union as well as the input and theme behaviour.
