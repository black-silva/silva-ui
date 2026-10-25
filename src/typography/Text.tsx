import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './text.css';
import type { BaseProps } from '../core/types';

export interface TextProps extends BaseProps {
  /** The HTML element to render. Defaults to 'span'. */
  as?: 'span' | 'p' | 'label' | 'em' | 'strong' | 'small' | 'mark' | 'del' | 'ins' | 'sub' | 'sup' | 's' | 'u' | 'abbr' | 'cite' | 'code' | 'kbd' | 'samp' | 'var' | 'b' | 'i' | 'div';
  [key: string]: any;
}

export function Text({
  as: Tag = 'span',
  class: extraClass,
  children,
  ...rest
}: TextProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.base,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <Tag {...htmlProps} class={className}>
      {children}
    </Tag>
  );
}
