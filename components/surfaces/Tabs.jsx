import React from 'react';

const CSS = `
.sr-tabs { font-family: var(--font-body); }
.sr-tabs__list { display: flex; gap: 2px; position: relative; }
.sr-tabs--line .sr-tabs__list { border-bottom: 1.5px solid var(--border-default); gap: var(--space-5); }
.sr-tab {
  appearance: none; border: none; background: transparent; cursor: pointer;
  font-family: var(--font-display); font-weight: var(--fw-bold); font-size: var(--text-sm);
  color: var(--text-muted); white-space: nowrap;
  transition: color var(--dur-fast) var(--ease-standard), background var(--dur-fast) var(--ease-standard);
}
.sr-tab:focus-visible { outline: none; box-shadow: var(--ring); border-radius: var(--radius-sm); }

/* pill style */
.sr-tabs--pill .sr-tab { padding: 8px 16px; border-radius: var(--radius-pill); }
.sr-tabs--pill .sr-tabs__list { background: var(--surface-sunken); padding: 4px; border-radius: var(--radius-pill); gap: 2px; display: inline-flex; }
.sr-tabs--pill .sr-tab:hover { color: var(--text-strong); }
.sr-tabs--pill .sr-tab[aria-selected="true"] { background: var(--surface-card); color: var(--periwinkle-700); box-shadow: var(--shadow-sm); }

/* line style */
.sr-tabs--line .sr-tab { padding: 0 0 12px; position: relative; }
.sr-tabs--line .sr-tab:hover { color: var(--text-strong); }
.sr-tabs--line .sr-tab[aria-selected="true"] { color: var(--periwinkle-700); }
.sr-tabs--line .sr-tab[aria-selected="true"]::after {
  content: ""; position: absolute; left: 0; right: 0; bottom: -1.5px; height: 2.5px;
  background: var(--periwinkle-500); border-radius: 2px;
}
.sr-tab__count { margin-left: 6px; font-family: var(--font-mono); font-size: var(--text-2xs); font-weight: 600; color: var(--text-subtle); }
.sr-tab[aria-selected="true"] .sr-tab__count { color: var(--periwinkle-600); }
`;

let injected = false;
function ensureStyles() {
  if (injected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.setAttribute('data-sr-tabs', '');
  el.textContent = CSS;
  document.head.appendChild(el);
  injected = true;
}

export function Tabs({
  items = [],
  value,
  onChange,
  variant = 'line',
  className = '',
  ...rest
}) {
  ensureStyles();
  return (
    <div className={['sr-tabs', `sr-tabs--${variant}`, className].filter(Boolean).join(' ')} {...rest}>
      <div className="sr-tabs__list" role="tablist">
        {items.map((it) => {
          const item = typeof it === 'string' ? { value: it, label: it } : it;
          const selected = item.value === value;
          return (
            <button
              key={item.value}
              role="tab"
              aria-selected={selected}
              className="sr-tab"
              onClick={() => onChange && onChange(item.value)}
            >
              {item.label}
              {item.count != null && <span className="sr-tab__count">{item.count}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
