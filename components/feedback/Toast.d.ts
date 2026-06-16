import * as React from 'react';

export type ToastVariant = 'info' | 'correct' | 'incorrect' | 'accent';

/**
 * Transient notification — answer feedback, saved confirmations, reminders.
 * Render inside a fixed-position stack; supply `onClose` for a dismiss button.
 */
export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "info" */
  variant?: ToastVariant;
  /** Bold title line. */
  title?: React.ReactNode;
  /** Supporting message. */
  children?: React.ReactNode;
  /** Show a close button and handle dismissal. */
  onClose?: () => void;
}

export function Toast(props: ToastProps): JSX.Element;
