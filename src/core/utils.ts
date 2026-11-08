import { sprinkles, type Sprinkles } from './sprinkles.css';
import { isProjectionToken, projectionTokenToCss } from './projection';
import { animationClass, animations, gradientBackground, gradients, gradientText } from './visuals.css';

/**
 * All valid sprinkles property keys (including shorthands).
 * Used to split incoming props into sprinkles vs. passthrough.
 */
const SPRINKLES_KEYS = new Set<string>([
  // Layout
  'display',
  'flexDirection',
  'alignItems',
  'justifyContent',
  'flexWrap',
  'flexGrow',
  'flexShrink',
  'alignSelf',
  'gap',
  // Spacing
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  // Sizing
  'width',
  'height',
  'minWidth',
  'minHeight',
  'maxWidth',
  'maxHeight',
  // Typography
  'fontSize',
  'fontWeight',
  'lineHeight',
  'textAlign',
  'textDecoration',
  'textTransform',
  'letterSpacing',
  'whiteSpace',
  'wordBreak',
  // Borders
  'borderRadius',
  'borderWidth',
  'borderStyle',
  'borderColor',
  // Colors
  'backgroundColor',
  'color',
  // Positioning
  'position',
  'top',
  'right',
  'bottom',
  'left',
  'zIndex',
  // Overflow & Visibility
  'overflow',
  'overflowX',
  'overflowY',
  'opacity',
  'visibility',
  // Interactivity
  'cursor',
  'pointerEvents',
  'userSelect',
  // Media
  'objectFit',
  // Visual effects
  'animation',
  // Shorthands
  'p',
  'px',
  'py',
  'pt',
  'pb',
  'pl',
  'pr',
  'm',
  'mx',
  'my',
  'mt',
  'mb',
  'ml',
  'mr',
  'bg',
  'w',
  'h',
]);

/** CSS properties that accept an unbounded `$n` projection token. */
const PROJECTION_PROPERTIES: Record<string, string[]> = {
  gap: ['gap'],
  paddingTop: ['paddingTop'],
  paddingBottom: ['paddingBottom'],
  paddingLeft: ['paddingLeft'],
  paddingRight: ['paddingRight'],
  marginTop: ['marginTop'],
  marginBottom: ['marginBottom'],
  marginLeft: ['marginLeft'],
  marginRight: ['marginRight'],
  width: ['width'],
  height: ['height'],
  minWidth: ['minWidth'],
  minHeight: ['minHeight'],
  maxWidth: ['maxWidth'],
  maxHeight: ['maxHeight'],
  fontSize: ['fontSize'],
  borderRadius: ['borderRadius'],
  top: ['top'],
  right: ['right'],
  bottom: ['bottom'],
  left: ['left'],
  p: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
  px: ['paddingLeft', 'paddingRight'],
  py: ['paddingTop', 'paddingBottom'],
  pt: ['paddingTop'],
  pb: ['paddingBottom'],
  pl: ['paddingLeft'],
  pr: ['paddingRight'],
  m: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
  mx: ['marginLeft', 'marginRight'],
  my: ['marginTop', 'marginBottom'],
  mt: ['marginTop'],
  mb: ['marginBottom'],
  ml: ['marginLeft'],
  mr: ['marginRight'],
  w: ['width'],
  h: ['height'],
};

function toKebabCase(property: string): string {
  return property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function mergeProjectionStyle(
  projectionStyle: Record<string, string>,
  inlineStyle: unknown,
): unknown {
  if (typeof inlineStyle === 'string') {
    const declarations = Object.entries(projectionStyle)
      .map(([property, value]) => `${toKebabCase(property)}:${value}`)
      .join(';');
    return [declarations, inlineStyle].filter(Boolean).join(';');
  }

  return { ...projectionStyle, ...(inlineStyle as Record<string, unknown> | undefined) };
}

/**
 * Split a props object into sprinkles props and the remaining "rest" props.
 *
 * This lets components accept both sprinkles tokens *and* arbitrary HTML
 * attributes without manually destructuring every sprinkles key. Projection
 * tokens are converted to inline fluid CSS because `$n` is intentionally an
 * open numeric scale, rather than a generated list of atomic classes.
 */
export function splitSprinklesProps<T extends Record<string, unknown>>(
  props: T,
): { sprinklesProps: Sprinkles; rest: Omit<T, keyof Sprinkles> } {
  const sprinklesProps: Record<string, unknown> = {};
  const rest: Record<string, unknown> = {};
  const projectionStyle: Record<string, string> = {};
  let inlineStyle: unknown;

  for (const [key, value] of Object.entries(props)) {
    if (key === 'style') {
      inlineStyle = value;
      continue;
    }

    const projectionProperties = PROJECTION_PROPERTIES[key];
    if (projectionProperties && isProjectionToken(value)) {
      const projectedValue = projectionTokenToCss(value);
      for (const property of projectionProperties) {
        projectionStyle[property] = projectedValue;
      }
      continue;
    }

    if (SPRINKLES_KEYS.has(key)) {
      sprinklesProps[key] = value;
    } else {
      rest[key] = value;
    }
  }

  if (Object.keys(projectionStyle).length > 0) {
    // Explicit inline styles keep their normal precedence over a token prop.
    rest.style = mergeProjectionStyle(projectionStyle, inlineStyle);
  } else if (inlineStyle !== undefined) {
    rest.style = inlineStyle;
  }

  return {
    sprinklesProps: sprinklesProps as Sprinkles,
    rest: rest as Omit<T, keyof Sprinkles>,
  };
}

/** Merge a sprinkles class + optional extra classes into a single string. */
export function cls(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Generate CSS classes from sprinkle tokens plus visual shorthand props. */
export function toSprinklesClass(sprinklesProps: Sprinkles): string {
  const props = { ...(sprinklesProps as Record<string, unknown>) };
  const classes: string[] = [];

  // Gradients cannot be applied directly to CSS color properties, so named
  // gradient values turn familiar `backgroundColor` and `color` props into
  // the right background/background-clip declarations.
  const backgroundColor = props.backgroundColor;
  if (typeof backgroundColor === 'string' && backgroundColor in gradients) {
    classes.push(gradientBackground[backgroundColor as keyof typeof gradients]);
    delete props.backgroundColor;
  }

  const color = props.color;
  if (typeof color === 'string' && color in gradients) {
    classes.push(gradientText[color as keyof typeof gradients]);
    delete props.color;
  }

  const animation = props.animation;
  if (typeof animation === 'string' && animation in animations) {
    classes.push(animationClass[animation as keyof typeof animations]);
    delete props.animation;
  }

  if (Object.keys(props).length > 0) {
    classes.unshift(sprinkles(props as Sprinkles));
  }

  return classes.join(' ');
}
