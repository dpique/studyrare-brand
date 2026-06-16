import * as React from 'react';

export interface TabItem {
  value: string;
  label: React.ReactNode;
  /** Optional count shown after the label. */
  count?: number;
}

/**
 * Tab switcher (controlled). Use `line` style for page-level navigation and
 * `pill` style for compact in-card view switches (All / Flagged / Incorrect).
 */
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Tabs as strings or {value,label,count}. */
  items: (string | TabItem)[];
  /** Currently selected value. */
  value: string;
  /** Called with the new value on tab click. */
  onChange?: (value: string) => void;
  /** @default "line" */
  variant?: 'line' | 'pill';
}

export function Tabs(props: TabsProps): JSX.Element;
