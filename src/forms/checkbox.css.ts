import { style, styleVariants, globalStyle } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

export const root = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: tokens.space.small,
  cursor: 'pointer',
  userSelect: 'none',
  selectors: {
    '&[data-disabled="true"]': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
});

export const input = style({
  position: 'absolute',
  opacity: 0,
  width: 0,
  height: 0,
  margin: 0,
  padding: 0,
  pointerEvents: 'none',
});

export const indicator = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: tokens.radii.small,
  border: `${tokens.borderWidth[1]} solid ${tokens.colors.border}`,
  backgroundColor: tokens.colors.background,
  transition: 'background-color 150ms ease, border-color 150ms ease',
  position: 'relative',
  flexShrink: 0,
});

export const sizeVariant = styleVariants({
  sm: { width: '16px', height: '16px' },
  md: { width: '20px', height: '20px' },
  lg: { width: '24px', height: '24px' },
});

export const checkmark = style({
  width: '100%',
  height: '100%',
  display: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  color: tokens.colors.white,
  fontSize: tokens.fontSize.xs,
  lineHeight: 1,
});

/* Checked state */
globalStyle(`${input}:checked + ${indicator}`, {
  backgroundColor: tokens.colors.primary,
  borderColor: tokens.colors.primary,
});

globalStyle(`${input}:checked + ${indicator} ${checkmark}`, {
  display: 'flex',
});

/* Focus ring */
globalStyle(`${input}:focus-visible + ${indicator}`, {
  outline: `2px solid ${tokens.colors.ring}`,
  outlineOffset: '2px',
});

