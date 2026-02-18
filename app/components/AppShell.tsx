"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, CircleHelp, DollarSign, GraduationCap, Home, LogOut, Plus, Search, Settings, WalletCards } from "lucide-react";
import { useState } from "react";
import { usePortalStore } from "@/lib/store";
import { Dialog } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Tooltip } from "@/app/components/ui/tooltip";
import { useToast } from "@/app/components/ui/toast";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/courses", label: "Courses", icon: GraduationCap },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/money", label: "Money", icon: DollarSign },
  { href: "/degree", label: "Degree", icon: WalletCards },
  { href: "/financial-aid", label: "Financial Aid", icon: WalletCards },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/help", label: "Help", icon: CircleHelp }
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { demoData, setDemoData, addBookmark, addNote, addReminder, sidebarCollapsed } = usePortalStore();
  const { push } = useToast();

  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [mode, setMode] = useState<"reminder" | "note" | "bookmark">("reminder");
  const [f1, setF1] = useState("");
  const [f2, setF2] = useState("");

  const submitQuick = () => {
    if (mode === "reminder") {
      addReminder({ title: f1, date: f2 });
      push("Reminder added");
    }
    if (mode === "note") {
      addNote({ text: f1 });
      push("Note added");
    }
    if (mode === "bookmark") {
      addBookmark({ label: f1, url: f2 });
      push("Bookmark saved to settings");
    }
    setQuickAddOpen(false);
    setF1("");
    setF2("");
  };

  return (
    <div className="min-h-screen bg-[#ececf1] text-slate-800">
      <div className="grid min-h-screen grid-cols-[80px_1fr]">
        <aside className="bg-rutgers p-3">
          <nav className="flex flex-col items-center gap-3">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.href);
              return (
                <Tooltip key={item.href} label={item.label}>
                  <Link href={item.href} className={`grid h-12 w-12 place-items-center rounded-xl border border-white/20 ${active ? "bg-white/30" : "bg-white/10"}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </Link>
                </Tooltip>
              );
            })}
          </nav>
        </aside>

        <div className="flex flex-col">
          <header className="flex h-16 items-center justify-between border-b bg-white px-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-rutgers">RUTGERS</span>
              <span className="text-xl text-slate-600">myRutgers Portal</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <label className="flex items-center gap-1">
                Demo Data
                <input type="checkbox" checked={demoData} onChange={(e) => setDemoData(e.target.checked)} />
              </label>
              <button onClick={() => setQuickAddOpen(true)} aria-label="Add" className="rounded p-2 hover:bg-slate-100"><Plus /></button>
              <button onClick={() => router.push("/notifications")} aria-label="Notifications" className="rounded p-2 hover:bg-slate-100"><Bell /></button>
              <button onClick={() => router.push("/search")} aria-label="Search" className="rounded p-2 hover:bg-slate-100"><Search /></button>
              <button onClick={() => router.push("/logout")} aria-label="Logout" className="rounded p-2 hover:bg-slate-100"><LogOut /></button>
            </div>
          </header>

          <main className={`p-6 ${sidebarCollapsed ? "max-w-7xl" : "max-w-[1600px]"}`}>{children}</main>
        </div>
      </div>

      <Dialog open={quickAddOpen} onClose={() => setQuickAddOpen(false)} title="Quick Add">
        <div className="mb-2 flex gap-2">
          <Button variant={mode === "reminder" ? "default" : "outline"} onClick={() => setMode("reminder")}>Add Reminder</Button>
          <Button variant={mode === "note" ? "default" : "outline"} onClick={() => setMode("note")}>Add Note</Button>
          <Button variant={mode === "bookmark" ? "default" : "outline"} onClick={() => setMode("bookmark")}>Add Bookmark</Button>
        </div>
        <div className="grid gap-2">
          <input className="rounded border p-2" placeholder={mode === "bookmark" ? "Label" : mode === "note" ? "Note" : "Title"} value={f1} onChange={(e) => setF1(e.target.value)} />
          {mode !== "note" && <input className="rounded border p-2" placeholder={mode === "bookmark" ? "https://url" : "Date"} value={f2} onChange={(e) => setF2(e.target.value)} />}
          <Button onClick={submitQuick}>Save</Button>
        </div>
      </Dialog>
    </div>
  );
}
