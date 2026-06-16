import React from 'react';

const CSS = `
.sr-radio { display: inline-flex; align-items: flex-start; gap: 10px; font-family: var(--font-body); cursor: pointer; user-select: none; }
.sr-radio--disabled { cursor: not-allowed; opacity: .55; }
.sr-radio input { position: absolute; opacity: 0; width: 0; height: 0; }
.sr-radio__dot {
  box-sizing: border-box; width: 20px; height: 20px; flex: none; margin-top: 1px;
  border: 1.5px solid var(--border-strong); border-radius: 50%;
  background: var(--surface-card); display: flex; align-items: center; justify-content: center;
  transition: border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard);
}
.sr-radio__dot::after { content: ""; width: 10px; height: 10px; border-radius: 50%; background: var(--periwinkle-500); transform: scale(0); transition: transform var(--dur-fast) var(--ease-spring); }
.sr-radio:hover .sr-radio__dot { border-color: var(--periwinkle-400); }
.sr-radio input:focus-visible + .sr-radio__dot { box-shadow: var(--ring); }
.sr-radio input:checked + .sr-radio__dot { border-color: var(--periwinkle-500); }
.sr-radio input:checked + .sr-radio__dot::after { transform: scale(1); }
.sr-radio__text { font-size: var(--text-sm); color: var(--text-body); line-height: 1.4; }
.sr-radio__title { font-weight: var(--fw-semibold); color: var(--text-strong); }
`;

let injected = false;
function ensureStyles() {
  if (injected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.setAttribute('data-sr-radio', '');
  el.textContent = CSS;
  document.head.appendChild(el);
  injected = true;
}

export function Radio({
  label,
  description,
  disabled = false,
  className = '',
  children,
  ...rest
}) {
  ensureStyles();
  return (
    <label className={['sr-radio', disabled ? 'sr-radio--disabled' : '', className].filter(Boolean).join(' ')}>
      <input type="radio" disabled={disabled} {...rest} />
      <span className="sr-radio__dot" aria-hidden="true" />
      {(label || children || description) && (
        <span className="sr-radio__text">
          {(label || children) && <span className="sr-radio__title">{label || children}</span>}
          {description && <div>{description}</div>}
        </span>
      )}
    </label>
  );
}
