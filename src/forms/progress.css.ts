import { style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

export const track = style({
  width: '100%',
  backgroundColor: tokens.colors.subtle,
  borderRadius: tokens.radii.full,
  overflow: 'hidden',
  position: 'relative',
});

export const indicator = style({
  height: '100%',
  backgroundColor: tokens.colors.primary,
  borderRadius: tokens.radii.full,
  transition: 'width 300ms ease',
});

export const sizeVariant = styleVariants({
  sm: { height: '4px' },
  md: { height: '8px' },
  lg: { height: '12px' },
});

