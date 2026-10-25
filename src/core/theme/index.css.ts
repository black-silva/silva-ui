import { createGlobalTheme, createThemeContract } from '@vanilla-extract/css';
import { colorTokenContract, colorTokens, darkColorTokens } from '../colors';
import { buildThemeSet } from '../theme-builder';
import {
  allThemeDefinitions,
  darkThemeNames,
  lightColors,
} from '../themes';
import { createTheme } from '../create-theme';

const themeContract = {
  ...colorTokenContract,
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
  ...colorTokens,
  ...lightColors,
};

createGlobalTheme(':root', themeColors, defaultThemeValues);

const themedValues = Object.fromEntries(
  Object.entries(allThemeDefinitions).map(([name, values]) => [
    name,
    {
      ...(
        darkThemeNames.has(name) ||
        name.startsWith('dark_') ||
        name.startsWith('emerald-dark_') ||
        name.startsWith('midnight_')
          ? darkColorTokens
          : colorTokens
      ),
      ...values,
    },
  ]),
) as { [Name in keyof typeof allThemeDefinitions]: typeof defaultThemeValues };

for (const [name, values] of Object.entries(themedValues)) {
  createGlobalTheme(`[data-theme="${name}"]`, themeColors, values);
}

export const themes = buildThemeSet(
  (values) => createTheme(themeColors, values),
  defaultThemeValues,
  themedValues,
);

export const lightTheme = themes.light;
export const darkTheme = themes.dark;
export const emeraldTheme = themes.emerald;
export const emeraldDarkTheme = themes['emerald-dark'];
export const midnightTheme = themes.midnight;

export type ThemeName = keyof typeof themes;
