"use client";

import { useFetch } from "@/lib/useFetch";

export default function PrintTranscriptPage() {
  const { data } = useFetch<any[]>("/api/grades", true);
  return (
    <main className="mx-auto max-w-4xl p-6 print:p-2">
      <h1 className="mb-4 text-2xl font-bold">Unofficial Transcript</h1>
      <table className="w-full border-collapse text-sm"><thead><tr><th className="border p-2">Course</th><th className="border p-2">Grade</th><th className="border p-2">Term</th></tr></thead><tbody>{(data ?? []).map((g) => <tr key={g.id}><td className="border p-2">{g.course}</td><td className="border p-2">{g.grade}</td><td className="border p-2">{g.term}</td></tr>)}</tbody></table>
      <button className="mt-4 rounded bg-rutgers px-3 py-2 text-white print:hidden" onClick={() => window.print()}>Print</button>
    </main>
  );
}
