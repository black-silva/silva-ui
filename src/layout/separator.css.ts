import { style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

export const base = style({
  border: 'none',
  margin: 0,
  flexShrink: 0,
  backgroundColor: tokens.colors.border,
});

export const orientationVariant = styleVariants({
  horizontal: {
    width: '100%',
    height: '1px',
  },
  vertical: {
    width: '1px',
    height: '100%',
    alignSelf: 'stretch',
  },
});

