import * as React from 'react';

export interface SelectOption { value: string; label: string; }

/**
 * Styled native select with a custom chevron. Use for filters such as
 * domain, difficulty, and question mode.
 */
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Field label rendered above the control. */
  label?: React.ReactNode;
  /** Options as strings or {value,label} objects. Ignored if children given. */
  options?: (string | SelectOption)[];
  /** @default "md" */
  size?: 'sm' | 'md';
  /** Provide <option> children instead of `options`. */
  children?: React.ReactNode;
}

export function Select(props: SelectProps): JSX.Element;
