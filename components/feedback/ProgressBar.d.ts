import * as React from 'react';

export interface ProgressSegment {
  value: number;
  variant?: 'brand' | 'accent' | 'correct' | 'incorrect';
  color?: string;
}

/**
 * Progress / completion bar. Single-fill for course and domain progress, or
 * pass `segments` for a stacked breakdown (correct / incorrect / unanswered).
 */
export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current value (0–max). */
  value?: number;
  /** @default 100 */
  max?: number;
  /** Fill color for single-value mode. @default "brand" */
  variant?: 'brand' | 'accent' | 'correct' | 'incorrect';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Caption shown above the bar. */
  label?: React.ReactNode;
  /** Show the percentage on the right. */
  showValue?: boolean;
  /** Stacked segments — overrides single-value fill. */
  segments?: ProgressSegment[];
}

export function ProgressBar(props: ProgressBarProps): JSX.Element;
