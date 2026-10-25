import { style } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

/** Base reset for heading elements. */
export const base = style({
  margin: 0,
  padding: 0,
  lineHeight: tokens.lineHeight.tight,
  letterSpacing: tokens.letterSpacing.tight,
});