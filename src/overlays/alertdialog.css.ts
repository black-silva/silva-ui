import { style, globalStyle } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

/** AlertDialog root container */
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

/** Action button — solid primary style */
export const action = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `${tokens.space.small} ${tokens.space.medium}`,
  fontSize: tokens.fontSize.sm,
  fontWeight: tokens.fontWeight.medium,
  borderRadius: tokens.radii.medium,
  border: 'none',
  cursor: 'pointer',
  backgroundColor: tokens.colors.primary,
  color: tokens.colors.white,
  transition: 'background-color 150ms ease',
});

globalStyle(`${action}:hover`, {
  backgroundColor: tokens.colors.primaryHover,
});

globalStyle(`${action}:active`, {
  backgroundColor: tokens.colors.primaryActive,
});

/** Cancel button — outline style */
export const cancel = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `${tokens.space.small} ${tokens.space.medium}`,
  fontSize: tokens.fontSize.sm,
  fontWeight: tokens.fontWeight.medium,
  borderRadius: tokens.radii.medium,
  border: `${tokens.borderWidth[1]} solid ${tokens.colors.border}`,
  cursor: 'pointer',
  backgroundColor: tokens.colors.transparent,
  color: tokens.colors.secondary,
  transition: 'background-color 150ms ease',
});

globalStyle(`${cancel}:hover`, {
  backgroundColor: tokens.colors.subtle,
});
