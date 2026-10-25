import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import type { BaseProps } from '../core/types';

export interface ImageProps extends BaseProps {
  src: string;
  alt?: string;
  width?: any;
  height?: any;
  loading?: 'lazy' | 'eager';
  [key: string]: any;
}

export function Image({
  src,
  alt = '',
  loading = 'lazy',
  class: extraClass,
  ...rest
}: ImageProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(
    toSprinklesClass(sprinklesProps),
    extraClass,
  );

  return (
    <img
      {...htmlProps}
      src={src}
      alt={alt}
      loading={loading}
      class={className || undefined}
    />
  );
}

