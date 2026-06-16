import React from 'react';

const CSS = `
.sr-field { display: flex; flex-direction: column; gap: 6px; font-family: var(--font-body); }
.sr-field__label { font-size: var(--text-sm); font-weight: var(--fw-bold); color: var(--text-strong); }
.sr-field__req { color: var(--danger-500); margin-left: 2px; }
.sr-field__hint { font-size: var(--text-xs); color: var(--text-muted); }
.sr-field__error { font-size: var(--text-xs); color: var(--danger-600); font-weight: var(--fw-semibold); }

.sr-input-wrap { position: relative; display: flex; align-items: center; }
.sr-input {
  box-sizing: border-box; width: 100%; height: var(--control-h-md);
  padding: 0 var(--space-4); font-family: var(--font-body); font-size: var(--text-base);
  color: var(--text-strong); background: var(--surface-card);
  border: 1.5px solid var(--border-default); border-radius: var(--radius-md);
  transition: border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard);
  outline: none;
}
.sr-input::placeholder { color: var(--text-subtle); }
.sr-input:hover { border-color: var(--border-strong); }
.sr-input:focus { border-color: var(--periwinkle-400); box-shadow: var(--ring); }
.sr-input:disabled { background: var(--surface-sunken); color: var(--text-subtle); cursor: not-allowed; }
.sr-input--lg { height: var(--control-h-lg); font-size: var(--text-md); }
.sr-input--sm { height: var(--control-h-sm); font-size: var(--text-sm); padding: 0 var(--space-3); }
.sr-input--has-icon { padding-left: 40px; }
.sr-input--error { border-color: var(--danger-500); }
.sr-input--error:focus { box-shadow: var(--ring-danger); }
.sr-input__icon { position: absolute; left: 12px; color: var(--text-subtle); display: flex; pointer-events: none; }
.sr-input__icon svg { width: 18px; height: 18px; }
`;

let injected = false;
function ensureStyles() {
  if (injected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.setAttribute('data-sr-input', '');
  el.textContent = CSS;
  document.head.appendChild(el);
  injected = true;
}

let uid = 0;
export function Input({
  label,
  hint,
  error,
  required = false,
  size = 'md',
  leftIcon = null,
  id,
  className = '',
  ...rest
}) {
  ensureStyles();
  const fieldId = id || React.useMemo(() => `sr-input-${++uid}`, []);
  const inputCls = [
    'sr-input',
    size !== 'md' ? `sr-input--${size}` : '',
    leftIcon ? 'sr-input--has-icon' : '',
    error ? 'sr-input--error' : '',
  ].filter(Boolean).join(' ');
  return (
    <div className={['sr-field', className].filter(Boolean).join(' ')}>
      {label && (
        <label className="sr-field__label" htmlFor={fieldId}>
          {label}{required && <span className="sr-field__req">*</span>}
        </label>
      )}
      <div className="sr-input-wrap">
        {leftIcon && <span className="sr-input__icon">{leftIcon}</span>}
        <input id={fieldId} className={inputCls} aria-invalid={!!error} {...rest} />
      </div>
      {error ? <span className="sr-field__error">{error}</span>
             : hint ? <span className="sr-field__hint">{hint}</span> : null}
    </div>
  );
}
