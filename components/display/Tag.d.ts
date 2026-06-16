import * as React from 'react';

/**
 * Outlined chip for content domains, topics and filters — "Cytogenetics",
 * "Metabolic", "Cancer". Clickable for filter toggles, removable in filter bars.
 */
export interface TagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onClick'> {
  /** Optional leading dot color (e.g. a domain's accent). */
  color?: string;
  /** Selected/active filter state (periwinkle fill). */
  selected?: boolean;
  /** Show a remove (×) button and handle its click. */
  onRemove?: (e: React.MouseEvent) => void;
  /** Makes the whole tag clickable (filter toggle). */
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}

export function Tag(props: TagProps): JSX.Element;
