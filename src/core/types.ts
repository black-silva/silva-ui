/**
 * Shared types for silva-ui components.
 *
 * We keep JSX/framework types minimal and use `children?: any`
 * so the library works with Hono JSX, Preact, or plain string rendering.
 */

import type { Sprinkles } from './sprinkles.css';

/** Props common to every silva-ui primitive. */
export interface BaseProps extends Sprinkles {
  /** Extra class name(s) to merge after the generated sprinkles class. */
  class?: string;
  children?: any;
  [key: string]: any;
}

/** Standard component size scale. */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
