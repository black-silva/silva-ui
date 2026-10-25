import { style } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

export const base = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space.xs,
  width: '100%',
});

export const errorText = style({
  fontSize: tokens.fontSize.xs,
  color: tokens.colors.error,
  lineHeight: tokens.lineHeight.normal,
});

export const helperText = style({
  fontSize: tokens.fontSize.xs,
  color: tokens.colors.muted,
  lineHeight: tokens.lineHeight.normal,
});
