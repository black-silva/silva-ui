import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './togglegroup.css';
import type { BaseProps } from '../core/types';

export interface ToggleGroupProps extends BaseProps {
  type?: 'single' | 'multiple';
  [key: string]: any;
}

export function ToggleGroup({
  type = 'single',
  class: extraClass,
  children,
  ...rest
}: ToggleGroupProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.root,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <div
      {...htmlProps}
      role="group"
      data-type={type}
      class={className}
    >
      {children}
    </div>
  );
}

export interface ToggleGroupItemProps extends BaseProps {
  value: string;
  'data-active'?: boolean | string;
  disabled?: boolean;
  onClick?: (e: Event) => void;
  [key: string]: any;
}

export function ToggleGroupItem({
  value,
  'data-active': active,
  disabled = false,
  class: extraClass,
  children,
  ...rest
}: ToggleGroupItemProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const isActive = active === true || active === 'true';

  const className = cls(
    styles.item,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <button
      {...htmlProps}
      type="button"
      data-value={value}
      data-active={isActive ? 'true' : 'false'}
      aria-pressed={isActive}
      disabled={disabled || undefined}
      class={className}
    >
      {children}
    </button>
  );
}

