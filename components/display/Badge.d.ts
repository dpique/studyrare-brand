import * as React from 'react';

export type BadgeVariant = 'neutral' | 'brand' | 'accent' | 'correct' | 'incorrect' | 'info';

/**
 * Small status pill for labels and states — answer outcomes, difficulty,
 * "New", domain counts. Use `solid` for high-emphasis status.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "neutral" */
  variant?: BadgeVariant;
  /** @default "md" */
  size?: 'md' | 'lg';
  /** Filled (high-emphasis) instead of soft tint. */
  solid?: boolean;
  /** Show a leading status dot. */
  dot?: boolean;
  children?: React.ReactNode;
}

export function Badge(props: BadgeProps): JSX.Element;
