import { style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

export const base = style({
  width: '100%',
  border: `1px solid ${tokens.colors.border}`,
  borderRadius: tokens.radii.medium,
  backgroundColor: tokens.colors.background,
  color: tokens.colors.secondary,
  fontFamily: 'inherit',
  lineHeight: tokens.lineHeight.normal,
  minHeight: '80px',
  resize: 'vertical',
  transition: 'border-color 150ms ease, outline-color 150ms ease',
  outline: '2px solid transparent',
  outlineOffset: '-1px',
  ':focus-visible': {
    borderColor: tokens.colors.ring,
    outline: `2px solid ${tokens.colors.ring}`,
    outlineOffset: '-1px',
  },
  '::placeholder': {
    color: tokens.colors.muted,
  },
  selectors: {
    '&[disabled]': {
      opacity: 0.5,
      cursor: 'not-allowed',
      backgroundColor: tokens.colors.subtle,
    },
  },
});

export const sizeVariant = styleVariants({
  sm: { padding: '4px 8px', fontSize: tokens.fontSize.sm },
  md: { padding: '8px 12px', fontSize: tokens.fontSize.sm },
  lg: { padding: '10px 16px', fontSize: tokens.fontSize.base },
});
