// Run via npm run test:palette:types.
import type { BaseProps, ColorShade, ColorTokenName, CSSNamedColor, ThemeProps } from '../src/index';

const named: CSSNamedColor = 'rebeccapurple';
const alias: ColorTokenName = 'rebeccapurple';
const first: ColorTokenName = 'red1';
const last: ColorTokenName = 'blue10';
const shade: ColorShade = 10;
const background: BaseProps['backgroundColor'] = 'rebeccapurple5';
const foreground: BaseProps['color'] = { default: 'red10', hover: 'blue2', active: 'primary', focus: 'red1' };
const semantic: BaseProps['color'] = 'primary';
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
// @ts-expect-error Removed shades must not be accepted by component color props.
const removedProp: BaseProps['color'] = 'red11';
// @ts-expect-error Removed shades must not be accepted in conditional props.
const removedConditional: BaseProps['bg'] = { hover: 'red12' };
void [named, alias, first, last, shade, background, foreground, semantic, accent, invalidAccent, shadeZero, shadeEleven, shadeTwelve, shadeThirteen, unknownColor, removedProp, removedConditional];
