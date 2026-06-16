import * as React from 'react';

/**
 * Big-number metric for dashboards — questions answered, accuracy, streak.
 * Pairs a Nunito-extrabold value with a label and an optional trend delta.
 */
export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Caption above/below the number. */
  label: React.ReactNode;
  /** The headline value (number or formatted string). */
  value: React.ReactNode;
  /** Unit shown smaller after the value, e.g. "%". */
  suffix?: React.ReactNode;
  /** Signed percentage change — renders a colored up/down trend. */
  delta?: number;
  /** Tint the value periwinkle. */
  accent?: boolean;
}

export function Stat(props: StatProps): JSX.Element;
