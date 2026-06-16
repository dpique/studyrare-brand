import React from 'react';

const CSS = `
.sr-tooltip { position: relative; display: inline-flex; }
.sr-tooltip__pop {
  position: absolute; z-index: 50; pointer-events: none;
  background: var(--navy); color: #fff; font-family: var(--font-body);
  font-size: var(--text-xs); font-weight: var(--fw-semibold); line-height: 1.4;
  padding: 7px 11px; border-radius: var(--radius-sm); max-width: 240px; width: max-content;
  box-shadow: var(--shadow-md);
  opacity: 0; transition: opacity var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard);
}
.sr-tooltip__pop::after { content: ""; position: absolute; width: 8px; height: 8px; background: var(--navy); transform: rotate(45deg); }
.sr-tooltip:hover .sr-tooltip__pop, .sr-tooltip:focus-within .sr-tooltip__pop { opacity: 1; }

.sr-tooltip__pop--top { bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%) translateY(4px); }
.sr-tooltip:hover .sr-tooltip__pop--top { transform: translateX(-50%) translateY(0); }
.sr-tooltip__pop--top::after { bottom: -4px; left: 50%; margin-left: -4px; }

.sr-tooltip__pop--bottom { top: calc(100% + 8px); left: 50%; transform: translateX(-50%) translateY(-4px); }
.sr-tooltip:hover .sr-tooltip__pop--bottom { transform: translateX(-50%) translateY(0); }
.sr-tooltip__pop--bottom::after { top: -4px; left: 50%; margin-left: -4px; }
`;

let injected = false;
function ensureStyles() {
  if (injected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.setAttribute('data-sr-tooltip', '');
  el.textContent = CSS;
  document.head.appendChild(el);
  injected = true;
}

export function Tooltip({
  content,
  placement = 'top',
  className = '',
  children,
  ...rest
}) {
  ensureStyles();
  return (
    <span className={['sr-tooltip', className].filter(Boolean).join(' ')} {...rest}>
      {children}
      <span className={`sr-tooltip__pop sr-tooltip__pop--${placement}`} role="tooltip">{content}</span>
    </span>
  );
}
