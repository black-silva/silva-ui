import { style } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

export const base = style({
  color: tokens.colors.primary,
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'color 150ms ease',
  outline: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
  ':focus-visible': {
    outline: `2px solid ${tokens.colors.ring}`,
    outlineOffset: '2px',
    borderRadius: tokens.radii.xs,
  },
  selectors: {
    '&[disabled]': {
      opacity: 0.5,
      cursor: 'not-allowed',
      pointerEvents: 'none',
      textDecoration: 'none',
    },
  },
});

