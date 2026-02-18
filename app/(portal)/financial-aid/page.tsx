"use client";

import { useState } from "react";
import { Tabs } from "@/app/components/ui/tabs";

export default function FinancialAidPage() {
  const [tab, setTab] = useState("Award");

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Financial Aid</h1>
      <Tabs options={["Apply", "Docs", "Notifs", "Award"]} value={tab} onChange={setTab} />
      <div className="card space-y-3">
        <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          Service unavailable right now.
        </div>
        <p className="text-slate-500">No financial aid data available.</p>
      </div>
    </div>
  );
}
