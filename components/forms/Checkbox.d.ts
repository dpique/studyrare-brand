import * as React from 'react';

/**
 * Custom checkbox with optional label and description. Use for settings and
 * multi-select filters (e.g. selecting domains for a custom question set).
 */
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Inline label text. */
  label?: React.ReactNode;
  /** Secondary description below the label. */
  description?: React.ReactNode;
}

export function Checkbox(props: CheckboxProps): JSX.Element;
