import { style, globalStyle } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

/** Root wrapper */
export const root = style({
  display: 'contents',
});

/** Trigger area that responds to right-click */
export const trigger = style({
  display: 'contents',
});

/** Context menu content — fixed positioned at cursor via CSS custom properties */
export const content = style({
  position: 'fixed',
  zIndex: tokens.zIndex.popover,
  left: 'var(--context-menu-x, 0px)',
  top: 'var(--context-menu-y, 0px)',
  minWidth: '160px',
  backgroundColor: tokens.colors.background,
  border: `${tokens.borderWidth[1]} solid ${tokens.colors.border}`,
  borderRadius: tokens.radii.medium,
  paddingTop: tokens.space.xs,
  paddingBottom: tokens.space.xs,
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
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

/** Separator */
export const separator = style({
  height: '1px',
  backgroundColor: tokens.colors.border,
  marginTop: tokens.space.xs,
  marginBottom: tokens.space.xs,
  border: 'none',
});

/** Label (non-interactive) */
export const label = style({
  fontSize: tokens.fontSize.xs,
  fontWeight: tokens.fontWeight.medium,
  color: tokens.colors.muted,
  paddingTop: tokens.space.xs,
  paddingBottom: tokens.space.xs,
  paddingLeft: tokens.space.medium,
  paddingRight: tokens.space.medium,
});

/** Group */
export const group = style({});
