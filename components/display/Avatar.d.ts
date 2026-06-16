import * as React from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * User avatar — renders an image when `src` is given, otherwise initials
 * derived from `name`. Used for tutors, profile menus and testimonials.
 */
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Full name — used for initials and the title attribute. */
  name?: string;
  /** Image URL. Falls back to initials when omitted. */
  src?: string;
  /** @default "md" */
  size?: AvatarSize;
  /** Initials background tone. @default "brand" */
  tone?: 'brand' | 'amber' | 'navy';
  /** Show a periwinkle focus ring (e.g. active user). */
  ring?: boolean;
}

export function Avatar(props: AvatarProps): JSX.Element;
