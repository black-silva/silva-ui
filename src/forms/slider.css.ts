import { style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

export const root = style({
  width: '100%',
  display: 'inline-flex',
  alignItems: 'center',
});

export const input = style({
  width: '100%',
  appearance: 'none',
  backgroundColor: tokens.colors.subtle,
  borderRadius: tokens.radii.full,
  outline: 'none',
  cursor: 'pointer',
  transition: 'opacity 150ms ease',
  selectors: {
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.colors.ring}`,
      outlineOffset: '2px',
    },
    '&::-webkit-slider-thumb': {
      appearance: 'none',
      backgroundColor: tokens.colors.primary,
      borderRadius: tokens.radii.full,
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      cursor: 'pointer',
      transition: 'transform 100ms ease',
    },
    '&::-moz-range-thumb': {
      appearance: 'none',
      backgroundColor: tokens.colors.primary,
      borderRadius: tokens.radii.full,
      border: 'none',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      cursor: 'pointer',
    },
    '&:active::-webkit-slider-thumb': {
      transform: 'scale(1.15)',
    },
  },
});

export const sizeVariant = styleVariants({
  sm: {
    height: '4px',
    selectors: {
      '&::-webkit-slider-thumb': { width: '14px', height: '14px' },
      '&::-moz-range-thumb': { width: '14px', height: '14px' },
    },
  },
  md: {
    height: '6px',
    selectors: {
      '&::-webkit-slider-thumb': { width: '18px', height: '18px' },
      '&::-moz-range-thumb': { width: '18px', height: '18px' },
    },
  },
  lg: {
    height: '8px',
    selectors: {
      '&::-webkit-slider-thumb': { width: '22px', height: '22px' },
      '&::-moz-range-thumb': { width: '22px', height: '22px' },
    },
  },
});

