import * as React from 'react';

/**
 * Hover/focus tooltip on the navy surface. Wrap any trigger element; the
 * tip shows on hover and keyboard focus.
 */
export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Tooltip content. */
  content: React.ReactNode;
  /** @default "top" */
  placement?: 'top' | 'bottom';
  /** The trigger element. */
  children: React.ReactNode;
}

export function Tooltip(props: TooltipProps): JSX.Element;
