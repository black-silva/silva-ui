import { style, styleVariants, keyframes } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const base = style({
  display: 'inline-block',
  borderRadius: tokens.radii.full,
  borderStyle: 'solid',
  borderColor: tokens.colors.subtle,
  borderTopColor: tokens.colors.primary,
  animation: `${spin} 0.75s linear infinite`,
  boxSizing: 'border-box',
});

export const sizeVariant = styleVariants({
  xs: { width: '12px', height: '12px', borderWidth: '2px' },
  sm: { width: '16px', height: '16px', borderWidth: '2px' },
  md: { width: '24px', height: '24px', borderWidth: '3px' },
  lg: { width: '32px', height: '32px', borderWidth: '3px' },
  xl: { width: '48px', height: '48px', borderWidth: '4px' },
});

