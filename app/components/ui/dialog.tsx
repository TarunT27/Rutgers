"use client";

export function Dialog({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4" onClick={onClose} role="presentation">
      <section className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-xl bg-white p-4" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={title}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="rounded border px-2 py-1">Close</button>
        </div>
        {children}
      </section>
    </div>
  );
}
