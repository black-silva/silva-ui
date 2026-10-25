import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './loader.css';
import type { BaseProps, ComponentSize } from '../core/types';

export interface LoaderProps extends BaseProps {
  size?: ComponentSize;
  label?: string;
}

export function Loader({
  size = 'md',
  label = 'Loading...',
  class: extraClass,
  ...rest
}: LoaderProps) {
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
