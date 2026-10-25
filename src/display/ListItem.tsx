import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './listitem.css';
import type { BaseProps, ComponentSize } from '../core/types';

export interface ListItemProps extends BaseProps {
  title?: any;
  subTitle?: any;
  icon?: any;
  pressable?: boolean;
  size?: 'sm' | 'md' | 'lg' | ComponentSize;
  onClick?: (e: Event) => void;
  [key: string]: any;
}

export function ListItem({
  title,
  subTitle,
  icon,
  pressable = false,
  size = 'md',
  class: extraClass,
  children,
  ...rest
}: ListItemProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);

  const resolvedSize = (size === 'xs' ? 'sm' : size === 'xl' ? 'lg' : size) as 'sm' | 'md' | 'lg';
  const sizeClass = styles.sizeVariant[resolvedSize] || styles.sizeVariant.md;

  const className = cls(
    styles.root,
    sizeClass,
    pressable && styles.pressable,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <div {...htmlProps} class={className}>
      {icon ? <span class={styles.icon}>{icon}</span> : null}
      {title || subTitle ? (
        <div class={styles.textContainer}>
          {title ? <span class={styles.title}>{title}</span> : null}
          {subTitle ? <span class={styles.subTitle}>{subTitle}</span> : null}
        </div>
      ) : null}
      {children}
    </div>
  );
}

