import { style, styleVariants, globalStyle } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

/** Sheet root container */
export const root = style({
  position: 'relative',
});

/** Fixed backdrop overlay */
export const overlay = style({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: tokens.colors.overlay,
  zIndex: tokens.zIndex.overlay,
  transition: 'opacity 150ms ease',
});

globalStyle(`${overlay}[data-state="open"]`, {
  opacity: 1,
});

globalStyle(`${overlay}[data-state="closed"]`, {
  opacity: 0,
  pointerEvents: 'none',
});

/** Base content styles */
export const contentBase = style({
  position: 'fixed',
  zIndex: tokens.zIndex.modal,
  backgroundColor: tokens.colors.background,
  padding: tokens.space.large,
  transition: 'transform 300ms ease',
});

/** Side variants */
export const sideVariant = styleVariants({
  bottom: {
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: tokens.radii.xl,
    borderTopRightRadius: tokens.radii.xl,
    maxHeight: '90vh',
  },
  top: {
    top: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: tokens.radii.xl,
    borderBottomRightRadius: tokens.radii.xl,
    maxHeight: '90vh',
  },
  left: {
    top: 0,
    bottom: 0,
    left: 0,
    width: '80%',
    maxWidth: '400px',
  },
  right: {
    top: 0,
    bottom: 0,
    right: 0,
    width: '80%',
    maxWidth: '400px',
  },
});

/* data-state transforms for each side */
globalStyle(`${contentBase}${sideVariant.bottom}[data-state="open"]`, {
  transform: 'translateY(0)',
});
globalStyle(`${contentBase}${sideVariant.bottom}[data-state="closed"]`, {
  transform: 'translateY(100%)',
  pointerEvents: 'none',
});

globalStyle(`${contentBase}${sideVariant.top}[data-state="open"]`, {
  transform: 'translateY(0)',
});
globalStyle(`${contentBase}${sideVariant.top}[data-state="closed"]`, {
  transform: 'translateY(-100%)',
  pointerEvents: 'none',
});

globalStyle(`${contentBase}${sideVariant.left}[data-state="open"]`, {
  transform: 'translateX(0)',
});
globalStyle(`${contentBase}${sideVariant.left}[data-state="closed"]`, {
  transform: 'translateX(-100%)',
  pointerEvents: 'none',
});

globalStyle(`${contentBase}${sideVariant.right}[data-state="open"]`, {
  transform: 'translateX(0)',
});
globalStyle(`${contentBase}${sideVariant.right}[data-state="closed"]`, {
  transform: 'translateX(100%)',
  pointerEvents: 'none',
});

/** Header */
export const header = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space.xs,
  paddingBottom: tokens.space.medium,
});

/** Footer */
export const footer = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: tokens.space.small,
  paddingTop: tokens.space.medium,
});

/** Title */
export const title = style({
  fontSize: tokens.fontSize.lg,
  fontWeight: tokens.fontWeight.semibold,
  lineHeight: tokens.lineHeight.tight,
  margin: 0,
});

/** Description */
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
});
