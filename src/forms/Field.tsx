import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './field.css';
import type { BaseProps } from '../core/types';

export interface FieldProps extends BaseProps {
  error?: string;
  helperText?: string;
  [key: string]: any;
}

export function Field({
  error,
  helperText,
  class: extraClass,
  children,
  ...rest
}: FieldProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.base,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <div {...htmlProps} class={className}>
      {children}
      {error ? <span class={styles.errorText}>{error}</span> : null}
      {!error && helperText ? <span class={styles.helperText}>{helperText}</span> : null}
    </div>
  );
}

export function FieldError({ class: extraClass, children, ...rest }: BaseProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  return (
    <span {...htmlProps} class={cls(styles.errorText, toSprinklesClass(sprinklesProps), extraClass)}>
      {children}
    </span>
  );
}

export function FieldHelper({ class: extraClass, children, ...rest }: BaseProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  return (
    <span {...htmlProps} class={cls(styles.helperText, toSprinklesClass(sprinklesProps), extraClass)}>
      {children}
    </span>
  );
}

