import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './input.css';
import type { BaseProps, ComponentSize } from '../core/types';

export interface InputProps extends BaseProps {
  size?: 'sm' | 'md' | 'lg' | ComponentSize;
  type?: string;
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  [key: string]: any;
}

export function Input({
  size = 'md',
  disabled = false,
  class: extraClass,
  ...rest
}: InputProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);

  // Normalize size for styles.sizeVariant (sm, md, lg)
  const resolvedSize = (size === 'xs' ? 'sm' : size === 'xl' ? 'lg' : size) as 'sm' | 'md' | 'lg';
  const sizeClass = styles.sizeVariant[resolvedSize] || styles.sizeVariant.md;

  const className = cls(
    styles.base,
    sizeClass,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <input
      {...htmlProps}
      disabled={disabled || undefined}
      class={className}
    />
  );
}

