import { style, globalStyle } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

/** Dialog root container */
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

/** Centered content panel */
export const content = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: tokens.zIndex.modal,
  backgroundColor: tokens.colors.background,
  borderRadius: tokens.radii.large,
  padding: tokens.space.large,
  maxWidth: '40rem',
  width: '90%',
  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
  transition: 'opacity 150ms ease',
});

globalStyle(`${content}[data-state="open"]`, {
  opacity: 1,
});

globalStyle(`${content}[data-state="closed"]`, {
  opacity: 0,
  pointerEvents: 'none',
});

/** Dialog header */
export const header = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space.xs,
  paddingBottom: tokens.space.medium,
});

/** Dialog footer */
export const footer = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: tokens.space.small,
  paddingTop: tokens.space.medium,
});

/** Dialog title */
export const title = style({
  fontSize: tokens.fontSize.lg,
  fontWeight: tokens.fontWeight.semibold,
  lineHeight: tokens.lineHeight.tight,
  margin: 0,
});

/** Dialog description */
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
