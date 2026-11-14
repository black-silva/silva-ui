import { expect, test } from '@playwright/test';

// Import through Vite to exercise the public API, generated CSS and the real CSS engine.
const fsRoot = `/silva-ui/previews/@fs${process.cwd()}`;
test.setTimeout(20_000);
test.beforeEach(async ({ page }) => {
  await page.route('**/palette-test-fixture', route => route.fulfill({ contentType: 'text/html', body: '<!doctype html><html><head></head><body></body></html>' }));
  await page.goto('/silva-ui/previews/palette-test-fixture', { waitUntil: 'domcontentloaded' });
});

test('named themes and custom accents resolve exact semantic and named mixes in both modes', async ({ page }) => {
  const result = await page.evaluate(async (root) => {
    const api = await import(/* @vite-ignore */ `${root}/src/index.ts`);
    const { createElement: h, render } = await import(/* @vite-ignore */ `${root}/node_modules/hono/dist/jsx/dom/index.js`);
    const host = document.createElement('div'); document.body.appendChild(host);
    render(h('div', {},
      h(api.Theme, { name: 'light-red', id: 'lightNamed' }),
      h(api.Theme, { name: 'dark-red', id: 'darkNamed' }),
      h(api.Theme, { name: 'light', accentColor: 'rebeccapurple', id: 'lightAccent' }),
      h(api.Theme, { name: 'dark', accentColor: 'rebeccapurple', id: 'darkAccent' }),
    ), host);
    const read = (id: string, base: string, accent: string) => {
      const scope = host.querySelector(`#${id}`)!;
      const probe = document.createElement('i'); scope.appendChild(probe);
      const resolve = (value: string) => { probe.style.color = ''; probe.style.color = value; return getComputedStyle(probe).color; };
      const result = {
        primary: resolve(api.themeColors.primary), expectedPrimary: resolve(`color-mix(in srgb-linear, ${accent} 90%, ${base})`),
        named: resolve(api.namedColorTokenToCss('red5')), expectedNamed: resolve(`color-mix(in srgb-linear, red 50%, ${base})`),
        background: resolve(api.themeColors.background), secondary: resolve(api.themeColors.secondary),
      };
      probe.remove(); return result;
    };
    return { lightNamed: read('lightNamed', 'white', 'red'), darkNamed: read('darkNamed', 'black', 'red'), lightAccent: read('lightAccent', 'white', 'rebeccapurple'), darkAccent: read('darkAccent', 'black', 'rebeccapurple') };
  }, fsRoot);
  for (const scope of Object.values(result)) {
    expect(scope.primary).toBe(scope.expectedPrimary);
    expect(scope.named).toBe(scope.expectedNamed);
  }
  expect(result.lightNamed.background).not.toBe(result.darkNamed.background);
  expect(result.lightAccent.secondary).not.toBe(result.darkAccent.secondary);
});

test('nested scopes isolate base, accent and semantic tokens', async ({ page }) => {
  const result = await page.evaluate(async (root) => {
    const api = await import(/* @vite-ignore */ `${root}/src/index.ts`);
    const { createElement: h, render } = await import(/* @vite-ignore */ `${root}/node_modules/hono/dist/jsx/dom/index.js`);
    const host = document.createElement('div'); document.body.appendChild(host);
    const tree = (name: string) => h(api.Theme, { name, id: 'outer' },
      h(api.Box, { id: 'outerBox', bg: 'red5', color: 'primary' }),
      h(api.Theme, { name: 'dark-rebeccapurple', id: 'nested' }, h(api.Box, { id: 'nestedBox', bg: 'red5', color: 'primary' })),
      h(api.Theme, { name: 'light-blue', id: 'sibling' }, h(api.Box, { id: 'siblingBox', bg: 'red5', color: 'primary' })));
    const read = (id: string) => { const css = getComputedStyle(host.querySelector(`#${id}`)!); return { bg: css.backgroundColor, color: css.color }; };
    render(tree('light-red'), host);
    const before = { outer: read('outerBox'), nested: read('nestedBox'), sibling: read('siblingBox') };
    render(tree('dark-red'), host);
    const after = { outer: read('outerBox'), nested: read('nestedBox'), sibling: read('siblingBox') };
    return { before, after };
  }, fsRoot);
  expect(result.before.outer.bg).not.toBe(result.after.outer.bg);
  expect(result.before.outer.color).not.toBe(result.after.outer.color);
  expect(result.after.nested).toEqual(result.before.nested);
  expect(result.after.sibling).toEqual(result.before.sibling);
  expect(result.after.nested.bg).toBe(result.after.outer.bg);
});

