"use client";

import { useEffect, useMemo, useState } from "react";
import { useFetch } from "@/lib/useFetch";
import { usePortalStore } from "@/lib/store";
import { Tabs } from "@/app/components/ui/tabs";
import { Dialog } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/components/ui/toast";

type Award = { id: string; name: string; amount: number; status: string };

type FinancialAidResponse = {
  awards: Award[];
  year: string;
  docs: string[];
};

const tabs = ["Apply", "Docs", "Notifs", "Award"] as const;

function normalizeTab(value: string | null) {
  if (!value) return "Award";
  const lower = value.toLowerCase();
  if (lower === "apply") return "Apply";
  if (lower === "docs") return "Docs";
  if (lower === "notifs") return "Notifs";
  return "Award";
}

export default function FinancialAidPage() {
  const { demoData } = usePortalStore();
  const { data } = useFetch<FinancialAidResponse>("/api/financial-aid", demoData);
  const [tab, setTab] = useState("Award");
  const [open, setOpen] = useState(false);
  const { push } = useToast();

  useEffect(() => {
    const syncTabFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      setTab(normalizeTab(params.get("tab")));
    };

    syncTabFromUrl();
    window.addEventListener("popstate", syncTabFromUrl);
    return () => window.removeEventListener("popstate", syncTabFromUrl);
  }, []);

  const awardTotal = useMemo(
    () => (data?.awards ?? []).reduce((sum, award) => sum + award.amount, 0),
    [data?.awards]
  );

  return (
    <div className="max-w-md space-y-4">
      <section className="card space-y-3">
        <h1 className="border-t-2 border-rutgers pt-2 text-5xl font-bold leading-none text-rutgers">My Financial Aid</h1>
        <Tabs options={[...tabs]} value={tab} onChange={setTab} />

        {tab === "Award" && (
          demoData ? (
            <div className="space-y-2">
              <p className="text-sm text-slate-600">Award Year</p>
              <p className="text-4xl font-semibold text-slate-900">{data?.year ?? "Not available"}</p>
              <div className="rounded-md bg-slate-100 p-3">
                <p className="text-2xl">Award Summary</p>
                <div className="my-2 h-2 rounded-full bg-green-500" />
                <p className="text-4xl font-semibold">${awardTotal.toLocaleString()}</p>
              </div>
              <Button onClick={() => setOpen(true)}>Award Detail and Information</Button>
            </div>
          ) : (
            <p className="text-slate-500">No records for this tab.</p>
          )
        )}

        {tab === "Docs" && (
          demoData ? (
            <div className="space-y-1 text-sm">
              {(data?.docs ?? []).map((doc) => (
                <p key={doc}>[ ] {doc}</p>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">No records for this tab.</p>
          )
        )}

        {tab === "Apply" && (
          <p className="text-slate-600">Application portal opens soon.</p>
        )}

        {tab === "Notifs" && (
          <p className="text-slate-600">No financial aid notifications.</p>
        )}
      </section>

      <Dialog open={open} onClose={() => setOpen(false)} title="Award Detail">
        <ul className="mb-3 list-disc pl-5">
          {(data?.awards ?? []).map((award) => (
            <li key={award.id}>{award.name} - ${award.amount.toLocaleString()} - {award.status}</li>
          ))}
        </ul>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              const rows = (data?.awards ?? []).map((award) => [award.name, award.amount, award.status]);
              const csv = [["Award", "Amount", "Status"], ...rows].map((r) => r.join(",")).join("\n");
              const a = document.createElement("a");
              a.href = URL.createObjectURL(new Blob([csv]));
              a.download = "award-summary.csv";
              a.click();
              push("Award CSV downloaded");
            }}
          >
            Download Award Summary CSV
          </Button>
          <Button variant="outline" onClick={() => (window.location.href = "/financial-aid?tab=docs")}>View docs needed</Button>
        </div>
      </Dialog>
    </div>
  );
}
