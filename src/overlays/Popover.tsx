import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './popover.css';
import type { BaseProps } from '../core/types';

export interface PopoverProps extends BaseProps {
  [key: string]: any;
}

export function Popover({
  class: extraClass,
  children,
  ...rest
}: PopoverProps) {
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

export function PopoverTrigger({
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

export interface PopoverContentProps extends BaseProps {
  side?: 'top' | 'bottom' | 'left' | 'right';
  'data-state'?: 'open' | 'closed';
  [key: string]: any;
}

export function PopoverContent({
  side = 'bottom',
  'data-state': dataState = 'open',
  class: extraClass,
  children,
  ...rest
}: PopoverContentProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.contentBase,
    styles.sideVariant[side],
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <div
      {...htmlProps}
      role="tooltip"
      data-state={dataState}
      class={className}
    >
      {children}
    </div>
  );
}

export function PopoverClose({
  class: extraClass,
  children,
  ...rest
}: BaseProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.close,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <button
      {...htmlProps}
      type="button"
      aria-label="Close"
      class={className}
    >
      {children || '✕'}
    </button>
  );
}

