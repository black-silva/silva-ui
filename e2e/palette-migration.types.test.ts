// Run via npm run test:palette:types.
import type {} from './theme-scope.types.test';
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


import { createThemeScope, Theme, themeColors } from '../src/index';
import { createTheme } from '../src/core/create-theme';
import type { ThemeName } from '../src/index';

type Assert<T extends true> = T;
type CoversAllColors = Assert<Exclude<CSSNamedColor | `light-${CSSNamedColor}` | `dark-${CSSNamedColor}`, ThemeName> extends never ? true : false>;
type NoWidenedString = Assert<string extends ThemeName ? false : true>;
const builtin: ThemeName[] = ['light', 'dark', 'emerald', 'emerald-dark', 'midnight', 'light_surface1', 'midnight_surface2', 'red', 'light-rebeccapurple', 'dark-aliceblue'];
// @ts-expect-error Arbitrary names are not built-in.
const invalidName: ThemeName = 'brand';
// @ts-expect-error Shade tokens are not theme names.
const invalidShade: ThemeName = 'red5';
// @ts-expect-error Prefixed shade tokens are not theme names.
const invalidPrefixedShade: ThemeProps['name'] = 'dark-red10';
// @ts-expect-error Unknown surface names are not built-in.
const invalidSurface: ThemeProps['name'] = 'light_surface3';
// @ts-expect-error Main Theme does not acquire custom names automatically.
Theme({ name: 'brand' });
const cssClass = createTheme(themeColors, {} as { [K in keyof typeof themeColors]: string });
const tuple = createTheme({ custom: 'red' });
const Scoped = createThemeScope({ brand: cssClass, Alphabetic: cssClass, bespoke: tuple, nightbrand: { className: cssClass, mode: 'dark' } });
Scoped({ name: 'brand' });
Scoped({ name: 'Alphabetic' });
Scoped({ name: 'bespoke' });
Scoped({ name: 'dark-red' });
// @ts-expect-error A name from another scope is not registered here.
Scoped({ name: 'unregistered' });
// @ts-expect-error Class names are values, not names.
Scoped({ name: cssClass });
// @ts-expect-error A custom name cannot shadow a built-in.
createThemeScope({ light: cssClass });
// @ts-expect-error A custom name cannot shadow a CSS named color.
createThemeScope({ red: cssClass });
// @ts-expect-error A custom name cannot be a shade token.
createThemeScope({ red5: cssClass });
// @ts-expect-error Prefixed CSS color names are reserved too.
createThemeScope({ 'dark-blue': cssClass });
// @ts-expect-error Numeric color suffixes, including removed shades, are reserved.
createThemeScope({ 'light-red11': cssClass });
// @ts-expect-error Broad records cannot give a finite set of names.
createThemeScope({} as Record<string, string>);
void [builtin, invalidName, invalidShade, invalidPrefixedShade, invalidSurface];
