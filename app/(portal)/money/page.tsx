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
    <div className="max-w-md space-y-4">
      <section className="card space-y-3 rounded-2xl">
        <h1 className="border-t-2 border-rutgers pt-2 text-5xl font-bold leading-none text-rutgers">My Money</h1>

        <div className="rounded-xl bg-rutgers p-4 text-white">
          <div className="flex items-center justify-between text-2xl">
            <p>Account Balance</p>
            <button
              className="rounded p-1 hover:bg-white/10"
              aria-label={hideMoney ? "Show balance" : "Hide balance"}
              onClick={() => setHideMoney(!hideMoney)}
            >
              {hideMoney ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <p className="text-5xl font-bold leading-tight">
            {hideMoney ? maskAmount : formatCurrency(data?.accountBalance ?? 0)}
          </p>
        </div>

        <p className="flex items-center justify-between border-b text-2xl">
          <span>Payment Due</span>
          <strong>{hideMoney ? maskAmount : formatCurrency(data?.paymentDue ?? 0)}</strong>
        </p>
        <p className="flex items-center justify-between text-2xl">
          <span>Billable Credit Hours</span>
          <strong>{data?.billableCredits ?? 0}</strong>
        </p>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowBilling(true)}>View Billing</Button>
          <Button variant="outline" onClick={() => setOpen(true)}>Make Payment</Button>
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
