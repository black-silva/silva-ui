import { style } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

export const root = style({
  backgroundColor: tokens.colors.card,
  borderRadius: tokens.radii.large,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
});

export const bordered = style({
  border: `${tokens.borderWidth[1]} solid ${tokens.colors.border}`,
});

export const elevated = style({
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
});

export const header = style({
  padding: tokens.space.medium,
  borderBottom: `${tokens.borderWidth[1]} solid ${tokens.colors.border}`,
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space.xs,
});

export const footer = style({
  padding: tokens.space.medium,
  borderTop: `${tokens.borderWidth[1]} solid ${tokens.colors.border}`,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: tokens.space.small,
});

