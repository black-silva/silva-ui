import { colorTokens, darkColorTokens } from '../colors';

export const themePalettes = {
  light: [
    'transparent',
    colorTokens.gray1,
    colorTokens.gray2,
    colorTokens.gray3,
    colorTokens.gray4,
    colorTokens.gray5,
    colorTokens.gray6,
    colorTokens.gray7,
    colorTokens.gray8,
    colorTokens.gray9,
    colorTokens.gray10,
    colorTokens.gray11,
    colorTokens.gray12,
    'transparent',
  ],
  dark: [
    'transparent',
    darkColorTokens.gray1,
    darkColorTokens.gray2,
    darkColorTokens.gray3,
    darkColorTokens.gray4,
    darkColorTokens.gray5,
    darkColorTokens.gray6,
    darkColorTokens.gray7,
    darkColorTokens.gray8,
    darkColorTokens.gray9,
    darkColorTokens.gray10,
    darkColorTokens.gray11,
    darkColorTokens.gray12,
    'transparent',
  ],
} as const;

export const themeTemplates = {
  base: {
    background: 1,
    card: 2,
    subtle: 3,
    border: 5,
    muted: 8,
    secondary: 11,
  },
  surface1: {
    background: 2,
    card: 3,
    subtle: 4,
    border: 6,
    muted: 9,
    secondary: 12,
  },
  surface2: {
    background: 3,
    card: 4,
    subtle: 5,
    border: 7,
    muted: 10,
    secondary: 12,
  },
} as const;

export const lightColors = {
  primary: '#0369a1',
  primaryHover: '#0284c7',
  primaryActive: '#075985',
  primaryContrast: '#ffffff',
  secondary: '#0f172a',
  background: '#f8fafc',
  card: '#ffffff',
  subtle: '#f1f5f9',
  muted: '#64748b',
  border: '#e2e8f0',
  ring: '#0284c7',
  error: '#dc2626',
  success: '#16a34a',
  warning: '#d97706',
  info: '#0284c7',
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
  overlay: 'rgba(15, 23, 42, 0.5)',
  destructive: '#dc2626',
};

export const darkColors: typeof lightColors = {
  primary: '#38bdf8',
  primaryHover: '#7dd3fc',
  primaryActive: '#0284c7',
  primaryContrast: '#09090b',
  secondary: '#f8fafc',
  background: '#09090b',
  card: '#18181b',
  subtle: '#27272a',
  muted: '#a1a1aa',
  border: '#27272a',
  ring: '#38bdf8',
  error: '#f87171',
  success: '#4ade80',
  warning: '#fbbf24',
  info: '#38bdf8',
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.75)',
  destructive: '#ef4444',
};

export const emeraldColors: typeof lightColors = {
  primary: '#047857',
  primaryHover: '#065f46',
  primaryActive: '#064e3b',
  primaryContrast: '#ffffff',
  secondary: '#0d1714',
  background: '#fcfdfd',
  card: '#ffffff',
  subtle: '#ebeeed',
  muted: '#526660',
  border: '#cbd5d1',
  ring: '#059669',
  error: '#dc2626',
  success: '#059669',
  warning: '#d97706',
  info: '#0284c7',
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
  overlay: 'rgba(13, 23, 20, 0.5)',
  destructive: '#dc2626',
};

export const emeraldDarkColors: typeof lightColors = {
  primary: '#10b981',
  primaryHover: '#34d399',
  primaryActive: '#059669',
  primaryContrast: '#040605',
  secondary: '#e6fef4',
  background: '#040605',
  card: '#121715',
  subtle: '#1f2825',
  muted: '#708f85',
  border: '#2d3935',
  ring: '#10b981',
  error: '#f87171',
  success: '#34d399',
  warning: '#fbbf24',
  info: '#38bdf8',
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
  overlay: 'rgba(4, 6, 5, 0.8)',
  destructive: '#ef4444',
};

export const midnightColors: typeof lightColors = {
  primary: '#6366f1',
  primaryHover: '#818cf8',
  primaryActive: '#4f46e5',
  primaryContrast: '#ffffff',
  secondary: '#f8fafc',
  background: '#020817',
  card: '#0f172a',
  subtle: '#1e293b',
  muted: '#94a3b8',
  border: '#1e293b',
  ring: '#6366f1',
  error: '#f87171',
  success: '#34d399',
  warning: '#fbbf24',
  info: '#38bdf8',
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
  overlay: 'rgba(2, 8, 23, 0.85)',
  destructive: '#ef4444',
};

export const themeDefinitions = {
  light: lightColors,
  dark: darkColors,
  emerald: emeraldColors,
  'emerald-dark': emeraldDarkColors,
  midnight: midnightColors,
};

export const darkThemeNames = new Set(['dark', 'emerald-dark', 'midnight']);

const surfaceThemeNames = ['surface1', 'surface2'] as const;
export const nestedThemeDefinitions = Object.fromEntries(
  Object.entries(themeDefinitions).flatMap(([name, values]) => {
    const isDark = darkThemeNames.has(name);
    const palette = isDark ? themePalettes.dark : themePalettes.light;

    return surfaceThemeNames.map((surfaceName) => {
      const template = themeTemplates[surfaceName];
      const nestedValues = Object.fromEntries(
        Object.entries(template).map(([token, index]) => [
          token,
          palette[index] ?? values[token as keyof typeof values],
        ]),
      );
      return [`${name}_${surfaceName}`, { ...values, ...nestedValues }];
    });
  }),
) as Record<string, typeof lightColors>;

export const allThemeDefinitions = {
  ...themeDefinitions,
  ...nestedThemeDefinitions,
};

export const TAMAGUI_EMERALD_PREVIEW_URL = 'https://tamagui.dev/theme';
