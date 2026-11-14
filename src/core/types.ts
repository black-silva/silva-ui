/**
 * Shared types for silva-ui components.
 *
 * We keep JSX/framework types minimal and use `children?: any`
 * so the library works with Hono JSX, Preact, or plain string rendering.
 */

import type { ProjectionSprinkles, Sprinkles } from './sprinkles.css';
import type { AnimationName } from './visuals.css';
import type { GradientName } from './gradients';
import type { ColorTokenName } from './colors';

type NamedColorValue = ColorTokenName | Partial<Record<'default' | 'hover' | 'active' | 'focus', ColorTokenName | keyof typeof import('./theme.css').themeColors>>;

/** Props common to every silva-ui primitive. */
export type BaseProps = Omit<ProjectionSprinkles, 'backgroundColor' | 'color' | 'borderColor' | 'bg'> & {
  /** Named gradients work with `backgroundColor` and `color` in addition to theme color tokens. */
  backgroundColor?: Sprinkles['backgroundColor'] | GradientName | NamedColorValue;
  bg?: Sprinkles['bg'] | NamedColorValue;
  borderColor?: Sprinkles['borderColor'] | NamedColorValue;
  color?: Sprinkles['color'] | GradientName | NamedColorValue;
  /** A library-provided enter or attention animation. */
  animation?: AnimationName;
  /** Extra class name(s) to merge after the generated sprinkles class. */
  class?: string;
  children?: any;
  [key: string]: any;
};

/** Standard component size scale. */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
