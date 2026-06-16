import React from 'react';

const CSS = `
.sr-toast {
  display: flex; align-items: flex-start; gap: var(--space-3); box-sizing: border-box;
  min-width: 280px; max-width: 420px; padding: var(--space-4);
  font-family: var(--font-body); background: var(--surface-card);
  border: 1px solid var(--border-subtle); border-left: 4px solid var(--periwinkle-500);
  border-radius: var(--radius-lg); box-shadow: var(--shadow-lg);
}
.sr-toast__icon { flex: none; width: 22px; height: 22px; display: flex; color: var(--periwinkle-600); }
.sr-toast__icon svg { width: 22px; height: 22px; }
.sr-toast__body { flex: 1; }
.sr-toast__title { font-size: var(--text-sm); font-weight: var(--fw-bold); color: var(--text-strong); }
.sr-toast__msg { font-size: var(--text-sm); color: var(--text-muted); margin-top: 2px; line-height: 1.4; }
.sr-toast__close {
  flex: none; border: none; background: transparent; color: var(--text-subtle); cursor: pointer;
  width: 22px; height: 22px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center;
}
.sr-toast__close:hover { background: var(--surface-sunken); color: var(--text-body); }
.sr-toast__close svg { width: 15px; height: 15px; }

.sr-toast--correct { border-left-color: var(--success-500); }
.sr-toast--correct .sr-toast__icon { color: var(--success-600); }
.sr-toast--incorrect { border-left-color: var(--danger-500); }
.sr-toast--incorrect .sr-toast__icon { color: var(--danger-600); }
.sr-toast--accent { border-left-color: var(--amber-400); }
.sr-toast--accent .sr-toast__icon { color: var(--amber-600); }
`;

let injected = false;
function ensureStyles() {
  if (injected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.setAttribute('data-sr-toast', '');
  el.textContent = CSS;
  document.head.appendChild(el);
  injected = true;
}

const ICONS = {
  info: <path d="M12 16v-4M12 8h.01M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"/>,
  correct: <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3"/>,
  incorrect: <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM15 9l-6 6M9 9l6 6"/>,
  accent: <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/>,
};

export function Toast({
  variant = 'info',
  title,
  children,
  onClose,
  className = '',
  ...rest
}) {
  ensureStyles();
  const icon = ICONS[variant] || ICONS.info;
  return (
    <div className={['sr-toast', variant !== 'info' ? `sr-toast--${variant}` : '', className].filter(Boolean).join(' ')} role="status" {...rest}>
      <span className="sr-toast__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
      </span>
      <div className="sr-toast__body">
        {title && <div className="sr-toast__title">{title}</div>}
        {children && <div className="sr-toast__msg">{children}</div>}
      </div>
      {onClose && (
        <button className="sr-toast__close" aria-label="Dismiss" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      )}
    </div>
  );
}
