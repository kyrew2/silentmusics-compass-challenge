import './Drawer.css';

export function Drawer({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <aside
        className="drawer"
        role="dialog"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer__header">
          <h2>{title}</h2>
          <button className="drawer__close" onClick={onClose} aria-label="Fechar">
            ✕
          </button>
        </div>
        <div className="drawer__body">{children}</div>
      </aside>
    </div>
  );
}
