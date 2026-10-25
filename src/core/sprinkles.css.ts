// sprinkles.css.ts
import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';
import { themeColors } from './theme.css';

// 1. Design Tokens
export const tokens = {
  space: {
    none: '0px',
    xs: '4px',
    small: '8px',
    medium: '16px',
    large: '24px',
    xl: '32px',
    '2xl': '40px',
    auto: 'auto',
  },
  colors: themeColors,
  radii: {
    none: '0px',
    xs: '2px',
    small: '4px',
    medium: '8px',
    large: '12px',
    xl: '16px',
    full: '9999px',
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px',
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  size: {
    auto: 'auto',
    full: '100%',
    half: '50%',
    fit: 'fit-content',
    min: 'min-content',
    max: 'max-content',
    screenH: '100vh',
    screenW: '100vw',
    0: '0px',
    px: '1px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
    32: '128px',
    40: '160px',
    48: '192px',
    64: '256px',
  },
  zIndex: {
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    overlay: '1000',
    modal: '1100',
    popover: '1200',
    toast: '1300',
    tooltip: '1400',
    max: '9999',
  },
  borderWidth: {
    0: '0px',
    1: '1px',
    2: '2px',
    4: '4px',
  },
  opacity: {
    0: '0',
    5: '0.05',
    10: '0.1',
    25: '0.25',
    50: '0.5',
    75: '0.75',
    100: '1',
  },
};

// 2. Define Atomic Properties & Responsive/State Conditions
const responsiveProperties = defineProperties({
  conditions: {
    default: {},
    hover: { selector: '&:hover' },
    active: { selector: '&:active' },
    focus: { selector: '&:focus-visible' },
  },
  defaultCondition: 'default',
  properties: {
    // Layout
    display: ['flex', 'block', 'inline-block', 'inline-flex', 'inline', 'grid', 'inline-grid', 'none', 'contents'],
    flexDirection: ['row', 'column', 'row-reverse', 'column-reverse'],
    alignItems: ['stretch', 'flex-start', 'center', 'flex-end', 'baseline'],
    justifyContent: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
    flexWrap: ['nowrap', 'wrap', 'wrap-reverse'],
    flexGrow: [0, 1],
    flexShrink: [0, 1],
    alignSelf: ['auto', 'flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
    gap: tokens.space,

    // Spacing
    paddingTop: tokens.space,
    paddingBottom: tokens.space,
    paddingLeft: tokens.space,
    paddingRight: tokens.space,
    marginTop: tokens.space,
    marginBottom: tokens.space,
    marginLeft: tokens.space,
    marginRight: tokens.space,

    // Sizing
    width: tokens.size,
    height: tokens.size,
    minWidth: tokens.size,
    minHeight: tokens.size,
    maxWidth: tokens.size,
    maxHeight: tokens.size,

    // Typography
    fontSize: tokens.fontSize,
    fontWeight: tokens.fontWeight,
    lineHeight: tokens.lineHeight,
    textAlign: ['left', 'center', 'right', 'justify'],
    textDecoration: ['none', 'underline', 'line-through'],
    textTransform: ['none', 'uppercase', 'lowercase', 'capitalize'],
    letterSpacing: tokens.letterSpacing,
    whiteSpace: ['normal', 'nowrap', 'pre', 'pre-wrap', 'pre-line'],
    wordBreak: ['normal', 'break-all', 'break-word'],

    // Borders
    borderRadius: tokens.radii,
    borderWidth: tokens.borderWidth,
    borderStyle: ['none', 'solid', 'dashed', 'dotted'],
    borderColor: tokens.colors,

    // Colors
    backgroundColor: tokens.colors,
    color: tokens.colors,

    // Positioning
    position: ['relative', 'absolute', 'fixed', 'sticky'],
    top: tokens.space,
    right: tokens.space,
    bottom: tokens.space,
    left: tokens.space,
    zIndex: tokens.zIndex,

    // Overflow & Visibility
    overflow: ['visible', 'hidden', 'scroll', 'auto'],
    overflowX: ['visible', 'hidden', 'scroll', 'auto'],
    overflowY: ['visible', 'hidden', 'scroll', 'auto'],
    opacity: tokens.opacity,
    visibility: ['visible', 'hidden'],

    // Interactivity
    cursor: ['auto', 'default', 'pointer', 'not-allowed', 'grab', 'grabbing', 'text', 'move'],
    pointerEvents: ['auto', 'none'],
    userSelect: ['auto', 'none', 'text', 'all'],

    // Media
    objectFit: ['contain', 'cover', 'fill', 'none', 'scale-down'],
  },
  shorthands: {
    // Padding
    p: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    px: ['paddingLeft', 'paddingRight'],
    py: ['paddingTop', 'paddingBottom'],
    pt: ['paddingTop'],
    pb: ['paddingBottom'],
    pl: ['paddingLeft'],
    pr: ['paddingRight'],
    // Margin
    m: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    mx: ['marginLeft', 'marginRight'],
    my: ['marginTop', 'marginBottom'],
    mt: ['marginTop'],
    mb: ['marginBottom'],
    ml: ['marginLeft'],
    mr: ['marginRight'],
    // Colors
    bg: ['backgroundColor'],
    // Sizing
    w: ['width'],
    h: ['height'],
  },
});

export const sprinkles = createSprinkles(responsiveProperties);
export type Sprinkles = Parameters<typeof sprinkles>[0];
