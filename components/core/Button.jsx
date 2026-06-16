import React from 'react';

const CSS = `
.sr-btn {
  --_h: var(--control-h-md);
  display: inline-flex; align-items: center; justify-content: center;
  gap: var(--space-2); box-sizing: border-box;
  height: var(--_h); padding: 0 var(--space-5);
  font-family: var(--font-display); font-weight: var(--fw-bold);
  font-size: var(--text-sm); line-height: 1; letter-spacing: var(--tracking-snug);
  border-radius: var(--radius-pill); border: 1.5px solid transparent;
  cursor: pointer; white-space: nowrap; text-decoration: none;
  transition: background var(--dur-fast) var(--ease-standard),
              color var(--dur-fast) var(--ease-standard),
              border-color var(--dur-fast) var(--ease-standard),
              box-shadow var(--dur-fast) var(--ease-standard),
              transform var(--dur-fast) var(--ease-standard);
  user-select: none;
}
.sr-btn:focus-visible { outline: none; box-shadow: var(--ring); }
.sr-btn:active { transform: translateY(1px); }
.sr-btn[disabled], .sr-btn[aria-disabled="true"] { opacity: .5; cursor: not-allowed; transform: none; box-shadow: none; }

.sr-btn--sm { --_h: var(--control-h-sm); padding: 0 var(--space-4); font-size: var(--text-xs); }
.sr-btn--lg { --_h: var(--control-h-lg); padding: 0 var(--space-6); font-size: var(--text-base); }
.sr-btn--block { display: flex; width: 100%; }

.sr-btn--primary { background: var(--periwinkle-500); color: #fff; box-shadow: var(--shadow-brand); }
.sr-btn--primary:hover { background: var(--periwinkle-600); }
.sr-btn--primary:active { background: var(--periwinkle-700); }

.sr-btn--accent { background: var(--amber-400); color: var(--ink-900); box-shadow: var(--shadow-accent); }
.sr-btn--accent:hover { background: var(--amber-500); }
.sr-btn--accent:active { background: var(--amber-600); }

.sr-btn--secondary { background: var(--surface-card); color: var(--text-strong); border-color: var(--border-default); }
.sr-btn--secondary:hover { border-color: var(--periwinkle-400); color: var(--periwinkle-700); background: var(--periwinkle-50); }

.sr-btn--ghost { background: transparent; color: var(--periwinkle-700); }
.sr-btn--ghost:hover { background: var(--periwinkle-50); }

.sr-btn--danger { background: var(--danger-500); color: #fff; }
.sr-btn--danger:hover { background: var(--danger-600); }

.sr-btn__spin { width: 1em; height: 1em; border-radius: 50%; border: 2px solid currentColor; border-right-color: transparent; animation: sr-btn-spin .6s linear infinite; }
@keyframes sr-btn-spin { to { transform: rotate(360deg); } }
`;

let injected = false;
function ensureStyles() {
  if (injected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.setAttribute('data-sr-button', '');
  el.textContent = CSS;
  document.head.appendChild(el);
  injected = true;
}

export function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  loading = false,
  disabled = false,
  leftIcon = null,
  rightIcon = null,
  as = 'button',
  className = '',
  children,
  ...rest
}) {
  ensureStyles();
  const Tag = as;
  const cls = [
    'sr-btn',
    `sr-btn--${variant}`,
    size !== 'md' ? `sr-btn--${size}` : '',
    block ? 'sr-btn--block' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Tag
      className={cls}
      disabled={Tag === 'button' ? (disabled || loading) : undefined}
      aria-disabled={disabled || loading || undefined}
      {...rest}
    >
      {loading && <span className="sr-btn__spin" aria-hidden="true" />}
      {!loading && leftIcon}
      {children}
      {!loading && rightIcon}
    </Tag>
  );
}
