import type { BaseProps, ComponentSize } from '../core/types';
import type { Sprinkles } from '../core/sprinkles.css';
import { Text } from './Text';
import type { TextProps } from './Text';

/**
 * Mapping from size to sprinkles fontSize + lineHeight values.
 * These are applied as sprinkles props so they can be overridden
 * by explicit fontSize/lineHeight props from the consumer.
 */
const sizeMap: Record<ComponentSize, { fontSize: Sprinkles['fontSize']; lineHeight: Sprinkles['lineHeight'] }> = {
  xs: { fontSize: 'xs', lineHeight: 'tight' },
  sm: { fontSize: 'sm', lineHeight: 'tight' },
  md: { fontSize: 'base', lineHeight: 'normal' },
  lg: { fontSize: 'lg', lineHeight: 'normal' },
  xl: { fontSize: 'xl', lineHeight: 'relaxed' },
};

export interface SizableTextProps extends TextProps {
  /** Controls fontSize and lineHeight together. Defaults to 'md'. */
  size?: ComponentSize;
}

export function SizableText({
  size = 'md',
  ...rest
}: SizableTextProps) {
  const defaults = sizeMap[size];

  // Explicit fontSize/lineHeight from props override the size defaults
  const merged = {
    fontSize: defaults.fontSize,
    lineHeight: defaults.lineHeight,
    ...rest,
  };

  return <Text {...merged} />;
}
