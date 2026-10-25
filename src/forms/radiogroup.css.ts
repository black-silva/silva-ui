import { style, styleVariants, globalStyle } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space.small,
});

export const item = style({
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
  borderRadius: tokens.radii.full,
  border: `${tokens.borderWidth[2]} solid ${tokens.colors.border}`,
  backgroundColor: tokens.colors.background,
  transition: 'border-color 150ms ease, background-color 150ms ease',
  position: 'relative',
  flexShrink: 0,
});

export const sizeVariant = styleVariants({
  sm: { width: '16px', height: '16px' },
  md: { width: '20px', height: '20px' },
  lg: { width: '24px', height: '24px' },
});

export const dot = style({
  borderRadius: tokens.radii.full,
  backgroundColor: tokens.colors.primary,
  display: 'none',
});

export const dotSizeVariant = styleVariants({
  sm: { width: '6px', height: '6px' },
  md: { width: '8px', height: '8px' },
  lg: { width: '10px', height: '10px' },
});

/* Checked state */
globalStyle(`${input}:checked + ${indicator}`, {
  borderColor: tokens.colors.primary,
});

globalStyle(`${input}:checked + ${indicator} ${dot}`, {
  display: 'block',
});

/* Focus ring */
globalStyle(`${input}:focus-visible + ${indicator}`, {
  outline: `2px solid ${tokens.colors.ring}`,
  outlineOffset: '2px',
});

