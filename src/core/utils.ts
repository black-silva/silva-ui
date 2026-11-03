import { sprinkles, type Sprinkles } from './sprinkles.css';
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

/**
 * Split a props object into sprinkles props and the remaining "rest" props.
 *
 * This lets components accept both sprinkles tokens *and* arbitrary HTML
 * attributes without manually destructuring every sprinkles key.
 */
export function splitSprinklesProps<T extends Record<string, unknown>>(
  props: T,
): { sprinklesProps: Sprinkles; rest: Omit<T, keyof Sprinkles> } {
  const sprinklesProps: Record<string, unknown> = {};
  const rest: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(props)) {
    if (SPRINKLES_KEYS.has(key)) {
      sprinklesProps[key] = value;
    } else {
      rest[key] = value;
    }
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
