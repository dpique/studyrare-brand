import React from 'react';

const CSS = `
.sr-card {
  box-sizing: border-box; background: var(--surface-card);
  border: 1px solid var(--border-subtle); border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--dur-normal) var(--ease-standard),
              transform var(--dur-normal) var(--ease-standard),
              border-color var(--dur-normal) var(--ease-standard);
}
.sr-card--pad { padding: var(--space-6); }
.sr-card--pad-sm { padding: var(--space-4); }
.sr-card--pad-lg { padding: var(--space-8); }
.sr-card--interactive { cursor: pointer; }
.sr-card--interactive:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); border-color: var(--periwinkle-200); }
.sr-card--flat { box-shadow: none; }
.sr-card--raised { box-shadow: var(--shadow-md); }
.sr-card--brand { background: var(--periwinkle-500); border-color: var(--periwinkle-600); color: #fff; }
.sr-card--navy { background: var(--navy); border-color: var(--ink-900); color: #fff; }
.sr-card--accent { background: var(--amber-50); border-color: var(--amber-200); }
.sr-card--outline { box-shadow: none; border-color: var(--border-default); }
`;

let injected = false;
function ensureStyles() {
  if (injected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.setAttribute('data-sr-card', '');
  el.textContent = CSS;
  document.head.appendChild(el);
  injected = true;
}

const PAD = { none: '', sm: 'sr-card--pad-sm', md: 'sr-card--pad', lg: 'sr-card--pad-lg' };

export function Card({
  variant = 'default',
  padding = 'md',
  interactive = false,
  elevation,
  className = '',
  children,
  ...rest
}) {
  ensureStyles();
  const cls = [
    'sr-card',
    PAD[padding] || PAD.md,
    interactive ? 'sr-card--interactive' : '',
    variant !== 'default' ? `sr-card--${variant}` : '',
    elevation === 'flat' ? 'sr-card--flat' : elevation === 'raised' ? 'sr-card--raised' : '',
    className,
  ].filter(Boolean).join(' ');
  return <div className={cls} {...rest}>{children}</div>;
}
