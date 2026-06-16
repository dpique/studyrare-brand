import React from 'react';

const CSS = `
.sr-tag {
  display: inline-flex; align-items: center; gap: 6px; box-sizing: border-box;
  height: 28px; padding: 0 12px;
  font-family: var(--font-body); font-weight: var(--fw-semibold);
  font-size: var(--text-xs); color: var(--ink-700);
  background: var(--surface-card); border: 1.5px solid var(--border-default);
  border-radius: var(--radius-pill); white-space: nowrap; line-height: 1;
  transition: border-color var(--dur-fast) var(--ease-standard),
              background var(--dur-fast) var(--ease-standard),
              color var(--dur-fast) var(--ease-standard);
}
.sr-tag--clickable { cursor: pointer; }
.sr-tag--clickable:hover { border-color: var(--periwinkle-400); color: var(--periwinkle-700); }
.sr-tag--selected { background: var(--periwinkle-500); border-color: var(--periwinkle-500); color: #fff; }
.sr-tag__dot { width: 8px; height: 8px; border-radius: 50%; flex: none; }
.sr-tag__x {
  display: inline-flex; align-items: center; justify-content: center;
  width: 16px; height: 16px; margin-right: -4px; border-radius: 50%;
  border: none; background: transparent; color: inherit; cursor: pointer; opacity: .6;
}
.sr-tag__x:hover { opacity: 1; background: rgba(0,0,0,.08); }
.sr-tag__x svg { width: 12px; height: 12px; }
`;

let injected = false;
function ensureStyles() {
  if (injected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.setAttribute('data-sr-tag', '');
  el.textContent = CSS;
  document.head.appendChild(el);
  injected = true;
}

export function Tag({
  color,
  selected = false,
  onRemove,
  onClick,
  className = '',
  children,
  ...rest
}) {
  ensureStyles();
  const clickable = !!onClick;
  const cls = [
    'sr-tag',
    clickable ? 'sr-tag--clickable' : '',
    selected ? 'sr-tag--selected' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <span className={cls} onClick={onClick} {...rest}>
      {color && <span className="sr-tag__dot" style={{ background: color }} aria-hidden="true" />}
      {children}
      {onRemove && (
        <button
          type="button"
          className="sr-tag__x"
          aria-label="Remove"
          onClick={(e) => { e.stopPropagation(); onRemove(e); }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      )}
    </span>
  );
}
