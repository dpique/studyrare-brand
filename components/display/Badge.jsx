import React from 'react';

const CSS = `
.sr-badge {
  display: inline-flex; align-items: center; gap: 5px; box-sizing: border-box;
  height: 22px; padding: 0 10px;
  font-family: var(--font-body); font-weight: var(--fw-bold);
  font-size: var(--text-2xs); letter-spacing: .01em;
  border-radius: var(--radius-pill); border: 1px solid transparent;
  white-space: nowrap; line-height: 1;
}
.sr-badge--lg { height: 26px; font-size: var(--text-xs); padding: 0 12px; }
.sr-badge__dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

.sr-badge--neutral   { background: var(--ink-100);     color: var(--ink-700); }
.sr-badge--brand     { background: var(--periwinkle-100); color: var(--periwinkle-700); }
.sr-badge--accent    { background: var(--amber-100);   color: var(--amber-700); }
.sr-badge--correct   { background: var(--success-50);  color: var(--success-700); border-color: var(--success-100); }
.sr-badge--incorrect { background: var(--danger-50);   color: var(--danger-700); border-color: var(--danger-100); }
.sr-badge--info      { background: var(--info-50);     color: var(--info-600); }

.sr-badge--solid.sr-badge--brand     { background: var(--periwinkle-500); color: #fff; }
.sr-badge--solid.sr-badge--accent    { background: var(--amber-400); color: var(--ink-900); }
.sr-badge--solid.sr-badge--correct   { background: var(--success-500); color: #fff; }
.sr-badge--solid.sr-badge--incorrect { background: var(--danger-500); color: #fff; }
.sr-badge--solid.sr-badge--neutral   { background: var(--ink-700); color: #fff; }
`;

let injected = false;
function ensureStyles() {
  if (injected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.setAttribute('data-sr-badge', '');
  el.textContent = CSS;
  document.head.appendChild(el);
  injected = true;
}

export function Badge({
  variant = 'neutral',
  size = 'md',
  solid = false,
  dot = false,
  className = '',
  children,
  ...rest
}) {
  ensureStyles();
  const cls = [
    'sr-badge',
    `sr-badge--${variant}`,
    solid ? 'sr-badge--solid' : '',
    size === 'lg' ? 'sr-badge--lg' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <span className={cls} {...rest}>
      {dot && <span className="sr-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
