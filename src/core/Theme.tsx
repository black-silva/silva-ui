import { cls } from './utils';
import { accentContrast, mixColor, themeBaseVariable, themeColorVariable, themeContrastVariable, type ColorShade, type CSSNamedColor } from './colors';
import { themeColors, themes, type ThemeName } from './theme.css';
import { darkColors, lightColors, themeTemplates } from './themes';
import type { BaseProps } from './types';

export interface ThemeProps extends BaseProps {
  /** The theme name to apply: 'light', 'dark', 'midnight', or any custom theme class name */
  name?: ThemeName | string;
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
export function Theme({
  name = 'light',
  as: Tag = 'div',
  accentColor,
  class: extraClass,
  style: inlineStyle,
  children,
  ...rest
}: ThemeProps) {
  const namedThemeClass = (themes as Record<string, string>)[name] || (typeof name === 'string' && name.startsWith('theme_') ? name : undefined);
  const dynamicStyle = !namedThemeClass && typeof name === 'string' ? getDynamicColorTheme(name) : undefined;
  const themeClass = namedThemeClass ?? (dynamicStyle ? themes[name.startsWith('dark-') ? 'dark' : 'light'] : undefined);
  const isDark = name === 'dark' || name === 'emerald-dark' || name === 'midnight'
    || name.startsWith('dark-') || name.startsWith('dark_')
    || name.startsWith('emerald-dark_') || name.startsWith('midnight_');
  const themeStyle = {
    ...dynamicStyle,
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
