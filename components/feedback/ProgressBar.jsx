import React from 'react';

const CSS = `
.sr-progress { font-family: var(--font-body); width: 100%; }
.sr-progress__head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px; }
.sr-progress__label { font-size: var(--text-sm); font-weight: var(--fw-semibold); color: var(--text-strong); }
.sr-progress__value { font-size: var(--text-xs); font-weight: var(--fw-bold); color: var(--text-muted); font-family: var(--font-mono); }
.sr-progress__track {
  width: 100%; height: 10px; border-radius: var(--radius-pill);
  background: var(--ink-100); overflow: hidden; display: flex;
}
.sr-progress--sm .sr-progress__track { height: 6px; }
.sr-progress--lg .sr-progress__track { height: 14px; }
.sr-progress__fill {
  height: 100%; border-radius: var(--radius-pill);
  transition: width var(--dur-slow) var(--ease-out);
}
.sr-progress__seg { height: 100%; transition: width var(--dur-slow) var(--ease-out); }
.sr-progress__seg:first-child { border-radius: var(--radius-pill) 0 0 var(--radius-pill); }
.sr-progress__seg:last-child { border-radius: 0 var(--radius-pill) var(--radius-pill) 0; }
`;

let injected = false;
function ensureStyles() {
  if (injected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.setAttribute('data-sr-progress', '');
  el.textContent = CSS;
  document.head.appendChild(el);
  injected = true;
}

const FILLS = {
  brand: 'var(--periwinkle-500)',
  accent: 'var(--amber-400)',
  correct: 'var(--success-500)',
  incorrect: 'var(--danger-500)',
};

export function ProgressBar({
  value = 0,
  max = 100,
  variant = 'brand',
  size = 'md',
  label,
  showValue = false,
  segments,
  className = '',
  ...rest
}) {
  ensureStyles();
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const cls = ['sr-progress', size !== 'md' ? `sr-progress--${size}` : '', className].filter(Boolean).join(' ');
  return (
    <div className={cls} {...rest}>
      {(label || showValue) && (
        <div className="sr-progress__head">
          {label && <span className="sr-progress__label">{label}</span>}
          {showValue && <span className="sr-progress__value">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className="sr-progress__track" role="progressbar" aria-valuenow={value} aria-valuemax={max}>
        {segments ? (
          segments.map((s, i) => (
            <span key={i} className="sr-progress__seg" style={{ width: `${(s.value / max) * 100}%`, background: s.color || FILLS[s.variant] || FILLS.brand }} />
          ))
        ) : (
          <span className="sr-progress__fill" style={{ width: `${pct}%`, background: FILLS[variant] || FILLS.brand }} />
        )}
      </div>
    </div>
  );
}
