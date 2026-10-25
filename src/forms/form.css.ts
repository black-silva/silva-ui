import { style } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

export const base = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space.medium,
});
