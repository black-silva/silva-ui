import { style } from '@vanilla-extract/css';

// A fixed number of classes, independent of the number of CSS color names.
// Each value is supplied by the component as an element-local custom property.
const properties = ['color', 'backgroundColor', 'borderColor'] as const;
const conditions = ['default', 'hover', 'active', 'focus'] as const;
export type DynamicColorProperty = typeof properties[number];
export type DynamicColorCondition = typeof conditions[number];
const dynamicColorVariable = (property: DynamicColorProperty, condition: DynamicColorCondition) =>
  `--silva-dynamic-${property.replace(/[A-Z]/g, c => `-${c.toLowerCase()}`)}-${condition}`;

export const dynamicColorClasses = Object.fromEntries(properties.map(property => [property,
  Object.fromEntries(conditions.map(condition => {
    const declaration = { [property]: `var(${dynamicColorVariable(property, condition)})` };
    // Component variant CSS may be loaded after these classes. Match the
    // override precedence of a styling prop regardless of import order.
    const selector = condition === 'default' ? '&[class][class]'
      : condition === 'focus' ? '&[class][class]:focus-visible' : `&[class][class]:${condition}`;
    return [condition, style({ selectors: { [selector]: declaration } })];
  })),
])) as Record<DynamicColorProperty, Record<DynamicColorCondition, string>>;
