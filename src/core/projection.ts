/**
 * A semantic size token calibrated at a 1000px-wide viewport.
 *
 * `$24` resolves to `24px` at 1000px, `12px` at 500px, and `48px` at
 * 2000px. The value stays linear rather than stepping between breakpoints.
 */
export type ProjectionToken = `$${number}`;

const projectionTokenPattern = /^\$(?:0|[1-9]\d*)(?:\.\d+)?$/;

/** True when a value is a valid non-negative projection token such as `$24`. */
export function isProjectionToken(value: unknown): value is ProjectionToken {
  return typeof value === 'string' && projectionTokenPattern.test(value);
}

/**
 * Resolves `$n` to a viewport-relative CSS value.
 *
 * `n` is the token's pixel size at the 1000px reference viewport. Since one
 * viewport-width unit is 10px there, `$n` is equivalently `(n / 10)vw`.
 */
export function projectionTokenToCss(token: ProjectionToken): string {
  const referencePixels = Number(token.slice(1));
  return `${referencePixels / 10}vw`;
}
