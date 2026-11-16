// Run against the built preview: npm run build && npm run preview
// Then: CHROMIUM_PATH=/path/to/chromium npm run test:browser
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';

// Independently compare the runtime catalogue with the branch's union.
const unionSource = (await readFile(new URL('../../src/core/colors/index.ts', import.meta.url), 'utf8')).split('export type ColorShade')[0];
const listSource = (await readFile(new URL('./named-colors.ts', import.meta.url), 'utf8')).split('] as const')[0];
const readNames = source => [...source.matchAll(/'([a-z]+)'/g)].map(match => match[1]);
const unionNames = readNames(unionSource);
const runtimeNames = readNames(listSource);
assert.equal(new Set(runtimeNames).size, runtimeNames.length, 'duplicate runtime name');
assert.deepEqual([...runtimeNames].sort(), [...unionNames].sort(), 'runtime list differs from CSSNamedColor');

const browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}) });
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(process.env.PLAYGROUND_URL || 'http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  const input = page.getByLabel('Or enter a CSS named colour');
  const apply = page.getByRole('button', { name: 'Apply colour' });
  const shade = page.getByTestId('shade-10');
  const primary = page.getByTestId('semantic-primary');
  const getColor = locator => locator.evaluate(el => getComputedStyle(el).backgroundColor);
  const expectedColor = value => page.evaluate(value => {
    const probe = document.createElement('div');
    probe.style.backgroundColor = value;
    document.body.appendChild(probe);
    const result = getComputedStyle(probe).backgroundColor;
    probe.remove();
    return result;
  }, value);
  const select = async value => { await input.fill(value); await apply.click(); };
  const assertShade = async name => {
    await shade.waitFor();
    assert.equal(await shade.getAttribute('aria-label'), `${name}10`);
    assert.equal(await getColor(shade), await expectedColor(`color-mix(in srgb-linear, ${name} 100%, white)`));
    assert.match(await page.getByTestId('gradient').getAttribute('aria-label'), new RegExp(`${name}6`));
  };

  await assertShade('deepskyblue');
  await select('  PaPaYaWhIp  ');
  assert.equal(await input.inputValue(), 'papayawhip');
  await assertShade('papayawhip');
  assert.match(await page.getByText('Tokens:', { exact: false }).textContent(), /papayawhip1.*papayawhip10/);

  for (const invalid of ['', 'notacolor', 'transparent', 'currentColor', 'inherit', 'initial', 'unset', 'revert', 'revert-layer', '#ff0000', 'rgb(255, 0, 0)', 'color-mix(in srgb, red, blue)', 'red10']) {
    await select(invalid);
    assert.equal(await input.getAttribute('aria-invalid'), 'true', `accepted ${JSON.stringify(invalid)}`);
    assert.equal(await page.getByRole('alert').count(), 1);
    await assertShade('papayawhip');
  }

  await page.getByRole('button', { name: 'tomato', exact: true }).click();
  assert.equal(await input.inputValue(), 'tomato');
  assert.equal(await page.getByRole('alert').count(), 0);
  assert.equal(await page.getByRole('button', { name: 'tomato', exact: true }).getAttribute('aria-pressed'), 'true');
  await assertShade('tomato');
  await page.getByRole('button', { name: 'Dynamic light' }).click();
  await select('cornflowerblue');
  await assertShade('cornflowerblue');
  assert.match(await page.getByText('Active scope:', { exact: false }).textContent(), /light-cornflowerblue/);
  assert.equal(await getColor(primary), await expectedColor('color-mix(in srgb-linear, cornflowerblue 90%, white)'));

  await page.getByRole('button', { name: 'Dynamic dark' }).click();
  assert.match(await page.getByText('Active scope:', { exact: false }).textContent(), /dark-cornflowerblue/);
  assert.equal(await getColor(primary), await expectedColor('color-mix(in srgb-linear, cornflowerblue 90%, black)'));
  assert.equal(await getColor(page.getByTestId('shade-6')), await expectedColor('color-mix(in srgb-linear, cornflowerblue 60%, black)'));
  const darkPrimary = await getColor(primary);
  await select('transparent');
  assert.match(await page.getByText('Active scope:', { exact: false }).textContent(), /dark-cornflowerblue/);
  assert.equal(await getColor(primary), darkPrimary);
  await select('ALICEBLUE');
  await assertShade('aliceblue');
  assert.equal(await getColor(primary), await expectedColor('color-mix(in srgb-linear, aliceblue 90%, black)'));
  await input.fill('MediumSeaGreen');
  await input.press('Enter');
  await assertShade('mediumseagreen');
  assert.equal(await getColor(primary), await expectedColor('color-mix(in srgb-linear, mediumseagreen 90%, black)'));

  await page.getByRole('button', { name: 'Light', exact: true }).click();
  const builtinPrimary = await getColor(primary);
  await select('goldenrod');
  await assertShade('goldenrod');
  assert.equal(await getColor(primary), builtinPrimary, 'built-in accent should not follow selected colour');
  assert.deepEqual(errors, []);
  console.log('PASS: typed names and normalization, invalid inputs, presets, Enter, dynamic light/dark colours, built-in accent, swatches and gradients');
} finally {
  await browser.close();
}
