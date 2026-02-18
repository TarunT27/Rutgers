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

  const list = (data ?? []).filter((n) => (tab === "Active" ? !n.read : n.read)).filter((n) => cat === "all" || n.type === cat);

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
              {!n.read && <button className="ml-2 text-rutgers" onClick={() => markNotificationRead(n.id)}>Mark as read</button>}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-500">No notifications data.</p>
      )}
      <Dialog open={!!selected} onClose={() => setSelected(null)} title="Notification Detail">
        <p>{selected?.message}</p>
        <button className="text-rutgers" onClick={() => (window.location.href = selected?.route ?? "/dashboard")}>Go to related page</button>
      </Dialog>
    </div>
  );
}
