import React from 'react';

const CSS = `
.sr-choice {
  display: flex; align-items: flex-start; gap: var(--space-3); box-sizing: border-box;
  width: 100%; text-align: left; padding: var(--space-4); cursor: pointer;
  font-family: var(--font-body); background: var(--surface-card);
  border: 1.5px solid var(--border-default); border-radius: var(--radius-lg);
  transition: border-color var(--dur-fast) var(--ease-standard),
              background var(--dur-fast) var(--ease-standard),
              box-shadow var(--dur-fast) var(--ease-standard);
}
.sr-choice:hover { border-color: var(--periwinkle-400); background: var(--periwinkle-50); }
.sr-choice:focus-visible { outline: none; box-shadow: var(--ring); }
.sr-choice__key {
  flex: none; width: 28px; height: 28px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display); font-weight: var(--fw-bold); font-size: var(--text-sm);
  background: var(--ink-100); color: var(--ink-700);
  border: 1.5px solid transparent;
  transition: background var(--dur-fast), color var(--dur-fast), border-color var(--dur-fast);
}
.sr-choice__body { flex: 1; font-size: var(--text-base); line-height: var(--leading-snug); color: var(--text-body); padding-top: 3px; }
.sr-choice__mark { flex: none; margin-top: 3px; opacity: 0; transition: opacity var(--dur-fast); display: flex; }
.sr-choice__mark svg { width: 20px; height: 20px; }

/* selected (pre-submit) */
.sr-choice--selected { border-color: var(--periwinkle-500); background: var(--periwinkle-50); }
.sr-choice--selected .sr-choice__key { background: var(--periwinkle-500); color: #fff; }

/* graded states */
.sr-choice--correct { border-color: var(--success-500); background: var(--success-50); }
.sr-choice--correct .sr-choice__key { background: var(--success-500); color: #fff; }
.sr-choice--correct .sr-choice__mark { opacity: 1; color: var(--success-600); }
.sr-choice--incorrect { border-color: var(--danger-500); background: var(--danger-50); }
.sr-choice--incorrect .sr-choice__key { background: var(--danger-500); color: #fff; }
.sr-choice--incorrect .sr-choice__mark { opacity: 1; color: var(--danger-600); }

.sr-choice--graded { cursor: default; }
.sr-choice--graded:hover { background: var(--surface-card); border-color: var(--border-default); }
.sr-choice--correct:hover { background: var(--success-50); border-color: var(--success-500); }
.sr-choice--incorrect:hover { background: var(--danger-50); border-color: var(--danger-500); }
.sr-choice--muted { opacity: .6; }
`;

let injected = false;
function ensureStyles() {
  if (injected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.setAttribute('data-sr-choice', '');
  el.textContent = CSS;
  document.head.appendChild(el);
  injected = true;
}

const CHECK = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>;
const CROSS = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>;

export function Choice({
  letter,
  state = 'default',
  selected = false,
  graded = false,
  className = '',
  children,
  ...rest
}) {
  ensureStyles();
  const isCorrect = state === 'correct';
  const isIncorrect = state === 'incorrect';
  // a graded, unselected, non-answer option is muted
  const muted = graded && !isCorrect && !isIncorrect && !selected;
  const cls = [
    'sr-choice',
    selected && !graded ? 'sr-choice--selected' : '',
    isCorrect ? 'sr-choice--correct' : '',
    isIncorrect ? 'sr-choice--incorrect' : '',
    graded ? 'sr-choice--graded' : '',
    muted ? 'sr-choice--muted' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <button type="button" className={cls} aria-pressed={selected} disabled={graded} {...rest}>
      <span className="sr-choice__key">{letter}</span>
      <span className="sr-choice__body">{children}</span>
      <span className="sr-choice__mark">{isCorrect ? CHECK : isIncorrect ? CROSS : null}</span>
    </button>
  );
}
