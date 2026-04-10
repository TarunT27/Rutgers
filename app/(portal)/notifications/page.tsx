"use client";

import { useState } from "react";
import { useFetch } from "@/lib/useFetch";
import { usePortalStore } from "@/lib/store";
import { Tabs } from "@/app/components/ui/tabs";
import { Select } from "@/app/components/ui/select";
import { Dialog } from "@/app/components/ui/dialog";
import { NotificationItem } from "@/types/models";

export default function NotificationsPage() {
  const { demoData, markNotificationRead } = usePortalStore();
  const { data } = useFetch<NotificationItem[]>("/api/notifications", demoData);
  const [tab, setTab] = useState("Active");
  const [cat, setCat] = useState("all");
  const [selected, setSelected] = useState<NotificationItem | null>(null);
  const [localReadIds, setLocalReadIds] = useState<Set<string>>(new Set());

  const markRead = (id: string) => {
    markNotificationRead(id);
    setLocalReadIds((prev) => new Set([...prev, id]));
    setSelected(null);
  };

  const allNotifications = (data ?? []).map((n) => ({ ...n, read: n.read || localReadIds.has(n.id) }));
  const list = allNotifications.filter((n) => (tab === "Active" ? !n.read : n.read)).filter((n) => cat === "all" || n.type === cat);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Notifications</h1>
      <Tabs options={["Active", "History"]} value={tab} onChange={setTab} />
      <Select value={cat} onChange={setCat} options={["all", "billing", "course", "aid"]} />
      {demoData ? (
        <ul className="space-y-2">
          {list.map((n) => (
            <li key={n.id} className="card">
              <button className="font-medium" onClick={() => setSelected(n)}>{n.title}</button>
              {!n.read && <button className="ml-2 text-rutgers" onClick={() => markRead(n.id)}>Mark as read</button>}
            </li>
          ))}
          {list.length === 0 && <p className="text-slate-500">You&apos;re all caught up!</p>}
        </ul>
      ) : (
        <p className="text-slate-500">No notifications data.</p>
      )}
      <Dialog open={!!selected} onClose={() => setSelected(null)} title="Notification Detail">
        <p className="mb-3">{selected?.message}</p>
        {selected && !selected.read && (
          <button className="mb-2 block text-rutgers" onClick={() => markRead(selected.id)}>Mark as read</button>
        )}
        <button className="text-rutgers" onClick={() => (window.location.href = selected?.route ?? "/dashboard")}>Go to related page</button>
      </Dialog>
    </div>
  );
}
