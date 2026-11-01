/**
 * Shared types for silva-ui components.
 *
 * We keep JSX/framework types minimal and use `children?: any`
 * so the library works with Hono JSX, Preact, or plain string rendering.
 */

import type { Sprinkles } from './sprinkles.css';
import type { AnimationName } from './visuals.css';
import type { GradientName } from './gradients';

/** Props common to every silva-ui primitive. */
export type BaseProps = Omit<Sprinkles, 'backgroundColor' | 'color'> & {
  /** Named gradients work with `backgroundColor` and `color` in addition to theme color tokens. */
  backgroundColor?: Sprinkles['backgroundColor'] | GradientName;
  color?: Sprinkles['color'] | GradientName;
  /** A library-provided enter or attention animation. */
  animation?: AnimationName;
  /** Extra class name(s) to merge after the generated sprinkles class. */
  class?: string;
  children?: any;
  [key: string]: any;
};

/** Standard component size scale. */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
