import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './switch.css';
import type { BaseProps, ComponentSize } from '../core/types';

export interface SwitchProps extends BaseProps {
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

export function Switch({
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
}: SwitchProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);

  const resolvedSize = (size === 'xs' ? 'sm' : size === 'xl' ? 'lg' : size) as 'sm' | 'md' | 'lg';
  const sizeClass = styles.sizeVariant[resolvedSize] || styles.sizeVariant.md;
  const thumbSizeClass = styles.thumbSizeVariant[resolvedSize] || styles.thumbSizeVariant.md;

  return (
    <label
      class={cls(styles.root, toSprinklesClass(sprinklesProps), extraClass)}
      data-disabled={disabled ? 'true' : undefined}
    >
      <input
        {...htmlProps}
        type="checkbox"
        role="switch"
        id={id}
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled || undefined}
        class={styles.input}
      />
      <span class={cls(styles.track, sizeClass)}>
        <span class={cls(styles.thumb, thumbSizeClass)} />
      </span>
      {children ? <span>{children}</span> : null}
    </label>
  );
}

