import React from 'react';

const CSS = `
.sr-stat {
  display: flex; flex-direction: column; gap: 4px;
  font-family: var(--font-body);
}
.sr-stat__label {
  font-size: var(--text-xs); font-weight: var(--fw-semibold);
  color: var(--text-muted); letter-spacing: .01em;
}
.sr-stat__value {
  font-family: var(--font-display); font-weight: var(--fw-extra);
  font-size: var(--text-3xl); line-height: 1; color: var(--text-strong);
  letter-spacing: var(--tracking-tight); display: flex; align-items: baseline; gap: 6px;
}
.sr-stat__suffix { font-size: var(--text-lg); font-weight: var(--fw-bold); color: var(--text-muted); }
.sr-stat__delta { display: inline-flex; align-items: center; gap: 3px; font-size: var(--text-xs); font-weight: var(--fw-bold); }
.sr-stat__delta--up { color: var(--success-600); }
.sr-stat__delta--down { color: var(--danger-600); }
.sr-stat__delta svg { width: 13px; height: 13px; }
.sr-stat--accent .sr-stat__value { color: var(--periwinkle-700); }
`;

let injected = false;
function ensureStyles() {
  if (injected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.setAttribute('data-sr-stat', '');
  el.textContent = CSS;
  document.head.appendChild(el);
  injected = true;
}

export function Stat({
  label,
  value,
  suffix,
  delta,
  accent = false,
  className = '',
  ...rest
}) {
  ensureStyles();
  const cls = ['sr-stat', accent ? 'sr-stat--accent' : '', className].filter(Boolean).join(' ');
  const dir = typeof delta === 'number' ? (delta >= 0 ? 'up' : 'down') : null;
  return (
    <div className={cls} {...rest}>
      <span className="sr-stat__label">{label}</span>
      <span className="sr-stat__value">
        {value}
        {suffix && <span className="sr-stat__suffix">{suffix}</span>}
        {dir && (
          <span className={`sr-stat__delta sr-stat__delta--${dir}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              {dir === 'up' ? <path d="M7 14l5-5 5 5"/> : <path d="M7 10l5 5 5-5"/>}
            </svg>
            {Math.abs(delta)}%
          </span>
        )}
      </span>
    </div>
  );
}
