import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './tooltip.css';
import type { BaseProps } from '../core/types';

export interface TooltipProps extends BaseProps {
  [key: string]: any;
}

export function Tooltip({
  class: extraClass,
  children,
  ...rest
}: TooltipProps) {
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

export function TooltipTrigger({
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

export interface TooltipContentProps extends BaseProps {
  side?: 'top' | 'bottom' | 'left' | 'right';
  'data-state'?: 'open' | 'closed';
  [key: string]: any;
}

export function TooltipContent({
  side = 'top',
  'data-state': dataState = 'open',
  class: extraClass,
  children,
  ...rest
}: TooltipContentProps) {
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

