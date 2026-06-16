import * as React from 'react';

/**
 * Toggle switch for binary on/off settings — timer visibility, dark mode,
 * email reminders.
 */
export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Inline label text. */
  label?: React.ReactNode;
}

export function Switch(props: SwitchProps): JSX.Element;
