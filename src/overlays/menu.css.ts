import { style, globalStyle } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

/** Root wrapper with relative positioning */
export const root = style({
  position: 'relative',
  display: 'inline-block',
});

/** Trigger wrapper */
export const trigger = style({
  display: 'inline-flex',
});

/** Dropdown content panel */
export const content = style({
  position: 'absolute',
  zIndex: tokens.zIndex.popover,
  top: '100%',
  left: 0,
  minWidth: '160px',
  backgroundColor: tokens.colors.background,
  border: `${tokens.borderWidth[1]} solid ${tokens.colors.border}`,
  borderRadius: tokens.radii.medium,
  paddingTop: tokens.space.xs,
  paddingBottom: tokens.space.xs,
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  marginTop: tokens.space.xs,
});

globalStyle(`${content}[data-state="open"]`, {
  display: 'block',
});

globalStyle(`${content}[data-state="closed"]`, {
  display: 'none',
});

/** Menu item */
export const item = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.space.small,
  paddingTop: tokens.space.xs,
  paddingBottom: tokens.space.xs,
  paddingLeft: tokens.space.medium,
  paddingRight: tokens.space.medium,
  cursor: 'pointer',
  fontSize: tokens.fontSize.sm,
  border: 'none',
  background: 'none',
  width: '100%',
  textAlign: 'left',
  color: 'inherit',
});

globalStyle(`${item}:hover`, {
  backgroundColor: tokens.colors.subtle,
});

globalStyle(`${item}[data-disabled]`, {
  opacity: 0.5,
  pointerEvents: 'none',
});

/** Menu separator */
export const separator = style({
  height: '1px',
  backgroundColor: tokens.colors.border,
  marginTop: tokens.space.xs,
  marginBottom: tokens.space.xs,
  border: 'none',
});

/** Menu label (non-interactive) */
export const label = style({
  fontSize: tokens.fontSize.xs,
  fontWeight: tokens.fontWeight.medium,
  color: tokens.colors.muted,
  paddingTop: tokens.space.xs,
  paddingBottom: tokens.space.xs,
  paddingLeft: tokens.space.medium,
  paddingRight: tokens.space.medium,
});

/** Menu group */
export const group = style({});
