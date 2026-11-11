import { cloneElement, isValidElement } from 'hono/jsx';
import type { Child } from 'hono/jsx';

/**
 * Applies props to selected compound children while preserving explicit props
 * supplied by the consumer. Fragments and nested arrays are traversed too.
 */
export function injectCompoundProps(
  children: Child,
  matches: (tag: unknown) => boolean,
  resolveProps: (props: Record<string, unknown>) => Record<string, unknown>,
): Child {
  if (Array.isArray(children)) {
    return children.map((child) => injectCompoundProps(child, matches, resolveProps));
  }

  if (!isValidElement(children)) return children;

  const nestedChildren = injectCompoundProps(children.props.children, matches, resolveProps);
  const nestedProps = nestedChildren === children.props.children
    ? children.props
    : { ...children.props, children: nestedChildren };
  const props = matches(children.tag)
    ? { ...nestedProps, ...resolveProps(nestedProps) }
    : nestedProps;

  return cloneElement(children, props);
}
