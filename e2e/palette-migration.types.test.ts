// Compile explicitly with:
// npx tsc --ignoreConfig --noEmit --strict --skipLibCheck --module ESNext --moduleResolution bundler --target ES2022 --jsx react-jsx --jsxImportSource hono/jsx e2e/palette-migration.types.test.ts
import type { ColorTokenName, Sprinkles, ThemeProps } from '../src/index';

const named: ColorTokenName = 'rebeccapurple';
const first: ColorTokenName = 'red1';
const last: ColorTokenName = 'blue10';
const background: Sprinkles['backgroundColor'] = 'rebeccapurple5';
const foreground: Sprinkles['color'] = 'red10';
const semantic: Sprinkles['color'] = 'primary';
const accent: ThemeProps['accentColor'] = 'rebeccapurple';
// @ts-expect-error Theme accents must be CSS named colors.
const invalidAccent: ThemeProps['accentColor'] = 'not-a-css-color';

// @ts-expect-error Color scales begin at 1.
const shadeZero: ColorTokenName = 'red0';
// @ts-expect-error 11 is a removed legacy shade.
const shadeEleven: ColorTokenName = 'red11';
// @ts-expect-error 12 is a removed legacy shade.
const shadeTwelve: ColorTokenName = 'blue12';
// @ts-expect-error 13 is outside the supported scale.
const shadeThirteen: ColorTokenName = 'blue13';
// @ts-expect-error This is not a CSS named color.
const unknownColor: ColorTokenName = 'definitelynotacolor5';
// @ts-expect-error Removed shades must not be accepted by color props either.
const removedProp: Sprinkles['color'] = 'red11';

void [named, first, last, background, foreground, semantic, shadeZero, shadeEleven, shadeTwelve, shadeThirteen, unknownColor, removedProp];
