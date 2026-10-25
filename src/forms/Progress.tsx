import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './progress.css';
import type { BaseProps, ComponentSize } from '../core/types';

export interface ProgressProps extends BaseProps {
  value?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg' | ComponentSize;
  'aria-label'?: string;
  [key: string]: any;
}

export function Progress({
  value = 0,
  max = 100,
  size = 'md',
  'aria-label': ariaLabel,
  class: extraClass,
  ...rest
}: ProgressProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);

  const resolvedSize = (size === 'xs' ? 'sm' : size === 'xl' ? 'lg' : size) as 'sm' | 'md' | 'lg';
  const sizeClass = styles.sizeVariant[resolvedSize] || styles.sizeVariant.md;

  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div
      {...htmlProps}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel}
      class={cls(styles.track, sizeClass, toSprinklesClass(sprinklesProps), extraClass)}
    >
      <div
        class={styles.indicator}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

