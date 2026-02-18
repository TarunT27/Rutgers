"use client";

import { useToast } from "@/app/components/ui/toast";

export default function IdCardPage() {
  const { push } = useToast();
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">ID Card Preview</h1>
      <div className="card max-w-md">
        <p className="font-semibold">Tarun Tata</p>
        <p className="text-sm text-slate-600">RUID: 123456789</p>
      </div>
      <button className="rounded bg-rutgers px-3 py-2 text-white" onClick={() => {
        const data = "ID CARD PLACEHOLDER";
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([data], { type: "text/plain" }));
        a.download = "id-card.png";
        a.click();
        push("ID card downloaded");
      }}>Download PNG</button>
    </div>
  );
}
