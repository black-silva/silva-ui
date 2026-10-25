import { style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

export const root = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: tokens.radii.full,
  overflow: 'hidden',
  userSelect: 'none',
  backgroundColor: tokens.colors.subtle,
  color: tokens.colors.secondary,
  fontWeight: tokens.fontWeight.medium,
  flexShrink: 0,
});

export const sizeVariant = styleVariants({
  xs: { width: '24px', height: '24px', fontSize: tokens.fontSize.xs },
  sm: { width: '32px', height: '32px', fontSize: tokens.fontSize.xs },
  md: { width: '40px', height: '40px', fontSize: tokens.fontSize.sm },
  lg: { width: '48px', height: '48px', fontSize: tokens.fontSize.base },
  xl: { width: '64px', height: '64px', fontSize: tokens.fontSize.xl },
});

export const image = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
});

export const fallback = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 'inherit',
});

