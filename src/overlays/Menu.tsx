import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './menu.css';
import type { BaseProps } from '../core/types';

export interface MenuProps extends BaseProps {
  [key: string]: any;
}

export function Menu({
  class: extraClass,
  children,
  ...rest
}: MenuProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.root,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <div {...htmlProps} class={className}>
      {children}
    </div>
  );
}

export function MenuTrigger({
  class: extraClass,
  children,
  ...rest
}: BaseProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.trigger,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <div {...htmlProps} class={className}>
      {children}
    </div>
  );
}

export interface MenuContentProps extends BaseProps {
  'data-state'?: 'open' | 'closed';
  [key: string]: any;
}

export function MenuContent({
  'data-state': dataState = 'open',
  class: extraClass,
  children,
  ...rest
}: MenuContentProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.content,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <div
      {...htmlProps}
      role="menu"
      data-state={dataState}
      class={className}
    >
      {children}
    </div>
  );
}

export interface MenuItemProps extends BaseProps {
  disabled?: boolean;
  onClick?: (e: Event) => void;
  [key: string]: any;
}

export function MenuItem({
  disabled = false,
  class: extraClass,
  children,
  ...rest
}: MenuItemProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.item,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <button
      {...htmlProps}
      type="button"
      role="menuitem"
      disabled={disabled || undefined}
      data-disabled={disabled ? '' : undefined}
      class={className}
    >
      {children}
    </button>
  );
}

export function MenuSeparator({
  class: extraClass,
  ...rest
}: BaseProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.separator,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return <hr {...htmlProps} class={className} />;
}

export function MenuLabel({
  class: extraClass,
  children,
  ...rest
}: BaseProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.label,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <div {...htmlProps} class={className}>
      {children}
    </div>
  );
}

export function MenuGroup({
  class: extraClass,
  children,
  ...rest
}: BaseProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.group,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <div {...htmlProps} role="group" class={className}>
      {children}
    </div>
  );
}

