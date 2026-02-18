"use client";

import { useState } from "react";
import { useFetch } from "@/lib/useFetch";
import { usePortalStore } from "@/lib/store";
import { Tabs } from "@/app/components/ui/tabs";
import { Dialog } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/components/ui/toast";

export default function FinancialAidPage() {
  const { demoData } = usePortalStore();
  const { data } = useFetch<any>("/api/financial-aid", demoData);
  const [tab, setTab] = useState("Award");
  const [open, setOpen] = useState(false);
  const { push } = useToast();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Financial Aid</h1>
      <Tabs options={["Apply", "Docs", "Notifs", "Award"]} value={tab} onChange={setTab} />
      {tab === "Award" && (
        <div className="card space-y-2">
          <p>Award Year: {data?.year}</p>
          <ul>{(data?.awards ?? []).map((a: any) => <li key={a.id}>{a.name} - ${a.amount}</li>)}</ul>
          <Button onClick={() => setOpen(true)}>Award detail and information</Button>
        </div>
      )}
      {tab === "Docs" && <div className="card">{(data?.docs ?? []).map((d: string) => <p key={d}>☐ {d}</p>)}</div>}
      {tab === "Apply" && <div className="card">Application portal opens soon.</div>}
      {tab === "Notifs" && <div className="card">No financial aid notifications.</div>}

      <Dialog open={open} onClose={() => setOpen(false)} title="Award Detail">
        <ul className="mb-3 list-disc pl-5">{(data?.awards ?? []).map((a: any) => <li key={a.id}>{a.name} · ${a.amount} · {a.status}</li>)}</ul>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => {
            const csv = [["Award", "Amount", "Status"], ...(data?.awards ?? []).map((a: any) => [a.name, a.amount, a.status])].map((r) => r.join(",")).join("\n");
            const a = document.createElement("a");
            a.href = URL.createObjectURL(new Blob([csv]));
            a.download = "award-summary.csv";
            a.click();
            push("Award CSV downloaded");
          }}>Download Award Summary CSV</Button>
          <Button variant="outline" onClick={() => (window.location.href = "/financial-aid?tab=docs")}>View docs needed</Button>
        </div>
      </Dialog>
    </div>
  );
}
