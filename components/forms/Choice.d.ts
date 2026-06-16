import * as React from 'react';

export type ChoiceState = 'default' | 'correct' | 'incorrect';

/**
 * Board-style multiple-choice answer option — the signature StudyRare control.
 * Before grading, pass `selected` to show the chosen option. After the learner
 * submits, set `graded` and give each option a `state` of "correct"/"incorrect"
 * to reveal the answer key with check / cross marks.
 *
 * @startingPoint section="Question bank" subtitle="A/B/C/D answer option with graded states" viewport="700x300"
 */
export interface ChoiceProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Option key shown in the leading circle, e.g. "A". */
  letter: React.ReactNode;
  /** Graded outcome for this option. @default "default" */
  state?: ChoiceState;
  /** Learner's current selection (pre-submit highlight). */
  selected?: boolean;
  /** Lock interaction and reveal correct/incorrect styling. */
  graded?: boolean;
  /** The answer text. */
  children: React.ReactNode;
}

export function Choice(props: ChoiceProps): JSX.Element;
