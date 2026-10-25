import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './dialog.css';
import type { BaseProps } from '../core/types';

export interface DialogProps extends BaseProps {
  open?: boolean;
  [key: string]: any;
}

export function Dialog({
  open = false,
  class: extraClass,
  children,
  ...rest
}: DialogProps) {
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

export interface DialogOverlayProps extends BaseProps {
  'data-state'?: 'open' | 'closed';
  [key: string]: any;
}

export function DialogOverlay({
  'data-state': dataState = 'open',
  class: extraClass,
  ...rest
}: DialogOverlayProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.overlay,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return <div {...htmlProps} data-state={dataState} class={className} />;
}

export interface DialogContentProps extends BaseProps {
  'data-state'?: 'open' | 'closed';
  [key: string]: any;
}

export function DialogContent({
  'data-state': dataState = 'open',
  class: extraClass,
  children,
  ...rest
}: DialogContentProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.content,
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

export function DialogHeader({
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

export function DialogFooter({
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

export function DialogTitle({
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

export function DialogDescription({
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

export function DialogClose({
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

