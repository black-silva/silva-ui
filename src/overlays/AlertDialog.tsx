import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './alertdialog.css';
import type { BaseProps } from '../core/types';

export interface AlertDialogProps extends BaseProps {
  open?: boolean;
  [key: string]: any;
}

export function AlertDialog({
  open = false,
  class: extraClass,
  children,
  ...rest
}: AlertDialogProps) {
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

export interface AlertDialogOverlayProps extends BaseProps {
  'data-state'?: 'open' | 'closed';
  [key: string]: any;
}

export function AlertDialogOverlay({
  'data-state': dataState = 'open',
  class: extraClass,
  ...rest
}: AlertDialogOverlayProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.overlay,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return <div {...htmlProps} data-state={dataState} class={className} />;
}

export interface AlertDialogContentProps extends BaseProps {
  'data-state'?: 'open' | 'closed';
  [key: string]: any;
}

export function AlertDialogContent({
  'data-state': dataState = 'open',
  class: extraClass,
  children,
  ...rest
}: AlertDialogContentProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.content,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <div
      {...htmlProps}
      role="alertdialog"
      aria-modal="true"
      data-state={dataState}
      class={className}
    >
      {children}
    </div>
  );
}

export function AlertDialogHeader({
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

export function AlertDialogFooter({
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

export function AlertDialogTitle({
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

export function AlertDialogDescription({
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

export function AlertDialogAction({
  class: extraClass,
  children,
  ...rest
}: BaseProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.action,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <button {...htmlProps} type="button" class={className}>
      {children}
    </button>
  );
}

export function AlertDialogCancel({
  class: extraClass,
  children,
  ...rest
}: BaseProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.cancel,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <button {...htmlProps} type="button" class={className}>
      {children}
    </button>
  );
}

