"use client";

export default function MoneyPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Money</h1>
      <div className="card space-y-3">
        <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          Service unavailable right now.
        </div>
        <p className="text-slate-500">No money data available.</p>
      </div>
    </div>
  );
}
