import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './avatar.css';
import type { BaseProps, ComponentSize } from '../core/types';

export interface AvatarProps extends BaseProps {
  size?: ComponentSize;
  [key: string]: any;
}

export function Avatar({
  size = 'md',
  class: extraClass,
  children,
  ...rest
}: AvatarProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.root,
    styles.sizeVariant[size],
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <div {...htmlProps} class={className}>
      {children}
    </div>
  );
}

export interface AvatarImageProps extends BaseProps {
  src: string;
  alt?: string;
  [key: string]: any;
}

export function AvatarImage({
  src,
  alt = '',
  class: extraClass,
  ...rest
}: AvatarImageProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.image,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <img
      {...htmlProps}
      src={src}
      alt={alt}
      class={className}
    />
  );
}

export interface AvatarFallbackProps extends BaseProps {
  [key: string]: any;
}

export function AvatarFallback({
  class: extraClass,
  children,
  ...rest
}: AvatarFallbackProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    styles.fallback,
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <div {...htmlProps} class={className}>
      {children}
    </div>
  );
}

