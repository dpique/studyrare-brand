import * as React from 'react';

export type CardVariant = 'default' | 'brand' | 'navy' | 'accent' | 'outline';

/**
 * Rounded container surface — the building block for dashboards, question
 * cards, course tiles and explanation panels. Soft cool shadow, 20px radius.
 *
 * @startingPoint section="Surfaces" subtitle="Rounded card surface — 5 variants" viewport="700x240"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "default" */
  variant?: CardVariant;
  /** Inner padding. @default "md" */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Lift + shadow on hover, for clickable cards. */
  interactive?: boolean;
  /** Override the resting shadow. */
  elevation?: 'flat' | 'raised';
  children?: React.ReactNode;
}

export function Card(props: CardProps): JSX.Element;
