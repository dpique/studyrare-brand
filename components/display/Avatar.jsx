import React from 'react';

const CSS = `
.sr-avatar {
  display: inline-flex; align-items: center; justify-content: center;
  box-sizing: border-box; width: 40px; height: 40px; border-radius: 50%;
  background: var(--periwinkle-100); color: var(--periwinkle-700);
  font-family: var(--font-display); font-weight: var(--fw-bold); font-size: var(--text-sm);
  overflow: hidden; flex: none; user-select: none; position: relative;
}
.sr-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
.sr-avatar--xs { width: 24px; height: 24px; font-size: var(--text-2xs); }
.sr-avatar--sm { width: 32px; height: 32px; font-size: var(--text-xs); }
.sr-avatar--lg { width: 56px; height: 56px; font-size: var(--text-lg); }
.sr-avatar--xl { width: 80px; height: 80px; font-size: var(--text-2xl); }
.sr-avatar--ring { box-shadow: 0 0 0 2px var(--surface-card), 0 0 0 4px var(--periwinkle-400); }
.sr-avatar--amber { background: var(--amber-100); color: var(--amber-700); }
.sr-avatar--navy { background: var(--navy); color: #fff; }
`;

let injected = false;
function ensureStyles() {
  if (injected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.setAttribute('data-sr-avatar', '');
  el.textContent = CSS;
  document.head.appendChild(el);
  injected = true;
}

function initials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '';
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
}

export function Avatar({
  name = '',
  src,
  size = 'md',
  tone = 'brand',
  ring = false,
  className = '',
  ...rest
}) {
  ensureStyles();
  const cls = [
    'sr-avatar',
    size !== 'md' ? `sr-avatar--${size}` : '',
    tone === 'amber' ? 'sr-avatar--amber' : tone === 'navy' ? 'sr-avatar--navy' : '',
    ring ? 'sr-avatar--ring' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <span className={cls} title={name || undefined} {...rest}>
      {src ? <img src={src} alt={name} /> : initials(name)}
    </span>
  );
}
