import * as React from 'react';

/**
 * Custom radio button. Use grouped (shared `name`) for single-select settings
 * such as study mode. For board-style answer choices use the `Choice` component.
 */
export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Inline label text. */
  label?: React.ReactNode;
  /** Secondary description below the label. */
  description?: React.ReactNode;
}

export function Radio(props: RadioProps): JSX.Element;
