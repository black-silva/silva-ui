import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './text.css';
import type { ComponentSize } from '../core/types';
import { SizableText } from './SizableText';
import type { SizableTextProps } from './SizableText';

export interface ParagraphProps extends SizableTextProps {}

export function Paragraph({
  size = 'md',
  class: extraClass,
  children,
  ...rest
}: ParagraphProps) {
  // Apply paragraph-specific defaults; consumer can override via sprinkles
  const merged = {
    marginBottom: rest.marginBottom ?? ('medium' as const),
    lineHeight: rest.lineHeight ?? ('normal' as const),
    ...rest,
  };

  return (
    <SizableText
      as="p"
      size={size}
      class={cls(styles.paragraphBase, extraClass)}
      {...merged}
    >
      {children}
    </SizableText>
  );
}
