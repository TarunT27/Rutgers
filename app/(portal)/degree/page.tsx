"use client";

import { useState } from "react";
import { useFetch } from "@/lib/useFetch";
import { usePortalStore } from "@/lib/store";
import { Dialog } from "@/app/components/ui/dialog";

export default function DegreePage() {
  const { demoData, hideGpa, setHideGpa } = usePortalStore();
  const { data } = useFetch<any>("/api/degree", demoData);
  const { data: grades } = useFetch<any[]>("/api/grades", demoData);
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Degree</h1>
      <div className="card space-y-3">
        <p className="text-xl font-semibold">{data?.major}</p>
        <p>{data?.school}</p>
        <button className="rounded border px-3 py-2" onClick={() => setHideGpa(!hideGpa)}>Toggle GPA visibility</button>
        <div className="grid grid-cols-3 gap-3">
          {[data?.gpaLast, data?.gpaCumulative, data?.credits].map((v, i) => (
            <button key={i} onClick={() => setOpen(true)} className="rounded-full border-4 border-rutgers p-4 text-center">{hideGpa ? "•" : v}</button>
          ))}
        </div>
        <h2 className="text-lg font-semibold">Completed Courses</h2>
        <table className="w-full text-sm"><thead><tr><th>Course</th><th>Grade</th></tr></thead><tbody>{(grades ?? []).map((g) => <tr key={g.id}><td>{g.course}</td><td>{g.grade}</td></tr>)}</tbody></table>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)} title="GPA Breakdown"><p>GPA details by term.</p></Dialog>
    </div>
  );
}
