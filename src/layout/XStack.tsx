import { sprinkles } from '../core/sprinkles.css';
import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import { xStack } from './stacks.css';
import type { BaseProps } from '../core/types';

export interface XStackProps extends BaseProps {}

/**
 * XStack — horizontal flex stack (row direction).
 *
 * Uses a static vanilla-extract class for the flex base and
 * merges sprinkles tokens on top for spacing / color / radius.
 *
 * @example
 * ```tsx
 * <XStack gap="small" alignItems="center">
 *   <span>Left</span>
 *   <span>Right</span>
 * </XStack>
 * ```
 */
export function XStack({ class: extraClass, children, ...rest }: XStackProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(xStack, toSprinklesClass(sprinklesProps), extraClass);

  return (
    <div {...htmlProps} class={className}>
      {children}
    </div>
  );
}

