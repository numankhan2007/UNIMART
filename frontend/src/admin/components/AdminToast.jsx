import { createContext, useContext, useState, useCallback } from "react";
import { tokens } from "../styles/tokens";

const ToastContext = createContext(null);

const COLORS = {
  success: { bg: tokens.accentGlow, border: tokens.accent, text: tokens.accent },
  error:   { bg: tokens.dangerGlow, border: tokens.danger, text: tokens.danger },
  warning: { bg: tokens.warningGlow, border: tokens.warning, text: tokens.warning },
  info:    { bg: "rgba(108,99,255,0.1)", border: tokens.primary, text: tokens.primary },
};

export function AdminToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev.slice(-2), { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
        {toasts.map((toast) => {
          const c = COLORS[toast.type] || COLORS.info;
          return (
            <div
              key={toast.id}
              className="toast-enter"
              onClick={() => removeToast(toast.id)}
              style={{
                background: tokens.surface,
                border: `1px solid ${c.border}`,
                borderRadius: tokens.radius.lg,
                padding: "12px 16px",
                color: c.text,
                fontSize: 13,
                fontFamily: tokens.fontBody,
                cursor: "pointer",
                minWidth: 280,
                maxWidth: 360,
                boxShadow: tokens.shadowMd,
              }}
            >
              {toast.message}
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within AdminToastProvider");
  return ctx;
}
