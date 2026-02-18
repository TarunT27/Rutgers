import { NextResponse } from "next/server";
import { aidAwards } from "@/lib/mockData";

export async function GET() {
  await new Promise((r) => setTimeout(r, 300));
  return NextResponse.json({ awards: aidAwards, year: "July 2025 – June 2026", docs: ["Tax Transcript", "SAP Form"] });
}
