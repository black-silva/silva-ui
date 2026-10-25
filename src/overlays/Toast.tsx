import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './toast.css';
import type { BaseProps } from '../core/types';

export interface ToastProviderProps extends Omit<BaseProps, 'position'> {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  [key: string]: any;
}

export function ToastProvider({
  position = 'top-right',
  class: extraClass,
  children,
  ...rest
}: ToastProviderProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.providerBase,
    styles.positionVariant[position],
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <div {...htmlProps} class={className}>
      {children}
    </div>
  );
}

export interface ToastProps extends BaseProps {
  variant?: 'default' | 'success' | 'error' | 'warning';
  [key: string]: any;
}

export function Toast({
  variant = 'default',
  class: extraClass,
  children,
  ...rest
}: ToastProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.toastBase,
    styles.toastVariant[variant],
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <div {...htmlProps} role="status" aria-live="polite" class={className}>
      {children}
    </div>
  );
}

export function ToastTitle({
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
    <div {...htmlProps} class={className}>
      {children}
    </div>
  );
}

export function ToastDescription({
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
    <div {...htmlProps} class={className}>
      {children}
    </div>
  );
}

export function ToastClose({
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

