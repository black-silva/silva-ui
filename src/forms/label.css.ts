import { style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

export const base = style({
  display: 'block',
  fontWeight: tokens.fontWeight.medium,
  color: tokens.colors.secondary,
  lineHeight: tokens.lineHeight.normal,
});

export const sizeVariant = styleVariants({
  sm: { fontSize: tokens.fontSize.xs },
  md: { fontSize: tokens.fontSize.sm },
  lg: { fontSize: tokens.fontSize.base },
});

export const required = style({
  selectors: {
    '&::after': {
      content: '" *"',
      color: tokens.colors.error,
    },
  },
});
