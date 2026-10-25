import { style, globalStyle } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

export const root = style({
  display: 'inline-flex',
  flexDirection: 'row',
  boxSizing: 'border-box',
});

/* Connect adjacent items and collapse borders */
globalStyle(`${root} > *:not(:first-child)`, {
  marginLeft: '-1px',
  borderTopLeftRadius: '0 !important',
  borderBottomLeftRadius: '0 !important',
});

globalStyle(`${root} > *:not(:last-child)`, {
  borderTopRightRadius: '0 !important',
  borderBottomRightRadius: '0 !important',
});

globalStyle(`${root} > *:first-child`, {
  borderTopRightRadius: '0 !important',
  borderBottomRightRadius: '0 !important',
});

globalStyle(`${root} > *:last-child`, {
  borderTopLeftRadius: '0 !important',
  borderBottomLeftRadius: '0 !important',
});

globalStyle(`${root} > *:only-child`, {
  borderRadius: `${tokens.radii.medium} !important`,
});

