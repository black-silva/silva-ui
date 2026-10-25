import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './xgroup.css';
import type { BaseProps } from '../core/types';

export interface XGroupProps extends BaseProps {
  [key: string]: any;
}

export function XGroup({
  class: extraClass,
  children,
  ...rest
}: XGroupProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.root,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <div {...htmlProps} role="group" class={className}>
      {children}
    </div>
  );
}

