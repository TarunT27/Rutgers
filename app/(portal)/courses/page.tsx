"use client";

import { useMemo, useState } from "react";
import { Tabs } from "@/app/components/ui/tabs";
import { Select } from "@/app/components/ui/select";
import { usePortalStore } from "@/lib/store";
import { useFetch } from "@/lib/useFetch";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/components/ui/toast";

export default function CoursesPage() {
  const { demoData, absences } = usePortalStore();
  const { push } = useToast();
  const [tab, setTab] = useState("Schedule");
  const [term, setTerm] = useState("Spring 2026");
  const { data } = useFetch<{ schedules: any[]; activities: any[] }>("/api/courses", demoData);
  const { data: grades } = useFetch<any[]>("/api/grades", demoData);

  const schedules = useMemo(() => (data?.schedules ?? []).filter((s) => s.term === term), [data, term]);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Courses</h1>
      <Tabs options={["Schedule", "Activity", "Grades", "Absence"]} value={tab} onChange={setTab} />
      {tab === "Schedule" && (
        <div className="card space-y-3">
          <Select value={term} onChange={setTerm} options={["Spring 2026", "Fall 2025", "Summer 2025"]} />
          <table className="w-full text-sm"><thead><tr><th>Course</th><th>Day</th><th>Time</th><th>Location</th></tr></thead><tbody>{schedules.map((s) => <tr key={s.id}><td>{s.course}</td><td>{s.day}</td><td>{s.time}</td><td>{s.location}</td></tr>)}</tbody></table>
          <Button variant="outline" onClick={() => { const rows = schedules.map((s) => [s.course, s.day, s.time, s.location]); const csv = [["Course", "Day", "Time", "Location"], ...rows].map((r) => r.join(",")).join("\n"); const blob = new Blob([csv]); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "schedule.csv"; a.click(); push("Schedule exported"); }}>Export schedule CSV</Button>
        </div>
      )}
      {tab === "Activity" && <div className="card">{demoData && (data?.activities ?? []).length ? <ul>{(data?.activities ?? []).map((a) => <li key={a.id}>{a.course}: {a.text}</li>)}</ul> : "No Course Activity Data"}</div>}
      {tab === "Grades" && <div className="card">{demoData ? <ul>{(grades ?? []).map((g) => <li key={g.id}>{g.course} - {g.grade}</li>)}</ul> : "No grades data"}</div>}
      {tab === "Absence" && <div className="card">{absences.length ? <ul>{absences.map((a, i) => <li key={i}>{a.date} · {a.course} · {a.reason}</li>)}</ul> : "No submitted absences"}</div>}
    </div>
  );
}
