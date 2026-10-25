import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './checkbox.css';
import type { BaseProps, ComponentSize } from '../core/types';

export interface CheckboxProps extends BaseProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  name?: string;
  value?: string;
  id?: string;
  size?: 'sm' | 'md' | 'lg' | ComponentSize;
  onChange?: (e: Event) => void;
  [key: string]: any;
}

export function Checkbox({
  checked,
  defaultChecked,
  disabled = false,
  size = 'md',
  name,
  value,
  id,
  class: extraClass,
  children,
  ...rest
}: CheckboxProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);

  const resolvedSize = (size === 'xs' ? 'sm' : size === 'xl' ? 'lg' : size) as 'sm' | 'md' | 'lg';
  const sizeClass = styles.sizeVariant[resolvedSize] || styles.sizeVariant.md;

  return (
    <label
      class={cls(styles.root, toSprinklesClass(sprinklesProps), extraClass)}
      data-disabled={disabled ? 'true' : undefined}
    >
      <input
        {...htmlProps}
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled || undefined}
        class={styles.input}
      />
      <span class={cls(styles.indicator, sizeClass)}>
        <svg
          class={styles.checkmark}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      {children ? <span>{children}</span> : null}
    </label>
  );
}

