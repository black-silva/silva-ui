import { gradientToCss, type Gradient } from '../core/gradient';
import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import type { BaseProps } from '../core/types';

export interface BoxProps extends BaseProps {
  /** Rendered HTML element. Defaults to 'div'. */
  as?: string;
  /** Theme-aware background gradient. Takes precedence over `bg`. */
  gradient?: Gradient;
}

/**
 * Box — the foundational layout primitive.
 *
 * Accepts any sprinkles token as a prop, plus an optional `class`
 * for one-off overrides. Every other primitive composes through Box.
 *
 * @example
 * ```tsx
 * <Box p="medium" bg="subtle" borderRadius="medium">
 *   Hello
 * </Box>
 * ```
 */
export function Box({
  as: Tag = 'div',
  class: extraClass,
  gradient,
  style: inlineStyle,
  children,
  ...rest
}: BoxProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(toSprinklesClass(sprinklesProps), extraClass);
  const gradientStyle = gradient ? { backgroundImage: gradientToCss(gradient) } : undefined;
  const style = typeof inlineStyle === 'string'
    ? [inlineStyle, gradientStyle && `background-image:${gradientStyle.backgroundImage}`].filter(Boolean).join(';')
    : { ...gradientStyle, ...(inlineStyle as Record<string, unknown> | undefined) };

  return (
    // @ts-expect-error — dynamic tag
    <Tag {...htmlProps} style={style} class={className || undefined}>
      {children}
    </Tag>
  );
}

