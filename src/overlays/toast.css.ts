import { style, styleVariants, globalStyle } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

/** Base toast viewport container */
export const providerBase = style({
  position: 'fixed',
  zIndex: tokens.zIndex.toast,
  padding: tokens.space.medium,
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space.small,
  pointerEvents: 'none',
});

/** Position variants for the toast viewport */
export const positionVariant = styleVariants({
  'top-right': { top: 0, right: 0 },
  'top-left': { top: 0, left: 0 },
  'bottom-right': { bottom: 0, right: 0 },
  'bottom-left': { bottom: 0, left: 0 },
  'top-center': { top: 0, left: '50%', transform: 'translateX(-50%)' },
  'bottom-center': { bottom: 0, left: '50%', transform: 'translateX(-50%)' },
});

/** Base toast item */
export const toastBase = style({
  position: 'relative',
  backgroundColor: tokens.colors.background,
  border: `${tokens.borderWidth[1]} solid ${tokens.colors.border}`,
  borderRadius: tokens.radii.medium,
  padding: tokens.space.medium,
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  pointerEvents: 'auto',
  display: 'flex',
  flexDirection: 'row',
  gap: tokens.space.small,
  alignItems: 'flex-start',
});

/** Toast variant styles */
export const toastVariant = styleVariants({
  default: {},
  success: { borderLeft: `${tokens.borderWidth[4]} solid ${tokens.colors.success}` },
  error: { borderLeft: `${tokens.borderWidth[4]} solid ${tokens.colors.error}` },
  warning: { borderLeft: `${tokens.borderWidth[4]} solid ${tokens.colors.warning}` },
});

/** Toast title */
export const title = style({
  fontWeight: tokens.fontWeight.medium,
  fontSize: tokens.fontSize.sm,
  margin: 0,
});

/** Toast description */
export const description = style({
  fontSize: tokens.fontSize.sm,
  color: tokens.colors.muted,
  margin: 0,
});

/** Close button */
export const close = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: tokens.space.xs,
  lineHeight: 1,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 'auto',
  flexShrink: 0,
});
