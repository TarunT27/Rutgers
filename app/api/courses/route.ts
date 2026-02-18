import { NextResponse } from "next/server";
import { activities, schedules } from "@/lib/mockData";

export async function GET() {
  await new Promise((r) => setTimeout(r, 300));
  return NextResponse.json({ schedules, activities });
}
