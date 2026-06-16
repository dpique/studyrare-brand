import React from 'react';

const CSS = `
.sr-switch { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-body); cursor: pointer; user-select: none; }
.sr-switch--disabled { cursor: not-allowed; opacity: .55; }
.sr-switch input { position: absolute; opacity: 0; width: 0; height: 0; }
.sr-switch__track {
  box-sizing: border-box; width: 40px; height: 24px; flex: none; border-radius: var(--radius-pill);
  background: var(--ink-300); position: relative; transition: background var(--dur-normal) var(--ease-standard);
}
.sr-switch__track::after {
  content: ""; position: absolute; top: 2px; left: 2px; width: 20px; height: 20px; border-radius: 50%;
  background: #fff; box-shadow: var(--shadow-sm); transition: transform var(--dur-normal) var(--ease-spring);
}
.sr-switch:hover .sr-switch__track { background: var(--ink-400); }
.sr-switch input:focus-visible + .sr-switch__track { box-shadow: var(--ring); }
.sr-switch input:checked + .sr-switch__track { background: var(--periwinkle-500); }
.sr-switch:hover input:checked + .sr-switch__track { background: var(--periwinkle-600); }
.sr-switch input:checked + .sr-switch__track::after { transform: translateX(16px); }
.sr-switch__label { font-size: var(--text-sm); font-weight: var(--fw-semibold); color: var(--text-strong); }
`;

let injected = false;
function ensureStyles() {
  if (injected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.setAttribute('data-sr-switch', '');
  el.textContent = CSS;
  document.head.appendChild(el);
  injected = true;
}

export function Switch({
  label,
  disabled = false,
  className = '',
  children,
  ...rest
}) {
  ensureStyles();
  return (
    <label className={['sr-switch', disabled ? 'sr-switch--disabled' : '', className].filter(Boolean).join(' ')}>
      <input type="checkbox" role="switch" disabled={disabled} {...rest} />
      <span className="sr-switch__track" aria-hidden="true" />
      {(label || children) && <span className="sr-switch__label">{label || children}</span>}
    </label>
  );
}
