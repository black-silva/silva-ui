import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './contextmenu.css';
import type { BaseProps } from '../core/types';

export interface ContextMenuProps extends BaseProps {
  [key: string]: any;
}

export function ContextMenu({
  class: extraClass,
  children,
  ...rest
}: ContextMenuProps) {
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

export function ContextMenuTrigger({
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

export interface ContextMenuContentProps extends BaseProps {
  'data-state'?: 'open' | 'closed';
  [key: string]: any;
}

export function ContextMenuContent({
  'data-state': dataState = 'open',
  class: extraClass,
  children,
  ...rest
}: ContextMenuContentProps) {
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

export interface ContextMenuItemProps extends BaseProps {
  disabled?: boolean;
  onClick?: (e: Event) => void;
  [key: string]: any;
}

export function ContextMenuItem({
  disabled = false,
  class: extraClass,
  children,
  ...rest
}: ContextMenuItemProps) {
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

export function ContextMenuSeparator({
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

export function ContextMenuLabel({
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

export function ContextMenuGroup({
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

