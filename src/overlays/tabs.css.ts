import { style, globalStyle } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

/* ------------------------------------------------------------------ */
/*  Tabs Container                                                     */
/* ------------------------------------------------------------------ */

export const tabsRoot = style({
  display: 'flex',
  flexDirection: 'column',
});

/* ------------------------------------------------------------------ */
/*  Tab List (the row of tab triggers)                                 */
/* ------------------------------------------------------------------ */

export const tabList = style({
  display: 'flex',
  flexDirection: 'row',
  gap: tokens.space.small,
  borderBottom: `${tokens.borderWidth[1]} solid ${tokens.colors.border}`,
});

/* ------------------------------------------------------------------ */
/*  Individual Tab Button                                              */
/* ------------------------------------------------------------------ */

export const tab = style({
  all: 'unset',
  cursor: 'pointer',
  padding: `${tokens.space.small} ${tokens.space.medium}`,
  fontWeight: 500,
  fontSize: '14px',
  color: tokens.colors.muted,
  borderBottom: '2px solid transparent',
  transition: 'color 150ms, border-color 150ms',
  selectors: {
    '&:hover': {
      color: tokens.colors.secondary,
    },
    '&[data-active="true"]': {
      color: tokens.colors.primary,
      borderBottomColor: tokens.colors.primary,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.colors.primary}`,
      outlineOffset: '-2px',
      borderRadius: tokens.radii.small,
    },
  },
});

/* ------------------------------------------------------------------ */
/*  Tab Panel                                                          */
/* ------------------------------------------------------------------ */

export const tabPanel = style({
  padding: tokens.space.medium,
  selectors: {
    '&[hidden]': {
      display: 'none',
    },
  },
});