test('gradient stops resolve semantic, named and literal CSS colors', async ({ page }) => {
  const result = await page.evaluate(async (root) => {
    const api = await import(/* @vite-ignore */ `${root}/src/index.ts`);
    const linear = api.gradientToCss({ from: 'red5', via: 'primary', to: '#abcdef' });
    const radial = api.gradientToCss({ type: 'radial', from: 'currentColor', to: 'blue10' });
    const conic = api.gradientToCss({ type: 'conic', deg: 45, from: 'rgb(1, 2, 3)', to: 'white' });
    return { linear, radial, conic, primary: api.themeColors.primary, valid: [linear, radial, conic].map(x => CSS.supports('background-image', x)) };
  }, fsRoot);
  expect(result.linear).toContain('color-mix(in srgb-linear, red 50%, var(--silva-theme-base, white))');
  expect(result.linear).toContain(result.primary);
  expect(result.linear).toContain('#abcdef');
  expect(result.radial).toContain('currentColor');
  expect(result.conic).toContain('from 45deg');
  expect(result.valid).toEqual([true, true, true]);
});

test('Box resolves default, hover, active and keyboard focus named colors', async ({ page }) => {
  await page.evaluate(async (root) => {
    const api = await import(/* @vite-ignore */ `${root}/src/index.ts`);
    const { createElement: h, render } = await import(/* @vite-ignore */ `${root}/node_modules/hono/dist/jsx/dom/index.js`);
    render(h(api.Theme, { name: 'light' }, h(api.Box, { as: 'button', id: 'probe', bg: { default: 'red1', hover: 'red2', active: 'red3', focus: 'red4' }, color: { default: 'red5', hover: 'primary', active: 'blue5', focus: 'secondary' }, style: { padding: '12px' } }, 'probe')), document.body);
  }, fsRoot);
  const probe = page.locator('#probe');
  const expected = async (shade: number) => page.evaluate(shade => {
    const el = document.createElement('i'); document.body.appendChild(el);
    el.style.backgroundColor = `color-mix(in srgb-linear, red ${shade * 10}%, white)`;
    const value = getComputedStyle(el).backgroundColor; el.remove(); return value;
  }, shade);
  const semanticColor = async (token: string) => page.evaluate(async ({ root, token }) => {
    const api = await import(/* @vite-ignore */ `${root}/src/index.ts`);
    const el = document.createElement('i'); document.querySelector('#probe')!.appendChild(el);
    el.style.color = api.themeColors[token]; const value = getComputedStyle(el).color; el.remove(); return value;
  }, { root: fsRoot, token });
  await expect(probe).toHaveCSS('background-color', await expected(1));
  await probe.hover(); await expect(probe).toHaveCSS('background-color', await expected(2));
  await expect(probe).toHaveCSS('color', await semanticColor('primary'));
  await page.mouse.down(); await expect(probe).toHaveCSS('background-color', await expected(3)); await page.mouse.up();
  await page.mouse.move(0, 0); await page.keyboard.press('Tab');
  if (!await probe.evaluate(el => el.matches(':focus-visible'))) await page.keyboard.press('Shift+Tab');
  await expect(probe).toBeFocused();
  await expect(probe).toHaveCSS('background-color', await expected(4));
});

