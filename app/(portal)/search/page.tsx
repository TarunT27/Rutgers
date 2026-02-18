"use client";

import { useMemo, useState } from "react";
import { useFetch } from "@/lib/useFetch";
import { usePortalStore } from "@/lib/store";
import { Dialog } from "@/app/components/ui/dialog";

export default function SearchPage() {
  const { demoData } = usePortalStore();
  const [q, setQ] = useState("");
  const [detail, setDetail] = useState<string | null>(null);
  const { data: notifications } = useFetch<any[]>("/api/notifications", demoData);
  const { data: grades } = useFetch<any[]>("/api/grades", demoData);
  const { data: aid } = useFetch<any>("/api/financial-aid", demoData);

  const results = useMemo(() => {
    const query = q.toLowerCase();
    const notif = (notifications ?? []).filter((n) => n.title.toLowerCase().includes(query)).map((n) => ({ type: "Notification", label: n.title, route: n.route }));
    const grade = (grades ?? []).filter((g) => g.course.toLowerCase().includes(query)).map((g) => ({ type: "Grade", label: `${g.course} (${g.grade})`, route: "/courses?tab=grades" }));
    const awards = (aid?.awards ?? []).filter((a: any) => a.name.toLowerCase().includes(query)).map((a: any) => ({ type: "Award", label: a.name, route: "/financial-aid?tab=award" }));
    return [...notif, ...grade, ...awards];
  }, [q, notifications, grades, aid]);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Search</h1>
      <input className="w-full rounded border p-2" placeholder="Search courses, notifications, grades, awards" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="card">
        {q ? (
          results.length ? (
            <ul className="space-y-2">{results.map((r, i) => <li key={`${r.type}-${i}`}><button className="text-left" onClick={() => setDetail(`${r.type}: ${r.label}`)}>{r.type}: {r.label}</button> <button className="ml-2 text-rutgers" onClick={() => (window.location.href = r.route)}>Open</button></li>)}</ul>
          ) : (
            <p>No results.</p>
          )
        ) : (
          <p>Type to search.</p>
        )}
      </div>
      <Dialog open={!!detail} onClose={() => setDetail(null)} title="Search Detail">
        <p>{detail}</p>
      </Dialog>
    </div>
  );
}
