import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './textarea.css';
import type { BaseProps, ComponentSize } from '../core/types';

export interface TextAreaProps extends BaseProps {
  size?: 'sm' | 'md' | 'lg' | ComponentSize;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  rows?: number;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  [key: string]: any;
}

export function TextArea({
  size = 'md',
  disabled = false,
  rows = 3,
  class: extraClass,
  children,
  ...rest
}: TextAreaProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);

  const resolvedSize = (size === 'xs' ? 'sm' : size === 'xl' ? 'lg' : size) as 'sm' | 'md' | 'lg';
  const sizeClass = styles.sizeVariant[resolvedSize] || styles.sizeVariant.md;

  const className = cls(
    styles.base,
    sizeClass,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <textarea
      {...htmlProps}
      rows={rows}
      disabled={disabled || undefined}
      class={className}
    >
      {children}
    </textarea>
  );
}

