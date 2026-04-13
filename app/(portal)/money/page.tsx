"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useFetch } from "@/lib/useFetch";
import { usePortalStore } from "@/lib/store";
import { Dialog } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/components/ui/toast";

type MoneyResponse = {
  accountBalance: number;
  paymentDue: number;
  billableCredits: number;
  transactions: Array<{ id: string; date: string; description: string; amount: number }>;
};

const maskAmount = "$****.**";

function formatCurrency(value: number) {
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function MoneyPage() {
  const { demoData, hideMoney, setHideMoney } = usePortalStore();
  const { data } = useFetch<MoneyResponse>("/api/money", demoData);
  const [open, setOpen] = useState(false);
  const [showBilling, setShowBilling] = useState(false);
  const { push } = useToast();

  const exportStatement = () => {
    const rows = (data?.transactions ?? []).map((t) => [t.date, t.description, t.amount]);
    const csv = [["Date", "Description", "Amount"], ...rows].map((r) => r.join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv]));
    a.download = "statement.csv";
    a.click();
    push("Statement downloaded");
  };

  return (
    <div className="max-w-md">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 border-t-2 border-rutgers pt-3">
          <h1 className="text-4xl font-bold text-rutgers">My Money</h1>
        </div>

        <div className="mb-6 rounded-xl bg-[#cc0033] p-5 text-white">
          <div className="flex items-center justify-between">
            <p className="text-lg">Account Balance</p>
            <button
              className="rounded p-1 opacity-80 hover:bg-white/10 hover:opacity-100"
              aria-label={hideMoney ? "Show balance" : "Hide balance"}
              onClick={() => setHideMoney(!hideMoney)}
            >
              {hideMoney ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <p className="mt-1 text-5xl font-bold">
            {hideMoney ? maskAmount : formatCurrency(data?.accountBalance ?? 0)}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between border-b pb-3 text-lg text-slate-700 dark:text-slate-300">
            <span>Payment Due</span>
            <strong className="text-slate-900 dark:text-white">
              {hideMoney ? maskAmount : formatCurrency(data?.paymentDue ?? 0)}
            </strong>
          </div>
          <div className="flex items-center justify-between pb-4 text-lg text-slate-700 dark:text-slate-300">
            <span>Billable Credit Hours</span>
            <strong className="text-slate-900 dark:text-white">
              {data?.billableCredits ?? 0}
            </strong>
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            className="rounded bg-slate-100 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700" 
            onClick={() => setShowBilling(true)}
          >
            View Billing
          </button>
          <button 
            className="rounded bg-slate-100 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700" 
            onClick={() => setOpen(true)}
          >
            Make Payment
          </button>
        </div>

        {showBilling && (
          <div className="space-y-2 border-t pt-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Billing Activity</p>
              <button className="text-sm text-rutgers" onClick={exportStatement}>Download statement CSV</button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="pb-1 text-left">Date</th>
                  <th className="pb-1 text-left">Description</th>
                  <th className="pb-1 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {(data?.transactions ?? []).map((t) => (
                  <tr key={t.id}>
                    <td className="py-1">{t.date}</td>
                    <td className="py-1">{t.description}</td>
                    <td className="py-1 text-right">{hideMoney ? maskAmount : formatCurrency(t.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <Dialog open={open} onClose={() => setOpen(false)} title="Make Payment">
        <form className="grid gap-2" onSubmit={(e) => { e.preventDefault(); push("Payment completed"); setOpen(false); }}>
          <input required className="rounded border p-2" defaultValue="1500" />
          <select className="rounded border p-2"><option>Card</option><option>Bank</option></select>
          <Button type="submit">Submit Payment</Button>
        </form>
      </Dialog>
    </div>
  );
}
