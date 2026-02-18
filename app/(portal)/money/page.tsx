"use client";

import { useState } from "react";
import { useFetch } from "@/lib/useFetch";
import { usePortalStore } from "@/lib/store";
import { Dialog } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/components/ui/toast";

export default function MoneyPage() {
  const { demoData, hideMoney } = usePortalStore();
  const { data } = useFetch<any>("/api/money", demoData);
  const [open, setOpen] = useState(false);
  const { push } = useToast();

  const exportStatement = () => {
    const rows = (data?.transactions ?? []).map((t: any) => [t.date, t.description, t.amount]);
    const csv = [["Date", "Description", "Amount"], ...rows].map((r) => r.join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv]));
    a.download = "statement.csv";
    a.click();
    push("Statement downloaded");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Money</h1>
      <div className="card space-y-2">
        <p>Balance: {hideMoney ? "••••" : `$${data?.accountBalance ?? 0}`}</p>
        <p>Payment Due: {hideMoney ? "••••" : `$${data?.paymentDue ?? 0}`}</p>
        <Button onClick={() => setOpen(true)}>Make payment</Button>
        <Button variant="outline" onClick={exportStatement}>Download statement CSV</Button>
        <table className="w-full text-sm"><thead><tr><th>Date</th><th>Description</th><th>Amount</th></tr></thead><tbody>{(data?.transactions ?? []).map((t: any) => <tr key={t.id}><td>{t.date}</td><td>{t.description}</td><td>{hideMoney ? "••" : `$${t.amount}`}</td></tr>)}</tbody></table>
      </div>
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
