import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './accordion.css';
import type { BaseProps } from '../core/types';

export interface AccordionProps extends BaseProps {
  type?: 'single' | 'multiple';
  [key: string]: any;
}

export function Accordion({
  type = 'single',
  class: extraClass,
  children,
  ...rest
}: AccordionProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.root,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <div {...htmlProps} data-type={type} class={className}>
      {children}
    </div>
  );
}

export interface AccordionItemProps extends BaseProps {
  value?: string;
  [key: string]: any;
}

export function AccordionItem({
  value,
  class: extraClass,
  children,
  ...rest
}: AccordionItemProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.item,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <div {...htmlProps} data-value={value} class={className}>
      {children}
    </div>
  );
}

export interface AccordionTriggerProps extends BaseProps {
  'data-state'?: 'open' | 'closed';
  onClick?: (e: Event) => void;
  [key: string]: any;
}

export function AccordionTrigger({
  'data-state': dataState = 'closed',
  class: extraClass,
  children,
  ...rest
}: AccordionTriggerProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.trigger,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <button
      {...htmlProps}
      type="button"
      data-state={dataState}
      aria-expanded={dataState === 'open'}
      class={className}
    >
      <span>{children}</span>
      <span class={styles.chevron} aria-hidden="true">
        ▼
      </span>
    </button>
  );
}

export interface AccordionContentProps extends BaseProps {
  'data-state'?: 'open' | 'closed';
  [key: string]: any;
}

export function AccordionContent({
  'data-state': dataState = 'closed',
  class: extraClass,
  children,
  ...rest
}: AccordionContentProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.content,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <div
      {...htmlProps}
      role="region"
      data-state={dataState}
      class={className}
    >
      {children}
    </div>
  );
}

