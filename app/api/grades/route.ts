import { NextResponse } from "next/server";
import { grades } from "@/lib/mockData";

export async function GET() {
  await new Promise((r) => setTimeout(r, 300));
  return NextResponse.json(grades);
}
