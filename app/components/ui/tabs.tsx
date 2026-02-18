"use client";

export function Tabs({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="mb-2 flex flex-wrap gap-3 border-b pb-1">
      {options.map((o) => (
        <button key={o} className={`pb-1 text-sm ${value === o ? "border-b-2 border-rutgers text-rutgers" : "text-slate-500"}`} onClick={() => onChange(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}
