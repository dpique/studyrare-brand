import React from 'react';

const CSS = `
.sr-check { display: inline-flex; align-items: flex-start; gap: 10px; font-family: var(--font-body); cursor: pointer; user-select: none; }
.sr-check--disabled { cursor: not-allowed; opacity: .55; }
.sr-check input { position: absolute; opacity: 0; width: 0; height: 0; }
.sr-check__box {
  box-sizing: border-box; width: 20px; height: 20px; flex: none; margin-top: 1px;
  border: 1.5px solid var(--border-strong); border-radius: var(--radius-xs);
  background: var(--surface-card); display: flex; align-items: center; justify-content: center;
  color: #fff; transition: background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard);
}
.sr-check__box svg { width: 14px; height: 14px; opacity: 0; transform: scale(.6); transition: opacity var(--dur-fast), transform var(--dur-fast) var(--ease-spring); }
.sr-check:hover .sr-check__box { border-color: var(--periwinkle-400); }
.sr-check input:focus-visible + .sr-check__box { box-shadow: var(--ring); }
.sr-check input:checked + .sr-check__box { background: var(--periwinkle-500); border-color: var(--periwinkle-500); }
.sr-check input:checked + .sr-check__box svg { opacity: 1; transform: scale(1); }
.sr-check__text { font-size: var(--text-sm); color: var(--text-body); line-height: 1.4; }
.sr-check__title { font-weight: var(--fw-semibold); color: var(--text-strong); }
`;

let injected = false;
function ensureStyles() {
  if (injected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.setAttribute('data-sr-check', '');
  el.textContent = CSS;
  document.head.appendChild(el);
  injected = true;
}

export function Checkbox({
  label,
  description,
  disabled = false,
  className = '',
  children,
  ...rest
}) {
  ensureStyles();
  return (
    <label className={['sr-check', disabled ? 'sr-check--disabled' : '', className].filter(Boolean).join(' ')}>
      <input type="checkbox" disabled={disabled} {...rest} />
      <span className="sr-check__box" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
      </span>
      {(label || children || description) && (
        <span className="sr-check__text">
          {(label || children) && <span className="sr-check__title">{label || children}</span>}
          {description && <div>{description}</div>}
        </span>
      )}
    </label>
  );
}
