import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './radiogroup.css';
import type { BaseProps, ComponentSize } from '../core/types';

export interface RadioGroupProps extends BaseProps {
  name?: string;
  value?: string;
  defaultValue?: string;
  [key: string]: any;
}

export function RadioGroup({
  name,
  value,
  defaultValue,
  class: extraClass,
  children,
  ...rest
}: RadioGroupProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.root,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <div
      {...htmlProps}
      role="radiogroup"
      data-name={name}
      data-value={value}
      class={className}
    >
      {children}
    </div>
  );
}

export interface RadioGroupItemProps extends BaseProps {
  value: string;
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  id?: string;
  size?: 'sm' | 'md' | 'lg' | ComponentSize;
  onChange?: (e: Event) => void;
  [key: string]: any;
}

export function RadioGroupItem({
  value,
  name,
  checked,
  defaultChecked,
  disabled = false,
  id,
  size = 'md',
  class: extraClass,
  children,
  ...rest
}: RadioGroupItemProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);

  const resolvedSize = (size === 'xs' ? 'sm' : size === 'xl' ? 'lg' : size) as 'sm' | 'md' | 'lg';
  const sizeClass = styles.sizeVariant[resolvedSize] || styles.sizeVariant.md;
  const dotSizeClass = styles.dotSizeVariant[resolvedSize] || styles.dotSizeVariant.md;

  return (
    <label
      class={cls(styles.item, toSprinklesClass(sprinklesProps), extraClass)}
      data-disabled={disabled ? 'true' : undefined}
    >
      <input
        {...htmlProps}
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled || undefined}
        class={styles.input}
      />
      <span class={cls(styles.indicator, sizeClass)}>
        <span class={cls(styles.dot, dotSizeClass)} />
      </span>
      {children ? <span>{children}</span> : null}
    </label>
  );
}

