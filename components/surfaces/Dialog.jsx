import React from 'react';

const CSS = `
.sr-dialog__overlay {
  position: fixed; inset: 0; z-index: 100; display: flex; align-items: center; justify-content: center;
  background: rgba(26, 31, 54, 0.45); backdrop-filter: blur(3px); padding: var(--space-5);
  animation: sr-dialog-fade var(--dur-normal) var(--ease-standard);
}
@keyframes sr-dialog-fade { from { opacity: 0; } to { opacity: 1; } }
.sr-dialog {
  box-sizing: border-box; width: 100%; max-width: 480px; max-height: 90vh; overflow: auto;
  background: var(--surface-card); border-radius: var(--radius-2xl); box-shadow: var(--shadow-xl);
  font-family: var(--font-body); animation: sr-dialog-pop var(--dur-slow) var(--ease-out);
}
@keyframes sr-dialog-pop { from { opacity: 0; transform: translateY(12px) scale(.98); } to { opacity: 1; transform: none; } }
.sr-dialog--lg { max-width: 640px; }
.sr-dialog--sm { max-width: 380px; }
.sr-dialog__head { display: flex; align-items: flex-start; gap: var(--space-4); padding: var(--space-6) var(--space-6) 0; }
.sr-dialog__titles { flex: 1; }
.sr-dialog__title { font-family: var(--font-display); font-weight: var(--fw-extra); font-size: var(--text-xl); color: var(--text-strong); margin: 0; letter-spacing: var(--tracking-snug); }
.sr-dialog__desc { font-size: var(--text-sm); color: var(--text-muted); margin-top: 6px; line-height: 1.5; }
.sr-dialog__close {
  flex: none; border: none; background: transparent; color: var(--text-muted); cursor: pointer;
  width: 32px; height: 32px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;
}
.sr-dialog__close:hover { background: var(--surface-sunken); color: var(--text-strong); }
.sr-dialog__close svg { width: 18px; height: 18px; }
.sr-dialog__body { padding: var(--space-5) var(--space-6); color: var(--text-body); font-size: var(--text-base); line-height: 1.55; }
.sr-dialog__foot { display: flex; justify-content: flex-end; gap: var(--space-3); padding: 0 var(--space-6) var(--space-6); }
`;

let injected = false;
function ensureStyles() {
  if (injected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.setAttribute('data-sr-dialog', '');
  el.textContent = CSS;
  document.head.appendChild(el);
  injected = true;
}

export function Dialog({
  open = true,
  onClose,
  title,
  description,
  size = 'md',
  footer,
  className = '',
  children,
  ...rest
}) {
  ensureStyles();
  if (!open) return null;
  return (
    <div className="sr-dialog__overlay" onClick={onClose}>
      <div
        className={['sr-dialog', size !== 'md' ? `sr-dialog--${size}` : '', className].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        {...rest}
      >
        {(title || onClose) && (
          <div className="sr-dialog__head">
            <div className="sr-dialog__titles">
              {title && <h2 className="sr-dialog__title">{title}</h2>}
              {description && <p className="sr-dialog__desc">{description}</p>}
            </div>
            {onClose && (
              <button className="sr-dialog__close" aria-label="Close" onClick={onClose}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            )}
          </div>
        )}
        {children && <div className="sr-dialog__body">{children}</div>}
        {footer && <div className="sr-dialog__foot">{footer}</div>}
      </div>
    </div>
  );
}
