import { style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

export const wrapper = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  width: '100%',
});

export const native = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  clipPath: 'inset(50%)',
});

export const select = style({
  width: '100%',
  appearance: 'none',
  border: `${tokens.borderWidth[1]} solid ${tokens.colors.border}`,
  borderRadius: tokens.radii.medium,
  backgroundColor: tokens.colors.background,
  color: tokens.colors.secondary,
  fontFamily: 'inherit',
  cursor: 'pointer',
  paddingRight: '36px',
  transition: 'border-color 150ms ease, outline-color 150ms ease',
  outline: '2px solid transparent',
  outlineOffset: '-1px',
  ':focus-visible': {
    borderColor: tokens.colors.ring,
    outline: `2px solid ${tokens.colors.ring}`,
    outlineOffset: '-1px',
  },
  selectors: {
    '&[disabled]': {
      opacity: 0.5,
      cursor: 'not-allowed',
      backgroundColor: tokens.colors.subtle,
    },
  },
});

export const trigger = style({
  width: '100%',
  display: 'flex',
  position: 'relative',
  zIndex: 2,
  alignItems: 'center',
  justifyContent: 'space-between',
  border: `${tokens.borderWidth[1]} solid ${tokens.colors.border}`,
  borderRadius: tokens.radii.medium,
  backgroundColor: tokens.colors.background,
  color: tokens.colors.secondary,
  fontFamily: 'inherit',
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'border-color 150ms ease, outline-color 150ms ease',
  outline: '2px solid transparent',
  outlineOffset: '-1px',
  ':focus-visible': {
    borderColor: tokens.colors.ring,
    outline: `2px solid ${tokens.colors.ring}`,
    outlineOffset: '-1px',
  },
  selectors: {
    '&[data-disabled="true"]': {
      opacity: 0.5,
      cursor: 'not-allowed',
      backgroundColor: tokens.colors.subtle,
    },
  },
});

export const panel = style({
  position: 'absolute',
  zIndex: 3,
  top: 'calc(100% + 4px)',
  left: 0,
  right: 0,
  maxHeight: '240px',
  overflowY: 'auto',
  padding: tokens.space.xs,
  border: `${tokens.borderWidth[1]} solid ${tokens.colors.border}`,
  borderRadius: tokens.radii.medium,
  backgroundColor: tokens.colors.card,
  boxShadow: `0 8px 24px ${tokens.colors.overlay}`,
});

export const outsideClickLayer = style({
  position: 'fixed',
  zIndex: 1,
  inset: 0,
});

export const option = style({
  width: '100%',
  display: 'block',
  padding: `${tokens.space.small} ${tokens.space.small}`,
  border: 0,
  borderRadius: tokens.radii.small,
  backgroundColor: 'transparent',
  color: tokens.colors.secondary,
  font: 'inherit',
  textAlign: 'left',
  cursor: 'pointer',
  selectors: {
    '&:hover, &[data-highlighted="true"]': {
      backgroundColor: tokens.colors.subtle,
    },
    '&[data-selected="true"]': {
      backgroundColor: tokens.colors.primary,
      color: tokens.colors.primaryContrast,
    },
    '&[data-disabled="true"]': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
});

export const sizeVariant = styleVariants({
  sm: { padding: '4px 30px 4px 8px', fontSize: tokens.fontSize.sm, height: '32px' },
  md: { padding: '8px 36px 8px 12px', fontSize: tokens.fontSize.sm, height: '36px' },
  lg: { padding: '10px 40px 10px 16px', fontSize: tokens.fontSize.base, height: '44px' },
});

export const triggerSizeVariant = styleVariants({
  sm: { padding: '4px 8px', fontSize: tokens.fontSize.sm, minHeight: '32px' },
  md: { padding: '8px 12px', fontSize: tokens.fontSize.sm, minHeight: '36px' },
  lg: { padding: '10px 16px', fontSize: tokens.fontSize.base, minHeight: '44px' },
});

export const icon = style({
  position: 'absolute',
  right: '12px',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: tokens.colors.muted,
  fontSize: tokens.fontSize.xs,
});
