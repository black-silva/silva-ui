import { cls } from './utils';
import { colorScales, darkColorScales, darkColorTokens, colorTokens } from './colors';
import { themeColors, themes, type ThemeName } from './theme.css';
import { darkColors, lightColors, themeTemplates } from './themes';
import type { BaseProps } from './types';

export interface ThemeProps extends BaseProps {
  /** The theme name to apply: 'light', 'dark', 'midnight', or any custom theme class name */
  name?: ThemeName | string;
  /** HTML element to render. Defaults to 'div'. */
  as?: string;
  [key: string]: any;
}

type ThemeStyle = Record<string, string>;

function getDynamicColorTheme(name: string): ThemeStyle | undefined {
  const match = name.match(/^(?:(light|dark)-)?([a-zA-Z]+)$/);
  if (!match) return undefined;

  const mode = match[1] ?? 'light';
  const colorName = match[2];
  const isDark = mode === 'dark';
  const scale = (isDark ? darkColorScales : colorScales)[colorName]
    ?? Object.entries(isDark ? darkColorTokens : colorTokens)
      .filter(([token]) => token.startsWith(colorName) && /^\d+$/.test(token.slice(colorName.length)))
      .sort(([left], [right]) => Number(left.slice(colorName.length)) - Number(right.slice(colorName.length)))
      .map(([, value]) => value);
  if (!scale) return undefined;

  const colorMap = isDark ? darkColorTokens : colorTokens;
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
    primary: palette[9] ?? baseColors.primary,
    primaryHover: palette[10] ?? baseColors.primaryHover,
    primaryActive: palette[8] ?? baseColors.primaryActive,
    primaryContrast: isDark ? '#000000' : '#ffffff',
    ring: palette[8] ?? baseColors.ring,
  };
  const values = {
    ...colorMap,
    ...semanticValues,
  };

  return Object.fromEntries(
    Object.entries(values).map(([token, value]) => [
      themeColors[token as keyof typeof themeColors].match(/^var\((--[^)]+)\)/)?.[1] ?? token,
      value,
    ]),
  );
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
  class: extraClass,
  style: inlineStyle,
  children,
  ...rest
}: ThemeProps) {
  const themeClass = (themes as Record<string, string>)[name] || (typeof name === 'string' && name.startsWith('theme_') ? name : undefined);
  const dynamicStyle = typeof name === 'string' ? getDynamicColorTheme(name) : undefined;
  const styleText = dynamicStyle
    ? [
      typeof inlineStyle === 'string'
        ? inlineStyle
        : Object.entries(inlineStyle ?? {}).map(([property, value]) => `${property}:${value}`).join(';'),
      ...Object.entries(dynamicStyle).map(([property, value]) => `${property}:${value}`),
    ].filter(Boolean).join(';')
    : inlineStyle;
  const Component = Tag as any;

  return (
    <Component
      {...rest}
      data-theme={name}
      style={styleText}
      class={cls(themeClass, extraClass)}
    >
      {children}
    </Component>
  );
}
