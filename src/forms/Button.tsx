import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './button.css';
import type { BaseProps, ComponentSize } from '../core/types';

export interface ButtonProps extends BaseProps {
  size?: ComponentSize;
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: Event) => void;
  [key: string]: any;
}

export function Button({
  size = 'md',
  variant = 'solid',
  disabled = false,
  type = 'button',
  class: extraClass,
  children,
  ...rest
}: ButtonProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.base,
    styles.sizeVariant[size],
    styles.variantStyle[variant],
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <button
      {...htmlProps}
      type={type}
      disabled={disabled || undefined}
      class={className}
    >
      {children}
    </button>
  );
}

