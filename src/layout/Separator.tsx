import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './separator.css';
import type { BaseProps } from '../core/types';

export interface SeparatorProps extends BaseProps {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
  [key: string]: any;
}

export function Separator({
  orientation = 'horizontal',
  decorative = true,
  class: extraClass,
  ...rest
}: SeparatorProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.base,
    styles.orientationVariant[orientation],
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <div
      {...htmlProps}
      role={decorative ? 'none' : 'separator'}
      aria-orientation={orientation === 'vertical' ? 'vertical' : undefined}
      class={className}
    />
  );
}

