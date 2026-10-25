import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './sheet.css';
import type { BaseProps } from '../core/types';

export interface SheetProps extends BaseProps {
  open?: boolean;
  [key: string]: any;
}

export function Sheet({
  open = false,
  class: extraClass,
  children,
  ...rest
}: SheetProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const state = open ? 'open' : 'closed';
  const className = cls(
    styles.root,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <div {...htmlProps} data-state={state} class={className}>
      {children}
    </div>
  );
}

export interface SheetOverlayProps extends BaseProps {
  'data-state'?: 'open' | 'closed';
  [key: string]: any;
}

export function SheetOverlay({
  'data-state': dataState = 'open',
  class: extraClass,
  ...rest
}: SheetOverlayProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.overlay,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return <div {...htmlProps} data-state={dataState} class={className} />;
}

export interface SheetContentProps extends BaseProps {
  side?: 'top' | 'bottom' | 'left' | 'right';
  'data-state'?: 'open' | 'closed';
  [key: string]: any;
}

export function SheetContent({
  side = 'bottom',
  'data-state': dataState = 'open',
  class: extraClass,
  children,
  ...rest
}: SheetContentProps) {
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
      role="dialog"
      aria-modal="true"
      data-state={dataState}
      class={className}
    >
      {children}
    </div>
  );
}

export function SheetHeader({
  class: extraClass,
  children,
  ...rest
}: BaseProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.header,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <div {...htmlProps} class={className}>
      {children}
    </div>
  );
}

export function SheetFooter({
  class: extraClass,
  children,
  ...rest
}: BaseProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.footer,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <div {...htmlProps} class={className}>
      {children}
    </div>
  );
}

export function SheetTitle({
  class: extraClass,
  children,
  ...rest
}: BaseProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.title,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <h2 {...htmlProps} class={className}>
      {children}
    </h2>
  );
}

export function SheetDescription({
  class: extraClass,
  children,
  ...rest
}: BaseProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.description,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <p {...htmlProps} class={className}>
      {children}
    </p>
  );
}

export function SheetClose({
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

