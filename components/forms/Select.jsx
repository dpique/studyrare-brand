import React from 'react';

const CSS = `
.sr-select-field { display: flex; flex-direction: column; gap: 6px; font-family: var(--font-body); }
.sr-select-field__label { font-size: var(--text-sm); font-weight: var(--fw-bold); color: var(--text-strong); }
.sr-select-wrap { position: relative; display: flex; align-items: center; }
.sr-select {
  appearance: none; -webkit-appearance: none; box-sizing: border-box; width: 100%;
  height: var(--control-h-md); padding: 0 38px 0 var(--space-4);
  font-family: var(--font-body); font-size: var(--text-base); font-weight: var(--fw-medium);
  color: var(--text-strong); background: var(--surface-card);
  border: 1.5px solid var(--border-default); border-radius: var(--radius-md);
  cursor: pointer; outline: none;
  transition: border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard);
}
.sr-select:hover { border-color: var(--border-strong); }
.sr-select:focus { border-color: var(--periwinkle-400); box-shadow: var(--ring); }
.sr-select:disabled { background: var(--surface-sunken); color: var(--text-subtle); cursor: not-allowed; }
.sr-select--sm { height: var(--control-h-sm); font-size: var(--text-sm); }
.sr-select__chev { position: absolute; right: 12px; pointer-events: none; color: var(--text-muted); display: flex; }
.sr-select__chev svg { width: 18px; height: 18px; }
`;

let injected = false;
function ensureStyles() {
  if (injected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.setAttribute('data-sr-select', '');
  el.textContent = CSS;
  document.head.appendChild(el);
  injected = true;
}

let uid = 0;
export function Select({
  label,
  options = [],
  size = 'md',
  id,
  className = '',
  children,
  ...rest
}) {
  ensureStyles();
  const fieldId = id || React.useMemo(() => `sr-select-${++uid}`, []);
  return (
    <div className={['sr-select-field', className].filter(Boolean).join(' ')}>
      {label && <label className="sr-select-field__label" htmlFor={fieldId}>{label}</label>}
      <div className="sr-select-wrap">
        <select id={fieldId} className={['sr-select', size === 'sm' ? 'sr-select--sm' : ''].filter(Boolean).join(' ')} {...rest}>
          {children || options.map((o) => {
            const opt = typeof o === 'string' ? { value: o, label: o } : o;
            return <option key={opt.value} value={opt.value}>{opt.label}</option>;
          })}
        </select>
        <span className="sr-select__chev">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </span>
      </div>
    </div>
  );
}
