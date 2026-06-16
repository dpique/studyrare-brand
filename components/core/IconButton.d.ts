import * as React from 'react';

export type IconButtonVariant = 'ghost' | 'solid' | 'outline' | 'flag';
export type IconButtonSize = 'sm' | 'md' | 'lg';

/**
 * Square icon-only button for toolbars and dense controls (flag question,
 * settings, navigation). Always pass an accessible `label`.
 */
export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'aria-pressed'> {
  /** @default "ghost" */
  variant?: IconButtonVariant;
  /** @default "md" */
  size?: IconButtonSize;
  /** Accessible label (also used as the tooltip title). Required. */
  label: string;
  /** Toggle state — renders a pressed/active background. */
  pressed?: boolean;
  /** The icon node (e.g. a Lucide SVG). */
  children: React.ReactNode;
}

export function IconButton(props: IconButtonProps): JSX.Element;
