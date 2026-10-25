import { style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

export const root = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: tokens.space.medium,
  width: '100%',
  boxSizing: 'border-box',
  transition: 'background-color 150ms ease',
});

export const pressable = style({
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      backgroundColor: tokens.colors.subtle,
    },
    '&:active': {
      backgroundColor: tokens.colors.subtle,
    },
  },
});

export const sizeVariant = styleVariants({
  sm: { padding: `${tokens.space.xs} ${tokens.space.small}`, fontSize: tokens.fontSize.sm },
  md: { padding: `${tokens.space.small} ${tokens.space.medium}`, fontSize: tokens.fontSize.base },
  lg: { padding: `${tokens.space.medium} ${tokens.space.large}`, fontSize: tokens.fontSize.lg },
});

export const textContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space.none,
  flexGrow: 1,
});

export const title = style({
  fontWeight: tokens.fontWeight.medium,
  color: tokens.colors.secondary,
  lineHeight: tokens.lineHeight.tight,
});

export const subTitle = style({
  fontSize: tokens.fontSize.xs,
  color: tokens.colors.muted,
  lineHeight: tokens.lineHeight.normal,
});

export const icon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

