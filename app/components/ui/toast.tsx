"use client";

import { createContext, useContext, useMemo, useState } from "react";

type Toast = { id: number; message: string };

const ToastContext = createContext<{ push: (message: string) => void }>({ push: () => undefined });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const value = useMemo(
    () => ({
      push: (message: string) => {
        const id = Date.now();
        setToasts((s) => [...s, { id, message }]);
        setTimeout(() => setToasts((s) => s.filter((t) => t.id !== id)), 2500);
      }
    }),
    []
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((t) => (
          <div key={t.id} className="rounded bg-slate-900 px-3 py-2 text-sm text-white shadow">
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
