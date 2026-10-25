import { style, styleVariants, keyframes } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

const load = keyframes({
  '0%': { transform: 'translateX(-110%)' },
  '100%': { transform: 'translateX(290%)' },
});

export const base = style({
  position: 'relative',
  display: 'block',
  width: '100%',
  overflow: 'hidden',
  borderRadius: tokens.radii.full,
  backgroundColor: tokens.colors.subtle,
  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: '35%',
      borderRadius: 'inherit',
      backgroundColor: tokens.colors.primary,
      animation: `${load} 1.4s ease-in-out infinite`,
    },
  },
});

export const sizeVariant = styleVariants({
  xs: { height: '2px' },
  sm: { height: '3px' },
  md: { height: '4px' },
  lg: { height: '6px' },
  xl: { height: '8px' },
});
