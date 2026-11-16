/** CSS Color Level 4 named colors (excluding transparent and currentColor). */
export type CSSNamedColor =
  'aliceblue' |
  'antiquewhite' |
  'aqua' |
  'aquamarine' |
  'azure' |
  'beige' |
  'bisque' |
  'black' |
  'blanchedalmond' |
  'blue' |
  'blueviolet' |
  'brown' |
  'burlywood' |
  'cadetblue' |
  'chartreuse' |
  'chocolate' |
  'coral' |
  'cornflowerblue' |
  'cornsilk' |
  'crimson' |
  'cyan' |
  'darkblue' |
  'darkcyan' |
  'darkgoldenrod' |
  'darkgray' |
  'darkgreen' |
  'darkgrey' |
  'darkkhaki' |
  'darkmagenta' |
  'darkolivegreen' |
  'darkorange' |
  'darkorchid' |
  'darkred' |
  'darksalmon' |
  'darkseagreen' |
  'darkslateblue' |
  'darkslategray' |
  'darkslategrey' |
  'darkturquoise' |
  'darkviolet' |
  'deeppink' |
  'deepskyblue' |
  'dimgray' |
  'dimgrey' |
  'dodgerblue' |
  'firebrick' |
  'floralwhite' |
  'forestgreen' |
  'fuchsia' |
  'gainsboro' |
  'ghostwhite' |
  'gold' |
  'goldenrod' |
  'gray' |
  'green' |
  'greenyellow' |
  'grey' |
  'honeydew' |
  'hotpink' |
  'indianred' |
  'indigo' |
  'ivory' |
  'khaki' |
  'lavender' |
  'lavenderblush' |
  'lawngreen' |
  'lemonchiffon' |
  'lightblue' |
  'lightcoral' |
  'lightcyan' |
  'lightgoldenrodyellow' |
  'lightgray' |
  'lightgreen' |
  'lightgrey' |
  'lightpink' |
  'lightsalmon' |
  'lightseagreen' |
  'lightskyblue' |
  'lightslategray' |
  'lightslategrey' |
  'lightsteelblue' |
  'lightyellow' |
  'lime' |
  'limegreen' |
  'linen' |
  'magenta' |
  'maroon' |
  'mediumaquamarine' |
  'mediumblue' |
  'mediumorchid' |
  'mediumpurple' |
  'mediumseagreen' |
  'mediumslateblue' |
  'mediumspringgreen' |
  'mediumturquoise' |
  'mediumvioletred' |
  'midnightblue' |
  'mintcream' |
  'mistyrose' |
  'moccasin' |
  'navajowhite' |
  'navy' |
  'oldlace' |
  'olive' |
  'olivedrab' |
  'orange' |
  'orangered' |
  'orchid' |
  'palegoldenrod' |
  'palegreen' |
  'paleturquoise' |
  'palevioletred' |
  'papayawhip' |
  'peachpuff' |
  'peru' |
  'pink' |
  'plum' |
  'powderblue' |
  'purple' |
  'rebeccapurple' |
  'red' |
  'rosybrown' |
  'royalblue' |
  'saddlebrown' |
  'salmon' |
  'sandybrown' |
  'seagreen' |
  'seashell' |
  'sienna' |
  'silver' |
  'skyblue' |
  'slateblue' |
  'slategray' |
  'slategrey' |
  'snow' |
  'springgreen' |
  'steelblue' |
  'tan' |
  'teal' |
  'thistle' |
  'tomato' |
  'turquoise' |
  'violet' |
  'wheat' |
  'white' |
  'whitesmoke' |
  'yellow' |
  'yellowgreen';
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
  if (!Number.isInteger(shade) || shade < 1 || shade > 10) throw new RangeError(`Invalid color shade ${shade}: use 1–10`);
  return `color-mix(in srgb-linear, ${color} ${shade * 10}%, ${base})`;
}

/** Resolve a named palette token on demand. No list of names is shipped at runtime.
 * Types enforce valid names; at runtime CSS validates the color identifier. */
export function namedColorTokenToCss(token: string): string | undefined {
  const match = /^([a-z]+)([0-9]+)?$/.exec(token);
  if (!match) return undefined;
  const shade = match[2] === undefined ? 1 : Number(match[2]);
  if (match[2] !== undefined && (!/^(?:[1-9]|10)$/.test(match[2]))) {
    throw new RangeError(`Invalid color shade in "${token}": use 1–10`);
  }
  return mixColor(match[1], shade as ColorShade, `var(${themeBaseVariable}, white)`);
}

// Compatibility accessors construct values only when requested. These are not
// enumerable token catalogues, and their keys cannot be used as sprinkles classes.
function lazyTokens(base: string): Record<ColorTokenName, string> {
  return new Proxy({} as Record<ColorTokenName, string>, {
    get(_target, key) {
      if (typeof key !== 'string') return undefined;
      const value = namedColorTokenToCss(key);
      return value?.replace(`var(${themeBaseVariable}, white)`, base);
    },
  });
}
function lazyScales(base: string): Record<CSSNamedColor, string[]> {
  return new Proxy({} as Record<CSSNamedColor, string[]>, {
    get(_target, key) {
      if (typeof key !== 'string' || !/^[a-z]+$/.test(key)) return undefined;
      return Array.from({ length: 10 }, (_, i) => mixColor(key, (i + 1) as ColorShade, base));
    },
  });
}
export const colorTokens = lazyTokens(`var(${themeBaseVariable}, white)`);
export const darkColorTokens = lazyTokens(`var(${themeBaseVariable}, black)`);
export const colorScales = lazyScales(`var(${themeBaseVariable}, white)`);
export const darkColorScales = lazyScales(`var(${themeBaseVariable}, black)`);
