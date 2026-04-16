"use client";

import { usePortalStore } from "@/lib/store";

export default function SettingsPage() {
  const store = usePortalStore();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="card space-y-2">
        <label className="block"><input type="checkbox" checked={store.sidebarCollapsed} onChange={(e) => store.setSidebarCollapsed(e.target.checked)} /> Sidebar collapsed</label>
        <label className="block"><input type="checkbox" checked={store.hideMoney} onChange={(e) => store.setHideMoney(e.target.checked)} /> Hide money values</label>
      </div>
      <div className="card">
        <h2 className="mb-2 text-lg font-semibold">Bookmarks</h2>
        {store.bookmarks.length ? (
          <ul>{store.bookmarks.map((b, i) => <li key={`${b.label}-${i}`}><a className="text-rutgers" href={b.url}>{b.label}</a></li>)}</ul>
        ) : (
          <p className="text-slate-500">No bookmarks yet.</p>
        )}
      </div>
    </div>
  );
}
