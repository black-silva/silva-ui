import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './form.css';
import type { BaseProps } from '../core/types';

export interface FormProps extends BaseProps {
  action?: string;
  method?: string;
  onSubmit?: (e: Event) => void;
  [key: string]: any;
}

export function Form({
  class: extraClass,
  children,
  ...rest
}: FormProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.base,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <form {...htmlProps} class={className}>
      {children}
    </form>
  );
}

