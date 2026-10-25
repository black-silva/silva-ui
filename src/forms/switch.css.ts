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

export const track = style({
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: tokens.radii.full,
  backgroundColor: tokens.colors.subtle,
  border: `${tokens.borderWidth[1]} solid ${tokens.colors.border}`,
  transition: 'background-color 200ms ease, border-color 200ms ease',
  position: 'relative',
  boxSizing: 'content-box',
  flexShrink: 0,
});

export const thumb = style({
  display: 'block',
  borderRadius: tokens.radii.full,
  backgroundColor: tokens.colors.white,
  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
  transition: 'transform 200ms ease',
});

export const sizeVariant = styleVariants({
  sm: {
    width: '28px',
    height: '16px',
    padding: '2px',
  },
  md: {
    width: '36px',
    height: '20px',
    padding: '2px',
  },
  lg: {
    width: '44px',
    height: '24px',
    padding: '2px',
  },
});

export const thumbSizeVariant = styleVariants({
  sm: { width: '12px', height: '12px' },
  md: { width: '16px', height: '16px' },
  lg: { width: '20px', height: '20px' },
});

/* Checked state */
globalStyle(`${input}:checked + ${track}`, {
  backgroundColor: tokens.colors.primary,
  borderColor: tokens.colors.primary,
});

globalStyle(`${input}:checked + ${track}${sizeVariant.sm} ${thumb}`, {
  transform: 'translateX(12px)',
});

globalStyle(`${input}:checked + ${track}${sizeVariant.md} ${thumb}`, {
  transform: 'translateX(16px)',
});

globalStyle(`${input}:checked + ${track}${sizeVariant.lg} ${thumb}`, {
  transform: 'translateX(20px)',
});

/* Focus ring */
globalStyle(`${input}:focus-visible + ${track}`, {
  outline: `2px solid ${tokens.colors.ring}`,
  outlineOffset: '2px',
});

