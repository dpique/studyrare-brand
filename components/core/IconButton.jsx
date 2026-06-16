import React from 'react';

const CSS = `
.sr-iconbtn {
  display: inline-flex; align-items: center; justify-content: center;
  box-sizing: border-box; width: var(--control-h-md); height: var(--control-h-md);
  border-radius: var(--radius-md); border: 1.5px solid transparent;
  background: transparent; color: var(--ink-600); cursor: pointer; padding: 0;
  transition: background var(--dur-fast) var(--ease-standard),
              color var(--dur-fast) var(--ease-standard),
              border-color var(--dur-fast) var(--ease-standard),
              box-shadow var(--dur-fast) var(--ease-standard);
}
.sr-iconbtn svg { width: 20px; height: 20px; display: block; }
.sr-iconbtn:hover { background: var(--periwinkle-50); color: var(--periwinkle-700); }
.sr-iconbtn:active { background: var(--periwinkle-100); }
.sr-iconbtn:focus-visible { outline: none; box-shadow: var(--ring); }
.sr-iconbtn[disabled] { opacity: .45; cursor: not-allowed; }
.sr-iconbtn[aria-pressed="true"] { background: var(--periwinkle-100); color: var(--periwinkle-700); }

.sr-iconbtn--sm { width: var(--control-h-sm); height: var(--control-h-sm); border-radius: var(--radius-sm); }
.sr-iconbtn--sm svg { width: 16px; height: 16px; }
.sr-iconbtn--lg { width: var(--control-h-lg); height: var(--control-h-lg); }
.sr-iconbtn--lg svg { width: 24px; height: 24px; }

.sr-iconbtn--solid { background: var(--periwinkle-500); color: #fff; }
.sr-iconbtn--solid:hover { background: var(--periwinkle-600); color: #fff; }
.sr-iconbtn--outline { border-color: var(--border-default); color: var(--ink-600); }
.sr-iconbtn--outline:hover { border-color: var(--periwinkle-400); }
.sr-iconbtn--flag[aria-pressed="true"] { background: var(--amber-50); color: var(--amber-600); }
`;

let injected = false;
function ensureStyles() {
  if (injected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.setAttribute('data-sr-iconbtn', '');
  el.textContent = CSS;
  document.head.appendChild(el);
  injected = true;
}

export function IconButton({
  variant = 'ghost',
  size = 'md',
  label,
  pressed,
  className = '',
  children,
  ...rest
}) {
  ensureStyles();
  const cls = [
    'sr-iconbtn',
    variant !== 'ghost' ? `sr-iconbtn--${variant}` : '',
    size !== 'md' ? `sr-iconbtn--${size}` : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <button
      className={cls}
      aria-label={label}
      aria-pressed={pressed}
      title={label}
      {...rest}
    >
      {children}
    </button>
  );
}
