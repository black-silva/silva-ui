import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './anchor.css';
import type { BaseProps } from '../core/types';

export interface AnchorProps extends BaseProps {
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  [key: string]: any;
}

export function Anchor({
  href,
  target,
  rel,
  disabled = false,
  class: extraClass,
  children,
  ...rest
}: AnchorProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.base,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <a
      {...htmlProps}
      href={disabled ? undefined : href}
      target={target}
      rel={target === '_blank' && !rel ? 'noopener noreferrer' : rel}
      disabled={disabled || undefined}
      class={className}
    >
      {children}
    </a>
  );
}

