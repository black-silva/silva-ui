import { createGlobalTheme, createThemeContract, globalStyle, style } from '@vanilla-extract/css';
import { accentContrast, themeBaseVariable, themeColorVariable, themeContrastVariable, type CSSNamedColor } from '../colors';
import { allThemeDefinitions, lightColors } from '../themes';

const themeContract = {
  primary: '',
  primaryHover: '',
  primaryActive: '',
  primaryContrast: '',
  secondary: '',
  background: '',
  card: '',
  subtle: '',
  muted: '',
  border: '',
  ring: '',
  error: '',
  success: '',
  warning: '',
  info: '',
  white: '',
  black: '',
  transparent: '',
  overlay: '',
  destructive: '',
};

export const themeColors = createThemeContract(themeContract);

const defaultThemeValues: { [Key in keyof typeof themeContract]: string } = {
  ...lightColors,
};

createGlobalTheme(':root', themeColors, defaultThemeValues);
globalStyle(':root', { vars: { [themeColorVariable]: 'deepskyblue', [themeBaseVariable]: 'white' } });
globalStyle('html, body', { margin: 0, minHeight: '100%' });

const semanticVars = (values: typeof lightColors) => Object.fromEntries(
  Object.entries(values).map(([name, value]) => [themeColors[name as keyof typeof themeColors], value]),
);

// Classes and data-theme selectors have the same semantic values, but palette
// declarations are shared below. This also avoids copying the whole contract
// into both versions of each theme.
export const themes = Object.fromEntries(
  Object.entries(allThemeDefinitions).map(([name, values]) => {
    const vars = semanticVars(values);
    const className = style({ vars });
    globalStyle(`[data-theme="${name}"]`, { vars });
    return [name, className];
  }),
) as { [Name in keyof typeof allThemeDefinitions]: string };

const themeInputs: Record<string, { color: CSSNamedColor; base: string }> = {
  light: { color: 'deepskyblue', base: 'white' },
  dark: { color: 'deepskyblue', base: 'black' },
  emerald: { color: 'seagreen', base: 'white' },
  'emerald-dark': { color: 'seagreen', base: 'black' },
  midnight: { color: 'slateblue', base: 'black' },
};
for (const [name, className] of Object.entries(themes)) {
  const inputs = themeInputs[name.split('_')[0]];
  if (!inputs) continue;
  globalStyle(`[data-theme="${name}"], .${className}`, {
    // Surface themes inherit the selected accent from their parent scope.
    vars: name.includes('_')
      ? { [themeBaseVariable]: inputs.base }
      : { [themeColorVariable]: inputs.color, [themeBaseVariable]: inputs.base, [themeContrastVariable]: accentContrast(inputs.color, inputs.base === 'black') },
  });
}

export const lightTheme = themes.light;
export const darkTheme = themes.dark;
export const emeraldTheme = themes.emerald;
export const emeraldDarkTheme = themes['emerald-dark'];
export const midnightTheme = themes.midnight;

export type ThemeName = keyof typeof themes;
