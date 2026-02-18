import { NextResponse } from "next/server";

export async function GET() {
  await new Promise((r) => setTimeout(r, 300));
  return NextResponse.json({ major: "Computer Science", school: "Newark College of Arts & Sciences", gpaLast: 3.8, gpaCumulative: 3.7, credits: 90 });
}
