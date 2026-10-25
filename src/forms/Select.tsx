import { useEffect, useState } from 'hono/jsx/dom';
import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './select.css';
import type { BaseProps, ComponentSize } from '../core/types';

export interface SelectProps extends BaseProps {
  size?: 'sm' | 'md' | 'lg' | ComponentSize;
  disabled?: boolean;
  name?: string;
  value?: string | number;
  defaultValue?: string | number;
  id?: string;
  onChange?: (e: Event) => void;
  [key: string]: any;
}

type SelectOption = {
  value: string;
  label: string;
  disabled: boolean;
};

function getOptionChildren(children: any): Array<{ value: string; label: string; disabled: boolean }> {
  const result: Array<{ value: string; label: string; disabled: boolean }> = [];
  const visit = (child: any) => {
    if (Array.isArray(child)) {
      child.forEach(visit);
      return;
    }
    if (!child || typeof child !== 'object') return;
    if (child.type === 'option' || child.tag === 'option') {
      const props = child.props ?? {};
      const label = Array.isArray(props.children)
        ? props.children.filter((part: any) => typeof part === 'string').join('')
        : String(props.children ?? props.value ?? '');
      result.push({
        value: String(props.value ?? ''),
        label,
        disabled: props.disabled === true || props.disabled === '',
      });
      return;
    }
    if (child.props?.children) visit(child.props.children);
  };
  visit(children);
  return result;
}

let selectId = 0;

export function Select({
  size = 'md',
  disabled = false,
  class: extraClass,
  children,
  value,
  defaultValue,
  onChange,
  name,
  id,
  ...rest
}: SelectProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);
  const resolvedSize = (size === 'xs' ? 'sm' : size === 'xl' ? 'lg' : size) as 'sm' | 'md' | 'lg';
  const selectIdValue = id ?? `silva-select-${++selectId}`;
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [selectedValue, setSelectedValue] = useState(String(value ?? defaultValue ?? ''));
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    const nativeSelect = document.getElementById(selectIdValue) as HTMLSelectElement | null;
    if (!nativeSelect) return;

    const childOptions = getOptionChildren(children);
    const nextOptions = [...nativeSelect.options].map((option) => ({
      value: option.value,
      label: option.textContent ?? option.value,
      disabled: option.disabled || childOptions.find((childOption) => childOption.value === option.value)?.disabled === true,
    }));
    nextOptions.forEach((option, index) => {
      if (nativeSelect.options[index]) nativeSelect.options[index].disabled = option.disabled;
    });
    setOptions(nextOptions);
    if (value === undefined) {
      setSelectedValue(nativeSelect.value);
    }
  }, [children, selectIdValue, value]);

  useEffect(() => {
    if (value !== undefined) setSelectedValue(String(value));
  }, [value]);

  useEffect(() => {
    if (!open) return;

    const closeOnOutsidePointerDown = (event: PointerEvent) => {
      const root = document.getElementById(`${selectIdValue}-root`);
      if (root && !event.composedPath().includes(root)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('pointerdown', closeOnOutsidePointerDown, true);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('pointerdown', closeOnOutsidePointerDown, true);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [open, selectIdValue]);

  const selectedOption = options.find((option) => option.value === selectedValue);
  const findEnabledIndex = (startIndex: number, direction: 1 | -1) => {
    let index = startIndex;
    while (index >= 0 && index < options.length) {
      if (!options[index].disabled) return index;
      index += direction;
    }
    return Math.max(0, Math.min(options.length - 1, startIndex));
  };
  const selectOption = (option: SelectOption) => {
    if (option.disabled) return;
    setSelectedValue(option.value);
    setOpen(false);
    const nativeSelect = document.getElementById(selectIdValue) as HTMLSelectElement | null;
    if (!nativeSelect) return;
    nativeSelect.value = option.value;
    const event = new Event('change', { bubbles: true });
    nativeSelect.dispatchEvent(event);
    onChange?.(event);
  };

  const handleTriggerKeyDown = (event: KeyboardEvent) => {
    if (disabled) return;
    if (open && event.key === 'Enter') {
      event.preventDefault();
      const option = options[highlightedIndex];
      if (option) selectOption(option);
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
      const currentIndex = Math.max(0, options.findIndex((option) => option.value === selectedValue));
      const nextIndex = event.key === 'ArrowDown' ? currentIndex + 1 : currentIndex - 1;
      setHighlightedIndex(findEnabledIndex(
        Math.max(0, Math.min(options.length - 1, nextIndex)),
        event.key === 'ArrowDown' ? 1 : -1,
      ));
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setOpen(!open);
    }
  };

  return (
    <div id={`${selectIdValue}-root`} class={cls(styles.wrapper, toSprinklesClass(sprinklesProps), extraClass)}>
      <select
        {...htmlProps}
        id={selectIdValue}
        name={name}
        value={selectedValue}
        disabled={disabled || undefined}
        onChange={onChange}
        class={styles.native}
        aria-hidden="true"
        tabIndex={-1}
      >
        {children}
      </select>
      <button
        type="button"
        class={cls(styles.trigger, styles.triggerSizeVariant[resolvedSize])}
        aria-controls={`${selectIdValue}-options`}
        aria-expanded={open}
        aria-haspopup="listbox"
        data-disabled={disabled ? 'true' : 'false'}
        disabled={disabled}
        onClick={() => setOpen(!open)}
        onKeyDown={handleTriggerKeyDown}
      >
        <span>{selectedOption?.label ?? ''}</span>
        <span class={styles.icon} aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      {open && (
        <>
          <div class={styles.outsideClickLayer} aria-hidden="true" onClick={() => setOpen(false)} />
          <div id={`${selectIdValue}-options`} class={styles.panel} role="listbox">
            {options.map((option, index) => (
              <button
                type="button"
                class={styles.option}
                role="option"
                aria-selected={option.value === selectedValue}
                data-selected={option.value === selectedValue ? 'true' : 'false'}
                data-highlighted={index === highlightedIndex ? 'true' : 'false'}
                data-disabled={option.disabled ? 'true' : 'false'}
                aria-disabled={option.disabled ? 'true' : 'false'}
                disabled={option.disabled}
                onMouseEnter={() => {
                  if (!option.disabled) setHighlightedIndex(index);
                }}
                onClick={() => selectOption(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
