import { cls } from './utils';
import { accentContrast, mixColor, themeBaseVariable, themeColorVariable, themeContrastVariable, type ColorShade, type CSSNamedColor } from './colors';
import { themeColors, themes, type ThemeName } from './theme.css';
import { darkColors, lightColors, themeTemplates } from './themes';
import type { BaseProps } from './types';

export interface ThemeProps<Name extends string = ThemeName> extends BaseProps {
  /** A built-in, CSS named color, or a custom name supplied by createThemeScope. */
  name?: Name;
  /** Override this theme scope's semantic accent with a CSS named color. */
  accentColor?: CSSNamedColor;
  /** HTML element to render. Defaults to 'div'. */
  as?: string;
  [key: string]: any;
}

type ThemeStyle = Record<string, string>;

function getDynamicColorTheme(name: string): ThemeStyle | undefined {
  const match = name.match(/^(?:(light|dark)-)?([a-zA-Z]+)$/);
  if (!match) return undefined;

  const mode = match[1] ?? 'light';
  // CSSNamedColor is type-only: untyped JS can pass an unknown alphabetic
  // name here. No runtime catalogue validates it; an invalid color can make
  // dependent CSS declarations invalid at computed-value time.
  const colorName = match[2].toLowerCase();
  const isDark = mode === 'dark';
  const scale = Array.from({ length: 10 }, (_, index) =>
    mixColor(`var(${themeColorVariable})`, (index + 1) as ColorShade, `var(${themeBaseVariable})`),
  );

  const palette = ['transparent', ...scale, 'transparent'];
  const baseColors = isDark ? darkColors : lightColors;
  const templateValues = Object.fromEntries(
    Object.entries(themeTemplates.base).map(([token, index]) => [
      token,
      palette[index] ?? baseColors[token as keyof typeof baseColors],
    ]),
  );
  const semanticValues = {
    ...baseColors,
    ...templateValues,
    // Keep readable mode-specific text instead of using a hue's 100% stop.
    secondary: baseColors.secondary,
    primary: palette[9] ?? baseColors.primary,
    primaryHover: palette[10] ?? baseColors.primaryHover,
    primaryActive: palette[8] ?? baseColors.primaryActive,
    primaryContrast: `var(${themeContrastVariable})`,
    ring: palette[8] ?? baseColors.ring,
  };
  return {
    [themeColorVariable]: colorName,
    [themeBaseVariable]: isDark ? 'black' : 'white',
    [themeContrastVariable]: accentContrast(colorName as CSSNamedColor, isDark),
    ...Object.fromEntries(
      Object.entries(semanticValues).map(([token, value]) => [
        themeColors[token as keyof typeof themeColors].match(/^var\((--[^)]+)\)/)?.[1] ?? token,
        value,
      ]),
    ),
  };
}

type CustomTheme = string | readonly [string, unknown] | { className: string; mode?: 'light' | 'dark' };
type ReservedName = ThemeName | `${CSSNamedColor}${number}` | `light-${CSSNamedColor}${number}` | `dark-${CSSNamedColor}${number}`;
type ScopedEntry = { className: string; mode?: 'light' | 'dark' };

/**
 * Bind vanilla-extract theme classes to names in a locally typed component.
 * TypeScript requires literal, required keys and rejects built-in, CSS color and
 * shade names, using case-sensitive CSS color literals and numeric suffix patterns.
 * At runtime only built-in theme collisions are checked: JS callers or type
 * assertions can register color/shade names, and custom entries take precedence
 * over dynamic color themes. Alphabetic custom names are allowed.
 * Use { className, mode } to set the palette base and accent contrast for a mode;
 * otherwise the base is inherited and an accent override uses light-mode contrast.
 */
export function createThemeScope<const T extends Record<string, CustomTheme>>(
  definitions: T & (string extends keyof T ? never : {
    [K in keyof T]-?: {} extends Pick<T, K> ? never : K extends ReservedName ? never : T[K]
  }),
) {
  const entries = new Map<string, ScopedEntry>();
  for (const [name, value] of Object.entries(definitions)) {
    if (Object.hasOwn(themes, name)) {
      throw new Error(`Custom theme name "${name}" is reserved`);
    }
    const entry: ScopedEntry = typeof value === 'string'
      ? { className: value }
      : Array.isArray(value)
        ? { className: value[0] }
        : value as ScopedEntry;
    if (!entry || typeof entry.className !== 'string' || !entry.className.trim() ||
        (entry.mode !== undefined && entry.mode !== 'light' && entry.mode !== 'dark')) {
      throw new TypeError(`Invalid custom theme class for "${name}"`);
    }
    entries.set(name, { ...entry });
  }
  return function ScopedTheme(props: ThemeProps<ThemeName | Extract<keyof T, string>>) {
    return renderTheme(props, entries);
  };
}

/**
 * Theme — container for applying and nesting themes (sub-theming).
 *
 * Modeled after Tamagui's `<Theme name="...">`.
 * Applies the corresponding CSS variable theme class and `data-theme` attribute.
 *
 * @example
 * ```tsx
 * <Theme name="dark">
 *   <Card bg="background" p="medium">
 *     <Text color="secondary">Dark themed card</Text>
 *     <Theme name="light">
 *       <Button>Light themed button inside dark card</Button>
 *     </Theme>
 *   </Card>
 * </Theme>
 * ```
 */
export function Theme(props: ThemeProps) {
  return renderTheme(props);
}

function renderTheme({
  name = 'light',
  as: Tag = 'div',
  accentColor,
  class: extraClass,
  style: inlineStyle,
  children,
  ...rest
}: ThemeProps<string>, customThemes?: ReadonlyMap<string, ScopedEntry>) {
  const custom = customThemes?.get(name);
  const namedThemeClass = custom?.className
    ?? (Object.hasOwn(themes, name) ? (themes as Record<string, string>)[name] : undefined)
    ?? (typeof name === 'string' && name.startsWith('theme_') ? name : undefined);
  const dynamicStyle = !namedThemeClass ? getDynamicColorTheme(name) : undefined;
  const themeClass = namedThemeClass ?? (dynamicStyle ? themes[name.startsWith('dark-') ? 'dark' : 'light'] : undefined);
  const isDark = custom ? custom.mode === 'dark' : name === 'dark' || name === 'emerald-dark' || name === 'midnight'
    || name.startsWith('dark-') || name.startsWith('dark_')
    || name.startsWith('emerald-dark_') || name.startsWith('midnight_');
  const themeStyle = {
    ...dynamicStyle,
    ...(custom?.mode ? { [themeBaseVariable]: custom.mode === 'dark' ? 'black' : 'white' } : {}),
    ...(accentColor ? {
      [themeColorVariable]: accentColor,
      [themeContrastVariable]: accentContrast(accentColor, isDark),
    } : {}),
  };
  // Preserve object styles so Hono handles numeric units and client updates.
  const mergedStyle = Object.keys(themeStyle).length
    ? typeof inlineStyle === 'string'
      ? [inlineStyle, ...Object.entries(themeStyle).map(([property, value]) => `${property}:${value}`)].filter(Boolean).join(';')
      : { ...(inlineStyle ?? {}), ...themeStyle }
    : inlineStyle;
  const Component = Tag as any;

  return (
    <Component
      {...rest}
      data-theme={name}
      style={mergedStyle}
      class={cls(themeClass, extraClass)}
    >
      {children}
    </Component>
  );
}
