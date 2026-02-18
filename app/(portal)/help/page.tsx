import { helpFaq } from "@/lib/mockData";

export default function HelpPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Help</h1>
      <section id="health" className="card"><h2 className="text-xl font-semibold">Health</h2><p>Health services and reporting information.</p></section>
      <section id="wellness" className="card"><h2 className="text-xl font-semibold">Wellness</h2><p>Mental health and student wellness resources.</p></section>
      <section className="card space-y-2">
        <h2 className="text-xl font-semibold">FAQ</h2>
        {helpFaq.map((f) => (
          <details key={f.q} className="rounded border p-2">
            <summary className="cursor-pointer font-medium">{f.q}</summary>
            <p className="mt-1 text-sm text-slate-600">{f.a}</p>
          </details>
        ))}
      </section>
    </div>
  );
}
