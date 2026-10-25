import { cls, splitSprinklesProps, toSprinklesClass } from '../core/utils';
import * as styles from './slider.css';
import type { BaseProps, ComponentSize } from '../core/types';

export interface SliderProps extends BaseProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  disabled?: boolean;
  name?: string;
  id?: string;
  size?: 'sm' | 'md' | 'lg' | ComponentSize;
  onChange?: (e: Event) => void;
  onInput?: (e: Event) => void;
  [key: string]: any;
}

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  disabled = false,
  size = 'md',
  name,
  id,
  class: extraClass,
  ...rest
}: SliderProps) {
  const { sprinklesProps, rest: htmlProps } = splitSprinklesProps(rest);

  const resolvedSize = (size === 'xs' ? 'sm' : size === 'xl' ? 'lg' : size) as 'sm' | 'md' | 'lg';
  const sizeClass = styles.sizeVariant[resolvedSize] || styles.sizeVariant.md;

  return (
    <div class={cls(styles.root, toSprinklesClass(sprinklesProps), extraClass)}>
      <input
        {...htmlProps}
        type="range"
        id={id}
        name={name}
        min={min}
        max={max}
        step={step}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled || undefined}
        class={cls(styles.input, sizeClass)}
      />
    </div>
  );
}

