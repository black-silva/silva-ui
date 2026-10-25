import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './card.css';
import type { BaseProps } from '../core/types';

export interface CardProps extends BaseProps {
  bordered?: boolean;
  elevated?: boolean;
  [key: string]: any;
}

export function Card({
  bordered = true,
  elevated = false,
  class: extraClass,
  children,
  ...rest
}: CardProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.root,
    bordered && styles.bordered,
    elevated && styles.elevated,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <div {...htmlProps} class={className}>
      {children}
    </div>
  );
}

export function CardHeader({
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

export function CardFooter({
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