test('compound controls apply named colors to wrapper and preserve object styles on inputs', async ({ page }) => {
  const values = await page.evaluate(async (root) => {
    const api = await import(/* @vite-ignore */ `${root}/src/index.ts`);
    const { createElement: h, render } = await import(/* @vite-ignore */ `${root}/node_modules/hono/dist/jsx/dom/index.js`);
    const props = (id: string) => ({ id, bg: 'red5', style: { marginTop: '13px', '--kept': 'yes' } });
    render(h(api.Theme, { name: 'light' },
      h(api.Checkbox, props('check'), 'check'),
      h(api.Switch, props('switch'), 'switch'),
      h(api.RadioGroup, {}, h(api.RadioGroupItem, { ...props('radio'), value: 'a' }, 'radio')),
      h(api.Slider, props('slider')),
      h(api.Select, { ...props('select'), options: [{ value: 'a', label: 'A' }] })
    ), document.body);
    const probe = document.createElement('i'); document.body.appendChild(probe);
    probe.style.backgroundColor = 'color-mix(in srgb-linear, red 50%, white)';
    const expected = getComputedStyle(probe).backgroundColor; probe.remove();
    return { expected, controls: Object.fromEntries(['check', 'switch', 'radio', 'slider', 'select'].map(id => {
      const input = document.getElementById(id)!;
      const wrapper = input.parentElement!;
      return [id, { background: getComputedStyle(wrapper).backgroundColor, margin: getComputedStyle(input).marginTop, custom: getComputedStyle(input).getPropertyValue('--kept').trim() }];
    })) };
  }, fsRoot);
  for (const [name, value] of Object.entries(values.controls)) {
    expect.soft(value.background, `${name} wrapper background`).toBe(values.expected);
    expect.soft(value.margin, `${name} input margin`).toBe('13px');
    expect.soft(value.custom, `${name} input custom property`).toBe('yes');
  }
});

test('Button named state colors override variant colors and preserve object styles', async ({ page }) => {
  await page.evaluate(async (root) => {
    const api = await import(/* @vite-ignore */ `${root}/src/index.ts`);
    const { createElement: h, render } = await import(/* @vite-ignore */ `${root}/node_modules/hono/dist/jsx/dom/index.js`);
    render(h(api.Theme, { name: 'light', accentColor: 'red', id: 'scope', style: { padding: '7px', '--custom': 'kept' } },
      h(api.Card, { id: 'card', bg: 'red5', style: { padding: '11px', '--card': 'kept' } },
        h(api.CardHeader, { id: 'header', color: 'blue5', style: { marginTop: '13px', '--header': 'kept' } }, 'header'),
        h(api.Button, { id: 'button', bg: { default: 'red1', hover: 'red2', active: 'red3', focus: 'red4' }, color: 'secondary', borderColor: 'blue5', style: { marginTop: '17px', '--button': 'kept' } }, 'button')
      )), document.body);
  }, fsRoot);
  const card = page.locator('#card'); const header = page.locator('#header'); const button = page.locator('#button');
  await expect(card).toHaveCSS('padding-top', '11px');
  await expect(header).toHaveCSS('margin-top', '13px');
  await expect(button).toHaveCSS('margin-top', '17px');
  expect(await page.locator('#scope').evaluate(el => getComputedStyle(el).getPropertyValue('--custom').trim())).toBe('kept');
  expect(await card.evaluate(el => getComputedStyle(el).getPropertyValue('--card').trim())).toBe('kept');
  expect(await header.evaluate(el => getComputedStyle(el).getPropertyValue('--header').trim())).toBe('kept');
  expect(await button.evaluate(el => getComputedStyle(el).getPropertyValue('--button').trim())).toBe('kept');
  const expected = async (shade: number) => page.evaluate(shade => {
    const probe = document.createElement('i'); document.querySelector('#scope')!.appendChild(probe);
    probe.style.backgroundColor = `color-mix(in srgb-linear, red ${shade * 10}%, white)`;
    const color = getComputedStyle(probe).backgroundColor; probe.remove(); return color;
  }, shade);
  await expect(button).toHaveCSS('background-color', await expected(1));
  await button.hover(); await expect(button).toHaveCSS('background-color', await expected(2));
  await page.mouse.down(); await expect(button).toHaveCSS('background-color', await expected(3)); await page.mouse.up();
  await page.mouse.move(0, 0); await page.keyboard.press('Tab');
  // Focus-visible is keyboard-specific; explicitly focus via keyboard if Tab did not select the button.
  if (!await button.evaluate(el => el.matches(':focus-visible'))) { await page.keyboard.press('Tab'); }
  await expect(button).toBeFocused();
  await expect(button).toHaveCSS('background-color', await expected(4));
});
