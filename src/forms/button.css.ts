import { style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

export const base = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: tokens.fontWeight.medium,
  fontFamily: 'inherit',
  borderRadius: tokens.radii.medium,
  border: 'none',
  cursor: 'pointer',
  gap: tokens.space.xs,
  transition: 'color 150ms ease, background-color 150ms ease, border-color 150ms ease',
  lineHeight: tokens.lineHeight.normal,
  textDecoration: 'none',
  ':focus-visible': {
    outline: `2px solid ${tokens.colors.ring}`,
    outlineOffset: '2px',
  },
  selectors: {
    '&[disabled]': {
      opacity: 0.5,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },
});

export const sizeVariant = styleVariants({
  xs: { padding: '2px 8px', fontSize: tokens.fontSize.xs, height: '24px' },
  sm: { padding: '4px 12px', fontSize: tokens.fontSize.sm, height: '32px' },
  md: { padding: '8px 16px', fontSize: tokens.fontSize.sm, height: '36px' },
  lg: { padding: '10px 20px', fontSize: tokens.fontSize.base, height: '44px' },
  xl: { padding: '12px 24px', fontSize: tokens.fontSize.lg, height: '52px' },
});

export const variantStyle = styleVariants({
  solid: {
    backgroundColor: tokens.colors.primary,
    color: tokens.colors.primaryContrast,
    selectors: {
      '&:hover:not([disabled])': {
        backgroundColor: tokens.colors.primaryHover,
      },
      '&:active:not([disabled])': {
        backgroundColor: tokens.colors.primaryActive,
      },
    },
  },
  outline: {
    backgroundColor: tokens.colors.transparent,
    border: `1px solid ${tokens.colors.border}`,
    color: tokens.colors.secondary,
    selectors: {
      '&:hover:not([disabled])': {
        backgroundColor: tokens.colors.subtle,
      },
    },
  },
  ghost: {
    backgroundColor: tokens.colors.transparent,
    color: tokens.colors.secondary,
    selectors: {
      '&:hover:not([disabled])': {
        backgroundColor: tokens.colors.subtle,
      },
    },
  },
  link: {
    backgroundColor: tokens.colors.transparent,
    color: tokens.colors.primary,
    padding: 0,
    height: 'auto',
    selectors: {
      '&:hover:not([disabled])': {
        textDecoration: 'underline',
      },
    },
  },
});
