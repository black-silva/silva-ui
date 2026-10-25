import { sprinkles } from '../core/sprinkles.css';
import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import type { BaseProps } from '../core/types';

export interface BoxProps extends BaseProps {
  /** Rendered HTML element. Defaults to 'div'. */
  as?: string;
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
export function Box({ as: Tag = 'div', class: extraClass, children, ...rest }: BoxProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(toSprinklesClass(sprinklesProps), extraClass);

  return (
    // @ts-expect-error — dynamic tag
    <Tag {...htmlProps} class={className || undefined}>
      {children}
    </Tag>
  );
}

