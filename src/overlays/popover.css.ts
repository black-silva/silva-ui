import { style, styleVariants, globalStyle } from '@vanilla-extract/css';
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

/** Base content panel */
export const contentBase = style({
  position: 'absolute',
  zIndex: tokens.zIndex.popover,
  backgroundColor: tokens.colors.background,
  border: `${tokens.borderWidth[1]} solid ${tokens.colors.border}`,
  borderRadius: tokens.radii.medium,
  padding: tokens.space.medium,
  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
  transition: 'opacity 150ms ease',
});

globalStyle(`${contentBase}[data-state="open"]`, {
  opacity: 1,
  visibility: 'visible',
});

globalStyle(`${contentBase}[data-state="closed"]`, {
  opacity: 0,
  visibility: 'hidden',
  pointerEvents: 'none',
});

/** Side placement variants */
export const sideVariant = styleVariants({
  bottom: { top: '100%', left: 0, marginTop: tokens.space.xs },
  top: { bottom: '100%', left: 0, marginBottom: tokens.space.xs },
  left: { right: '100%', top: 0, marginRight: tokens.space.xs },
  right: { left: '100%', top: 0, marginLeft: tokens.space.xs },
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
});
