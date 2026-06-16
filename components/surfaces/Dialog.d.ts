import * as React from 'react';

/**
 * Modal dialog with overlay, title, body and footer slot. Use for confirmations
 * (end session, submit exam) and short forms. Controlled via `open`.
 */
export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the dialog is visible. @default true */
  open?: boolean;
  /** Called on overlay click and close-button press. */
  onClose?: () => void;
  /** Heading text. */
  title?: React.ReactNode;
  /** Sub-heading description. */
  description?: React.ReactNode;
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Footer node — typically the action buttons. */
  footer?: React.ReactNode;
  /** Body content. */
  children?: React.ReactNode;
}

export function Dialog(props: DialogProps): JSX.Element;
