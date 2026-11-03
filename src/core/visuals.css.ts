import { style, styleVariants, keyframes } from '@vanilla-extract/css';
import { tokens } from './sprinkles.css';
import { gradients } from './gradients';

export { gradients } from './gradients';
export type { GradientName } from './gradients';

export const gradientBackground = styleVariants(gradients, (background) => ({
  background,
}));

export const gradientText = styleVariants(gradients, (background) => ({
  background,
  backgroundClip: 'text',
  color: 'transparent',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const slideUp = keyframes({
  from: { opacity: 0, transform: 'translateY(16px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const pulse = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.55 },
});

export const animations = {
  fadeIn: `${fadeIn} 260ms ease-out both`,
  slideUp: `${slideUp} 360ms cubic-bezier(0.16, 1, 0.3, 1) both`,
  pulse: `${pulse} 1.6s ease-in-out infinite`,
} as const;

export type AnimationName = keyof typeof animations;

export const animationClass = styleVariants(animations, (animation) => ({
  animation,
}));

export const visualFocusRing = style({
  outline: `2px solid ${tokens.colors.ring}`,
  outlineOffset: '3px',
});
