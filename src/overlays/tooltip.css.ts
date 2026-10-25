import { style, styleVariants, globalStyle } from '@vanilla-extract/css';
import { tokens } from '../core/sprinkles.css';

/** Root wrapper — inline-flex to avoid breaking text flow */
export const root = style({
  position: 'relative',
  display: 'inline-flex',
});

/** Trigger wrapper */
export const trigger = style({
  display: 'inline-flex',
});

/** Base tooltip content */
export const contentBase = style({
  position: 'absolute',
  zIndex: tokens.zIndex.tooltip,
  backgroundColor: tokens.colors.black,
  color: tokens.colors.white,
  border: `${tokens.borderWidth[1]} solid ${tokens.colors.muted}`,
  paddingTop: tokens.space.xs,
  paddingBottom: tokens.space.xs,
  paddingLeft: tokens.space.small,
  paddingRight: tokens.space.small,
  borderRadius: tokens.radii.small,
  fontSize: tokens.fontSize.xs,
  whiteSpace: 'nowrap',
  transition: 'opacity 150ms ease',
});

globalStyle(`${contentBase}[data-state="open"]`, {
  opacity: 1,
});

globalStyle(`${contentBase}[data-state="closed"]`, {
  opacity: 0,
  pointerEvents: 'none',
});

/** Side placement variants */
export const sideVariant = styleVariants({
  top: {
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    marginBottom: '4px',
  },
  bottom: {
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    marginTop: '4px',
  },
  left: {
    right: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    marginRight: '4px',
  },
  right: {
    left: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    marginLeft: '4px',
  },
});
