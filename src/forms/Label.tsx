import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './label.css';
import type { BaseProps, ComponentSize } from '../core/types';

export interface LabelProps extends BaseProps {
  htmlFor?: string;
  size?: 'sm' | 'md' | 'lg' | ComponentSize;
  required?: boolean;
  [key: string]: any;
}

export function Label({
  size = 'md',
  required = false,
  htmlFor,
  class: extraClass,
  children,
  ...rest
}: LabelProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);

  const resolvedSize = (size === 'xs' ? 'sm' : size === 'xl' ? 'lg' : size) as 'sm' | 'md' | 'lg';
  const sizeClass = styles.sizeVariant[resolvedSize] || styles.sizeVariant.md;

  const className = cls(
    styles.base,
    sizeClass,
    required && styles.required,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <label
      {...htmlProps}
      for={htmlFor}
      class={className}
    >
      {children}
    </label>
  );
}

