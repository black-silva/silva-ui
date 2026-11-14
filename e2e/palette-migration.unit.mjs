import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { transformWithOxc } from 'vite';

// These two modules are pure TypeScript with no runtime imports. Transpiling
// them here keeps the unit tests independent of a Vite server, CSS and a browser.
async function load(path) {
  const source = await readFile(new URL(path, import.meta.url), 'utf8');
  const { code: js } = await transformWithOxc(source, path);
  return import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
}
const colors = await load('../src/core/colors/index.ts');
const builder = await load('../src/core/theme-builder/index.ts');
const light = 'var(--silva-theme-base, white)';
const dark = 'var(--silva-theme-base, black)';
const mix = (name, percent, base) => `color-mix(in srgb-linear, ${name} ${percent}%, ${base})`;

test('on-demand tokens and both lazy accessors produce exactly 10–100% in 10% steps', () => {
  for (const name of ['red', 'rebeccapurple', 'aliceblue', 'black', 'white']) {
    assert.equal(colors.namedColorTokenToCss(name), mix(name, 10, light));
    assert.equal(colors.colorTokens[name], mix(name, 10, light));
    for (let shade = 1; shade <= 10; shade++) {
      const token = `${name}${shade}`;
      assert.equal(colors.namedColorTokenToCss(token), mix(name, shade * 10, light));
      assert.equal(colors.colorTokens[token], mix(name, shade * 10, light));
      assert.equal(colors.darkColorTokens[token], mix(name, shade * 10, dark));
      assert.equal(colors.colorScales[name][shade - 1], mix(name, shade * 10, light));
      assert.equal(colors.darkColorScales[name][shade - 1], mix(name, shade * 10, dark));
    }
    assert.equal(colors.colorScales[name].length, 10);
    assert.equal(colors.darkColorScales[name].length, 10);
  }
});

test('invalid shade syntax and removed scales throw, malformed tokens return undefined', () => {
  for (const token of ['red0', 'red11', 'red12', 'red13', 'red01']) {
    assert.throws(() => colors.namedColorTokenToCss(token), RangeError, token);
    assert.throws(() => colors.colorTokens[token], RangeError, token);
    assert.throws(() => colors.darkColorTokens[token], RangeError, token);
  }
  for (const shade of [0, 11, 12, 1.5, NaN]) assert.throws(() => colors.mixColor('red', shade, 'white'), RangeError);
  for (const token of ['red-1', '#fff', 'red 1', '']) assert.equal(colors.namedColorTokenToCss(token), undefined);
});

test('compatibility accessors remain lazy, non-enumerable and independent', () => {
  for (const proxy of [colors.colorTokens, colors.darkColorTokens, colors.colorScales, colors.darkColorScales]) {
    assert.deepEqual(Object.keys(proxy), []);
    assert.equal(proxy[Symbol.iterator], undefined);
  }
  const first = colors.colorScales.red;
  first[0] = 'mutated';
  assert.equal(colors.colorScales.red[0], mix('red', 10, light));
  assert.deepEqual(Object.keys(colors.colorTokens), []);
  assert.equal(colors.colorScales['red11'], undefined);
});

test('theme templates use one-based and negative indexes and reject out of range', () => {
  const palette = ['a', 'b', 'c'];
  assert.deepEqual(builder.applyThemeTemplate(palette, { first: 1, last: -1, override: 2 }, { override: 'custom' }), { first: 'a', last: 'c', override: 'custom' });
  for (const index of [0, 4, -4, 1.5]) assert.throws(() => builder.applyThemeTemplate(palette, { bad: index }), RangeError);
});
