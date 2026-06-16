import * as React from 'react';

/**
 * Labelled text input with hint and error states. Use for search, sign-in,
 * and short free-text answers.
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Field label rendered above the control. */
  label?: React.ReactNode;
  /** Helper text below the field. */
  hint?: React.ReactNode;
  /** Error message — turns the border red and replaces the hint. */
  error?: React.ReactNode;
  /** Show a required asterisk. */
  required?: boolean;
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Leading icon node (e.g. a search glyph). */
  leftIcon?: React.ReactNode;
}

export function Input(props: InputProps): JSX.Element;
