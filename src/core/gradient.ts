import { themeColors } from './theme.css';

/** A theme token or any valid CSS colour value. */
export type GradientColor = keyof typeof themeColors | (string & {});

/**
 * A theme-aware CSS gradient.
 *
 * Colour names resolve against Silva UI's theme contract, so values such as
 * `primary`, `violet9`, and `background` automatically follow a nested Theme.
 * Any valid CSS colour is also accepted for one-off brand work.
 */
export interface Gradient {
  /** First gradient stop. */
  from: GradientColor;
  /** Final gradient stop. */
  to: GradientColor;
  /** Optional middle stop. */
  via?: GradientColor;
  /** CSS gradient function. Defaults to `linear`. */
  type?: 'linear' | 'radial' | 'conic';
  /** Direction in degrees for linear and conic gradients. Defaults to 90. */
  deg?: number;
}

function resolveColor(color: GradientColor): string {
  return themeColors[color as keyof typeof themeColors] ?? color;
}

/** Creates a CSS `background-image` value from a theme-aware gradient. */
export function gradientToCss({
  from,
  to,
  via,
  type = 'linear',
  deg = 90,
}: Gradient): string {
  const stops = [resolveColor(from), via && resolveColor(via), resolveColor(to)]
    .filter(Boolean)
    .join(', ');

  if (type === 'radial') return `radial-gradient(${stops})`;
  if (type === 'conic') return `conic-gradient(from ${deg}deg, ${stops})`;
  return `linear-gradient(${deg}deg, ${stops})`;
}
