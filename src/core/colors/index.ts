/** CSS Color Level 4 named colors (excluding transparent and currentColor). */
export const cssNamedColors = [
  'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure',
  'beige', 'bisque', 'black', 'blanchedalmond', 'blue',
  'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse',
  'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson',
  'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray',
  'darkgreen', 'darkgrey', 'darkkhaki', 'darkmagenta', 'darkolivegreen',
  'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen',
  'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet',
  'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue',
  'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro',
  'ghostwhite', 'gold', 'goldenrod', 'gray', 'green',
  'greenyellow', 'grey', 'honeydew', 'hotpink', 'indianred',
  'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush',
  'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan',
  'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey', 'lightpink',
  'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey',
  'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen',
  'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid',
  'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise',
  'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin',
  'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab',
  'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen',
  'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru',
  'pink', 'plum', 'powderblue', 'purple', 'rebeccapurple',
  'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon',
  'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver',
  'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow',
  'springgreen', 'steelblue', 'tan', 'teal', 'thistle',
  'tomato', 'turquoise', 'violet', 'wheat', 'white',
  'whitesmoke', 'yellow', 'yellowgreen',
] as const;

export type CSSNamedColor = (typeof cssNamedColors)[number];
export type ColorShade = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type ColorTokenName = `${CSSNamedColor}${ColorShade}` | CSSNamedColor;

/** The theme input variables can be set on a theme scope or its Theme component. */
export const themeColorVariable = '--silva-theme-color';
export const themeBaseVariable = '--silva-theme-base';
export const themeContrastVariable = '--silva-theme-contrast';

// Select the better black/white foreground over all three primary states
// (80%, 90%, 100% mixes). These sets use CSS named-colour luminances and
// linear-sRGB mixing; the remaining names use black. This is deterministic on
// the server too, without relying on DOM colour parsing.
const whiteOnLight = new Set<CSSNamedColor>([
  'black', 'blue', 'brown', 'darkblue', 'darkgreen', 'darkmagenta', 'darkred',
  'darkslateblue', 'darkslategray', 'darkslategrey', 'indigo', 'maroon',
  'mediumblue', 'midnightblue', 'navy', 'purple', 'rebeccapurple', 'saddlebrown',
]);
const whiteOnDark = new Set<CSSNamedColor>([
  'black', 'blue', 'blueviolet', 'brown', 'crimson', 'darkblue', 'darkgreen',
  'darkmagenta', 'darkolivegreen', 'darkorchid', 'darkred', 'darkslateblue',
  'darkslategray', 'darkslategrey', 'darkviolet', 'dimgray', 'dimgrey',
  'firebrick', 'forestgreen', 'green', 'indigo', 'maroon', 'mediumblue',
  'mediumvioletred', 'midnightblue', 'navy', 'purple', 'rebeccapurple',
  'royalblue', 'saddlebrown', 'seagreen', 'sienna', 'slateblue', 'teal',
]);
export function accentContrast(color: CSSNamedColor, isDark: boolean): string {
  return (isDark ? whiteOnDark : whiteOnLight).has(color) ? '#ffffff' : '#000000';
}

/** Shade 1 is 10% color; shade 10 is 100% color. */
export function mixColor(color: string, shade: ColorShade, base: string): string {
  return `color-mix(in srgb-linear, ${color} ${shade * 10}%, ${base})`;
}

function createPaletteTokens(base: string) {
  const tokens: Record<string, string> = {};
  const scales: Record<string, string[]> = {};
  for (const color of cssNamedColors) {
    const scale = Array.from({ length: 10 }, (_, index) =>
      mixColor(color, (index + 1) as ColorShade, base),
    );
    scales[color] = scale;
    tokens[color] = scale[0];
    scale.forEach((value, index) => { tokens[`${color}${index + 1}`] = value; });
  }
  return {
    tokens: tokens as Record<ColorTokenName, string>,
    scales: scales as Record<CSSNamedColor, string[]>,
  };
}

// Named tokens always use their own literal CSS color, never the accent hue.
// The variable is resolved on each theme scope, allowing light/dark switches.
const light = createPaletteTokens(`var(${themeBaseVariable}, white)`);
const dark = createPaletteTokens(`var(${themeBaseVariable}, black)`);
export const colorTokens = light.tokens;
export const darkColorTokens = dark.tokens;
export const colorScales = light.scales;
export const darkColorScales = dark.scales;
export const colorTokenContract = Object.fromEntries(
  Object.keys(colorTokens).map((name) => [name, '']),
) as Record<ColorTokenName, ''>;
