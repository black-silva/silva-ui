import { Heading } from './Heading';
import type { HeadingProps } from './Heading';

/** Shorthand props for H1–H6 (level is fixed, not accepted). */
export type HProps = Omit<HeadingProps, 'level'>;

/** Renders an `<h1>` heading. */
export function H1(props: HProps) {
  return <Heading level={1} {...props} />;
}

/** Renders an `<h2>` heading. */
export function H2(props: HProps) {
  return <Heading level={2} {...props} />;
}

/** Renders an `<h3>` heading. */
export function H3(props: HProps) {
  return <Heading level={3} {...props} />;
}

/** Renders an `<h4>` heading. */
export function H4(props: HProps) {
  return <Heading level={4} {...props} />;
}

/** Renders an `<h5>` heading. */
export function H5(props: HProps) {
  return <Heading level={5} {...props} />;
}

/** Renders an `<h6>` heading. */
export function H6(props: HProps) {
  return <Heading level={6} {...props} />;
}
