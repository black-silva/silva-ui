import { style, globalStyle } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

export const root = style({
  display: 'inline-flex',
  flexDirection: 'row',
  borderRadius: tokens.radii.medium,
  overflow: 'hidden',
  boxSizing: 'border-box',
});

export const item = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `${tokens.space.small} ${tokens.space.medium}`,
  fontSize: tokens.fontSize.sm,
  fontWeight: tokens.fontWeight.normal,
  fontFamily: 'inherit',
  color: tokens.colors.secondary,
  backgroundColor: tokens.colors.background,
  border: `${tokens.borderWidth[1]} solid ${tokens.colors.border}`,
  cursor: 'pointer',
  transition: 'background-color 150ms ease, color 150ms ease, border-color 150ms ease',
  outline: 'none',
  selectors: {
    '&:hover:not([disabled])': {
      backgroundColor: tokens.colors.subtle,
    },
    '&[data-active="true"]': {
      backgroundColor: tokens.colors.subtle,
      color: tokens.colors.primary,
      fontWeight: tokens.fontWeight.semibold,
      borderColor: tokens.colors.border,
      zIndex: 1,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.colors.ring}`,
      outlineOffset: '-1px',
      zIndex: 2,
    },
    '&[disabled]': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
});

/* Connect adjacent items and collapse borders */
globalStyle(`${root} > *:not(:first-child)`, {
  marginLeft: '-1px',
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
});

globalStyle(`${root} > *:not(:last-child)`, {
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
});

globalStyle(`${root} > *:first-child`, {
  borderTopLeftRadius: tokens.radii.medium,
  borderBottomLeftRadius: tokens.radii.medium,
});

globalStyle(`${root} > *:last-child`, {
  borderTopRightRadius: tokens.radii.medium,
  borderBottomRightRadius: tokens.radii.medium,
});

