import { expect, test } from '@playwright/test';

// Import the public entry point through Vite, so vanilla-extract and the actual
// browser CSS engine are exercised rather than mocked.
const fsRoot = `/silva-ui/previews/@fs${process.cwd()}`;
test.setTimeout(90_000);

test.beforeEach(async ({ page }) => {
  // Use an inert same-origin document. Loading the preview application races
  // its Vite reload/navigation with these independent module imports.
  await page.route('**/palette-test-fixture', route => route.fulfill({ contentType: 'text/html', body: '<!doctype html><html><head></head><body></body></html>' }));
  await page.goto('/silva-ui/previews/palette-test-fixture', { waitUntil: 'domcontentloaded' });
});

test('public CSS named-color scales have ten valid srgb-linear mixes', async ({ page }) => {
  const result = await page.evaluate(async (root) => {
    const api = await import(/* @vite-ignore */ `${root}/src/index.ts`);
    const names: string[] = api.cssNamedColors;
    return {
      names,
      invalidNames: names.filter((name) => !CSS.supports('color', name) || name === 'transparent' || name === 'currentcolor'),
      entries: Object.fromEntries(names.map((name) => [name,
        Object.fromEntries(['colorTokens', 'darkColorTokens'].map((mode) => [mode,
          Array.from({ length: 10 }, (_, i) => {
            const token = `${name}${i + 1}`;
            const value = api[mode][token];
            const scale = mode === 'colorTokens' ? api.colorScales[name] : api.darkColorScales[name];
            return { token, value, valid: typeof value === 'string' && CSS.supports('color', value), matchesScale: scale?.[i] === value };
          }),
        ])),
      ])),
    };
  }, fsRoot);

  expect(result.names).toHaveLength(148);
  expect(new Set(result.names).size).toBe(148);
  expect(result.invalidNames).toEqual([]);
  for (const modes of Object.values(result.entries)) {
    for (const values of Object.values(modes)) {
      for (const { token, value, valid, matchesScale } of values) {
        expect(valid, token).toBe(true);
        expect(matchesScale, token).toBe(true);
        expect(value, token).toMatch(/color-mix\(\s*in\s+srgb-linear\s*,/i);
      }
    }
  }
});

test('removed shades 11 and 12 are absent from public color and theme contracts', async ({ page }) => {
  const result = await page.evaluate(async (root) => {
    const api = await import(/* @vite-ignore */ `${root}/src/index.ts`);
    return Object.fromEntries(['colorTokens', 'darkColorTokens', 'themeColors'].map((key) => [
      key, Object.keys(api[key]).filter((token) => /(?:11|12)$/.test(token)),
    ]));
  }, fsRoot);
  expect(result).toEqual({ colorTokens: [], darkColorTokens: [], themeColors: [] });
});

test('named themes change semantic and scale values without leaking across nested scopes', async ({ page }) => {
  const values = await page.evaluate(async (root) => {
    const api = await import(/* @vite-ignore */ `${root}/src/index.ts`);
    const { createElement: h, render } = await import(/* @vite-ignore */ `${root}/node_modules/hono/dist/jsx/dom/index.js`);
    const host = document.createElement('div');
    document.body.appendChild(host);
    const tree = (outer: string) => h(api.Theme, { name: outer, id: 'outer' },
      h(api.Theme, { name: 'dark-rebeccapurple', id: 'nested' }),
      h(api.Theme, { name: 'light-blue', id: 'sibling' }),
    );
    const read = (id: string) => {
      const element = host.querySelector(`#${id}`)!;
      const computed = getComputedStyle(element);
      const resolve = (token: string) => {
        const probe = document.createElement('i');
        probe.style.color = api.themeColors[token];
        element.appendChild(probe);
        const value = getComputedStyle(probe).color;
        probe.remove();
        return value;
      };
      return {
        theme: element.getAttribute('data-theme'),
        background: resolve('background'),
        primary: resolve('primary'),
        shade1: resolve('red1'),
        shade10: resolve('red10'),
        rawShade1: computed.getPropertyValue(api.themeColors.red1.slice(4, -1)).trim(),
      };
    };
    render(tree('light-red'), host);
    const before = { outer: read('outer'), nested: read('nested'), sibling: read('sibling') };
    render(tree('dark-red'), host);
    const after = { outer: read('outer'), nested: read('nested'), sibling: read('sibling') };
    host.remove();
    return { before, after };
  }, fsRoot);

  expect(values.before.outer.theme).toBe('light-red');
  expect(values.after.outer.theme).toBe('dark-red');
  expect(values.before.nested.theme).toBe('dark-rebeccapurple');
  expect(values.before.outer.background).not.toBe(values.after.outer.background);
  expect(values.before.outer.primary).not.toBe(values.after.outer.primary);
  expect(values.before.outer.shade1).not.toBe(values.after.outer.shade1);
  expect(values.before.outer.shade1).not.toBe(values.before.outer.shade10);
  expect(values.before.outer.rawShade1).not.toBe('');
  expect(values.before.nested.primary).not.toBe(values.after.outer.primary);
  // The named red palette follows the mode, not the semantic accent hue.
  expect(values.after.nested.shade1).toBe(values.after.outer.shade1);
  expect(values.after.nested).toEqual(values.before.nested);
  expect(values.after.sibling).toEqual(values.before.sibling);
});

test('built-in light/dark theme toggle restores semantic values', async ({ page }) => {
  const values = await page.evaluate(async (root) => {
    const api = await import(/* @vite-ignore */ `${root}/src/index.ts`);
    const { createElement: h, render } = await import(/* @vite-ignore */ `${root}/node_modules/hono/dist/jsx/dom/index.js`);
    const host = document.createElement('div');
    document.body.appendChild(host);
    const read = (name: string) => {
      render(h(api.Theme, { name }, h(api.Box, { bg: 'background', color: 'secondary' }, 'text')), host);
      const box = host.querySelector('[data-theme] > *')!;
      const css = getComputedStyle(box);
      return { background: css.backgroundColor, foreground: css.color };
    };
    const light = read('light');
    const dark = read('dark');
    const lightAgain = read('light');
    host.remove();
    return { light, dark, lightAgain };
  }, fsRoot);
  expect(values.light.background).not.toBe(values.dark.background);
  expect(values.light.foreground).not.toBe(values.dark.foreground);
  expect(values.lightAgain).toEqual(values.light);
});

test('theme accent and base variables update only their scope', async ({ page }) => {
  const values = await page.evaluate(async (root) => {
    const api = await import(/* @vite-ignore */ `${root}/src/index.ts`);
    const { createElement: h, render } = await import(/* @vite-ignore */ `${root}/node_modules/hono/dist/jsx/dom/index.js`);
    const host = document.createElement('div');
    document.body.appendChild(host);
    render(h(api.Theme, { name: 'light', accentColor: 'red', id: 'custom' },
      h(api.Theme, { name: 'dark', accentColor: 'blue', id: 'child' }),
    ), host);
    const parent = host.querySelector('#custom') as HTMLElement;
    const child = host.querySelector('#child') as HTMLElement;
    const read = (element: HTMLElement) => {
      const probe = document.createElement('i');
      element.appendChild(probe);
      const resolve = (token: string) => {
        probe.style.color = api.themeColors[token];
        return getComputedStyle(probe).color;
      };
      const value = { primary: resolve('primary'), named: resolve('red5') };
      probe.remove();
      return value;
    };
    const before = { parent: read(parent), child: read(child) };
    parent.style.setProperty(api.themeColorVariable, 'rebeccapurple');
    const recolored = { parent: read(parent), child: read(child) };
    parent.style.setProperty(api.themeBaseVariable, 'black');
    const rebased = { parent: read(parent), child: read(child) };
    host.remove();
    return { before, recolored, rebased };
  }, fsRoot);
  expect(values.recolored.parent.primary).not.toBe(values.before.parent.primary);
  expect(values.recolored.parent.named).toBe(values.before.parent.named);
  expect(values.rebased.parent.named).not.toBe(values.recolored.parent.named);
  expect(values.rebased.parent.primary).not.toBe(values.recolored.parent.primary);
  expect(values.recolored.child).toEqual(values.before.child);
  expect(values.rebased.child).toEqual(values.before.child);
});
