import { style, globalStyle } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

/** Root accordion container */
export const root = style({
  border: `${tokens.borderWidth[1]} solid ${tokens.colors.border}`,
  borderRadius: tokens.radii.medium,
  overflow: 'hidden',
});

/** Individual accordion item */
export const item = style({
  borderBottom: `${tokens.borderWidth[1]} solid ${tokens.colors.border}`,
});

globalStyle(`${item}:last-child`, {
  borderBottom: 'none',
});

/** Trigger button */
export const trigger = style({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: tokens.space.medium,
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: tokens.fontSize.base,
  fontWeight: tokens.fontWeight.medium,
  textAlign: 'left',
  color: 'inherit',
});

globalStyle(`${trigger}:hover`, {
  backgroundColor: tokens.colors.subtle,
});

/** Chevron indicator inside the trigger */
export const chevron = style({
  display: 'inline-flex',
  transition: 'transform 200ms ease',
  fontSize: tokens.fontSize.sm,
});

globalStyle(`${trigger}[data-state="open"] ${chevron}`, {
  transform: 'rotate(180deg)',
});

/** Collapsible content area */
export const content = style({});

globalStyle(`${content}[data-state="open"]`, {
  display: 'block',
  paddingLeft: tokens.space.medium,
  paddingRight: tokens.space.medium,
  paddingBottom: tokens.space.medium,
});

globalStyle(`${content}[data-state="closed"]`, {
  display: 'none',
});
