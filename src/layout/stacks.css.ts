import { style } from '@vanilla-extract/css';

/** Base reset for all stacks — ensures flex container behavior. */
export const stackBase = style({
  display: 'flex',
  boxSizing: 'border-box',
});

export const yStack = style([
  stackBase,
  { flexDirection: 'column' },
]);

export const xStack = style([
  stackBase,
  { flexDirection: 'row' },
]);

