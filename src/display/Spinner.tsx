import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './spinner.css';
import type { BaseProps, ComponentSize } from '../core/types';

export interface SpinnerProps extends BaseProps {
  size?: ComponentSize;
  label?: string;
  [key: string]: any;
}

export function Spinner({
  size = 'md',
  label = 'Loading...',
  class: extraClass,
  ...rest
}: SpinnerProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.base,
    styles.sizeVariant[size],
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <div
      {...htmlProps}
      role="status"
      aria-label={label}
      class={className}
    >
      <span style={{ display: 'none' }}>{label}</span>
    </div>
  );
}

