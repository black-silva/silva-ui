import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './tabs.css';
import type { BaseProps } from '../core/types';

/* ================================================================== */
/*  Tabs (root container)                                              */
/* ================================================================== */

export interface TabsProps extends BaseProps {
  /** Currently active tab value. */
  value?: string;
}

/**
 * Tabs — root wrapper that provides the visual container.
 *
 * State management (which tab is active) is left to the consumer;
 * this is a zero-runtime, markup-only component. Wire `data-active`
 * and `hidden` attributes yourself, or use a tiny client-side script.
 *
 * @example
 * ```tsx
 * <Tabs>
 *   <TabList>
 *     <Tab data-active="true">One</Tab>
 *     <Tab>Two</Tab>
 *   </TabList>
 *   <TabPanel>Content for tab one</TabPanel>
 *   <TabPanel hidden>Content for tab two</TabPanel>
 * </Tabs>
 * ```
 */
export function Tabs({ class: extraClass, children, value, ...rest }: TabsProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(styles.tabsRoot, toSprinklesClass(sprinklesProps), extraClass);

  return (
    <div {...htmlProps} class={className} data-value={value}>
      {children}
    </div>
  );
}

/* ================================================================== */
/*  TabList (row of tab triggers)                                      */
/* ================================================================== */

export interface TabListProps extends BaseProps {
  'aria-label'?: string;
}

/**
 * TabList — horizontal strip that contains `<Tab>` elements.
 * Renders with `role="tablist"` for accessibility.
 */
export function TabList({ class: extraClass, children, ...rest }: TabListProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(styles.tabList, toSprinklesClass(sprinklesProps), extraClass);

  return (
    <div {...htmlProps} role="tablist" class={className}>
      {children}
    </div>
  );
}

/* ================================================================== */
/*  Tab (individual trigger button)                                    */
/* ================================================================== */

export interface TabProps extends BaseProps {
  /** Unique value identifying this tab. */
  value?: string;
  /** Whether this tab is currently selected. */
  'data-active'?: string | boolean;
  'aria-controls'?: string;
  'aria-selected'?: boolean;
  id?: string;
  onClick?: (e: Event) => void;
}

/**
 * Tab — a single tab trigger. Mark active via `data-active="true"`.
 * Renders as a `<button>` with `role="tab"`.
 */
export function Tab({
  class: extraClass,
  children,
  value,
  'data-active': active,
  ...rest
}: TabProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(styles.tab, toSprinklesClass(sprinklesProps), extraClass);
  const isActive = active === true || active === 'true';

  return (
    <button
      {...htmlProps}
      type="button"
      role="tab"
      data-active={String(isActive)}
      data-value={value}
      aria-selected={isActive}
      class={className}
    >
      {children}
    </button>
  );
}

/* ================================================================== */
/*  TabPanel (content area for a tab)                                  */
/* ================================================================== */

export interface TabPanelProps extends BaseProps {
  /** Unique value linking this panel to its Tab. */
  value?: string;
  hidden?: boolean;
  id?: string;
  'aria-labelledby'?: string;
}

/**
 * TabPanel — content region shown when its corresponding tab is active.
 * Use the `hidden` attribute to hide inactive panels.
 */
export function TabPanel({
  class: extraClass,
  children,
  value,
  hidden: isHidden,
  ...rest
}: TabPanelProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const className = cls(styles.tabPanel, toSprinklesClass(sprinklesProps), extraClass);

  return (
    <div
      {...htmlProps}
      role="tabpanel"
      data-value={value}
      hidden={isHidden || undefined}
      class={className}
    >
      {children}
    </div>
  );
}

