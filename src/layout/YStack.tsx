import { sprinkles } from '../core/sprinkles.css';
import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import { yStack } from './stacks.css';
import type { BaseProps } from '../core/types';

export interface YStackProps extends BaseProps {}

/**
 * YStack — vertical flex stack (column direction).
 *
 * Uses a static vanilla-extract class for the flex base and
 * merges sprinkles tokens on top for spacing / color / radius.
 *
 * @example
 * ```tsx
 * <YStack gap="medium" p="large">
 *   <Box>First</Box>
 *   <Box>Second</Box>
 * </YStack>
 * ```
 */
export function YStack({ class: extraClass, children, ...rest }: YStackProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(yStack, toSprinklesClass(sprinklesProps), extraClass);

  return (
    <div {...htmlProps} class={className}>
      {children}
    </div>
  );
}

