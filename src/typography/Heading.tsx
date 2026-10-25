import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './heading.css';
import type { BaseProps } from '../core/types';
import type { Sprinkles } from '../core/sprinkles.css';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/**
 * Default fontSize + fontWeight per heading level.
 * Applied via sprinkles so consumers can override with explicit props.
 */
const levelDefaults: Record<HeadingLevel, { fontSize: Sprinkles['fontSize']; fontWeight: Sprinkles['fontWeight'] }> = {
  1: { fontSize: '6xl', fontWeight: 'bold' },
  2: { fontSize: '5xl', fontWeight: 'bold' },
  3: { fontSize: '4xl', fontWeight: 'semibold' },
  4: { fontSize: '3xl', fontWeight: 'semibold' },
  5: { fontSize: '2xl', fontWeight: 'medium' },
  6: { fontSize: 'xl', fontWeight: 'medium' },
};

const levelTag: Record<HeadingLevel, HeadingTag> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
};

export interface HeadingProps extends BaseProps {
  /** Heading level (1–6). Determines which h-tag to render. Defaults to 1. */
  level?: HeadingLevel;
  [key: string]: any;
}

export function Heading({
  level = 1,
  class: extraClass,
  children,
  ...rest
}: HeadingProps) {
  const Tag = levelTag[level];
  const defaults = levelDefaults[level];

  // Apply level defaults; explicit sprinkles props override them
  const merged = {
    fontSize: defaults.fontSize,
    fontWeight: defaults.fontWeight,
    ...rest,
  };

  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(merged);
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
