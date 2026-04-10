"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { UserRound } from "lucide-react";
import { useFetch } from "@/lib/useFetch";
import { usePortalStore } from "@/lib/store";
import { Dialog } from "@/app/components/ui/dialog";
import { Tabs } from "@/app/components/ui/tabs";
import { Select } from "@/app/components/ui/select";
import { Button } from "@/app/components/ui/button";
import { Table } from "@/app/components/ui/table";
import { useToast } from "@/app/components/ui/toast";
import { GradeItem, NotificationItem } from "@/types/models";

type User = {
  name: string;
  netId: string;
  ruid: string;
  email: string;
  college: string;
  major: string;
};

type CourseData = {
  schedules: Array<{ id: string; course: string; title: string; day: string; time: string; location: string; term: string }>;
  activities: Array<{ id: string; course: string; kind: string; text: string; date: string }>;
};

type AidData = {
  awards: Array<{ id: string; name: string; amount: number; status: string; year: string }>;
  year: string;
};

type MoneyData = {
  accountBalance: number;
  paymentDue: number;
  billableCredits: number;
  transactions: Array<{ id: string; date: string; description: string; amount: number }>;
};

type DegreeData = {
  major: string;
  school: string;
  gpaLast: number;
  gpaCumulative: number;
  credits: number;
};

export default function DashboardPage() {
  const { push } = useToast();
  const store = usePortalStore();

  const { data: user } = useFetch<User>("/api/user", store.demoData);
  const { data: notifData } = useFetch<NotificationItem[]>("/api/notifications", store.demoData);
  const { data: coursesData } = useFetch<CourseData>("/api/courses", store.demoData);
  const { data: gradesData } = useFetch<GradeItem[]>("/api/grades", store.demoData);
  const { data: aidData } = useFetch<AidData>("/api/financial-aid", store.demoData);
  const { data: moneyData } = useFetch<MoneyData>("/api/money", store.demoData);
  const { data: degreeData } = useFetch<DegreeData>("/api/degree", store.demoData);

  const [notifTab, setNotifTab] = useState("Active");
  const [activityTab, setActivityTab] = useState("By Course");
  const [activitySubtab, setActivitySubtab] = useState("Activity");
  const [scheduleTerm, setScheduleTerm] = useState("Spring 2026");
  const [gradesTerm, setGradesTerm] = useState("Spring 2026");
  const [aidTab, setAidTab] = useState("Award");
  const gradeTermOptions = ["Spring 2026", "Fall 2025", "Spring 2025", "Fall 2024", "Spring 2024", "Fall 2023"];

  const [modal, setModal] = useState<string | null>(null);
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<GradeItem | null>(null);
  const [localReadIds, setLocalReadIds] = useState<Set<string>>(new Set());

  const markRead = (id: string) => {
    store.markNotificationRead(id);
    setLocalReadIds((prev) => new Set([...prev, id]));
  };

  const notifications = useMemo(
    () => (store.demoData ? (notifData ?? []).map((n) => ({ ...n, read: n.read || localReadIds.has(n.id) })) : []),
    [store.demoData, notifData, localReadIds]
  );
  const activities = useMemo(() => (store.demoData ? coursesData?.activities ?? [] : []), [store.demoData, coursesData]);
  const grades = useMemo(() => (store.demoData ? (gradesData ?? []).filter((g) => g.term === gradesTerm) : []), [store.demoData, gradesData, gradesTerm]);
  const allGrades = useMemo(() => (store.demoData ? gradesData ?? [] : []), [store.demoData, gradesData]);
  const schedules = useMemo(() => (store.demoData ? (coursesData?.schedules ?? []).filter((s) => s.term === scheduleTerm) : []), [store.demoData, coursesData, scheduleTerm]);

  const exportCsv = (filename: string, headers: string[], rows: string[][]) => {
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    push(`${filename} downloaded`);
  };

  return (
    <div>
      <h1 className="mb-4 text-4xl font-bold">My Dashboard</h1>
      <div className="grid gap-4 lg:grid-cols-4">
        <article className="card lg:row-span-2">
          <h2 className="card-title">User Profile</h2>
          {store.demoData && user ? (
            <>
              <button className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-slate-200" onClick={() => setModal("profile")}>
                <UserRound className="h-10 w-10 text-slate-500" />
              </button>
              <p className="mt-2 text-center text-xl font-semibold">{user.name}</p>
              <p className="text-center text-slate-600">NetID: {user.netId}</p>
              <p className="text-center text-slate-600">RUID: {user.ruid}</p>
              <p className="text-center text-slate-600">{user.email}</p>
              <p className="text-center text-slate-600">Student</p>
              <p className="text-center text-sm text-slate-500">{user.college}</p>
            </>
          ) : (
            <p className="text-slate-500">No profile data</p>
          )}
          <hr className="my-3" />
          <p className="mb-2 text-sm text-slate-600">Quick Actions</p>
          <div className="grid grid-cols-4 gap-2 text-xs">
            {[
              ["Password", "change-password"],
              ["Privacy", "privacy"],
              ["Phone", "phone"],
              ["ID Card", "id-card"],
              ["Health", "health"],
              ["Wellness", "wellness"]
            ].map(([label, key]) => (
              <button
                key={label}
                className="rounded border p-2 hover:bg-slate-50"
                onClick={() => {
                  if (key === "id-card") return (window.location.href = "/profile/id-card");
                  if (key === "health") return (window.location.href = "/help#health");
                  if (key === "wellness") return (window.location.href = "/help#wellness");
                  setModal(key);
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </article>

        <article className="card">
          <h2 className="card-title">My Notifications</h2>
          <Tabs options={["Active", "History"]} value={notifTab} onChange={setNotifTab} />
          {notifications.filter((n) => (notifTab === "Active" ? !n.read : n.read)).length ? (
            <ul className="space-y-2 text-sm">
              {notifications.filter((n) => (notifTab === "Active" ? !n.read : n.read)).map((n) => (
                <li key={n.id} className="rounded border p-2">
                  <button className="text-left" onClick={() => { setSelectedNotification(n); setModal("notification-detail"); }}>{n.title}</button>
                  {!n.read && <button className="ml-2 text-rutgers" onClick={() => markRead(n.id)}>Mark as read</button>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500">You&apos;re all caught up!</p>
          )}
        </article>

        <article className="card">
          <h2 className="card-title">My Course Activity</h2>
          <Tabs options={["By Course", "By Date", "By History"]} value={activityTab} onChange={setActivityTab} />
          <Tabs options={["Activity", "Grades"]} value={activitySubtab} onChange={setActivitySubtab} />
          {activities.length ? (
            <ul className="space-y-2 text-sm">
              {activities.map((a) => (
                <li key={a.id} className="rounded border p-2">
                  <button onClick={() => setModal("activity-detail")}>{a.course}: {a.text}</button>
                  <Link className="ml-2 text-rutgers" href={`/courses?course=${a.course}`}>Go to course</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500">No Course Activity Data</p>
          )}
        </article>

        <article className="card">
          <h2 className="card-title">My Course Schedule</h2>
          <Select value={scheduleTerm} onChange={setScheduleTerm} options={["Spring 2026", "Fall 2025", "Summer 2025"]} />
          {schedules.length ? (
            <ul className="my-2 space-y-1 text-sm">
              {schedules.map((s) => <li key={s.id}>{s.course} - {s.day} {s.time}</li>)}
            </ul>
          ) : (
            <p className="my-4 text-slate-500">No Course Schedule Data</p>
          )}
          <button className="text-left text-rutgers" onClick={() => setModal("absence")}>Self Reporting Absence</button>
          <button className="text-left" onClick={() => exportCsv("course-schedule.csv", ["Course", "Title", "Day", "Time", "Location"], schedules.map((s) => [s.course, s.title, s.day, s.time, s.location]))}>Export Course Schedule</button>
          <Link href={`/courses?tab=schedule&term=${encodeURIComponent(scheduleTerm)}`}>Expand Course Schedule</Link>
        </article>

        <article className="card">
          <h2 className="card-title">My Grades</h2>
          <Select value={gradesTerm} onChange={setGradesTerm} options={gradeTermOptions} />
          {grades.length ? (
            <ul className="my-2 space-y-2">
              {grades.map((g) => (
                <li key={g.id} className="flex items-center justify-between border-b pb-1 text-sm">
                  <button onClick={() => { setSelectedGrade(g); setModal("grade-detail"); }} className="text-left">{g.course}<div className="text-xs text-slate-500">{g.major}</div></button>
                  <span className="font-semibold text-rutgers">{g.grade}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="my-3 text-slate-500">No grades data.</p>
          )}
          <button className="text-left text-rutgers" onClick={() => setModal("transcript")}>Unofficial Transcript</button>
        </article>

        <article className="card">
          <h2 className="card-title">My Money</h2>
          {store.demoData && moneyData ? (
            <>
              <div className="rounded-xl bg-rutgers p-3 text-white">
                <p className="text-sm">Account Balance</p>
                <p className="text-3xl font-bold">{store.hideMoney ? "$****.**" : `$${moneyData.accountBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}</p>
              </div>
              <p className="mt-2 flex justify-between text-sm">
                <span className="text-slate-600">Payment Due</span>
                <strong>{store.hideMoney ? "$****.**" : `$${moneyData.paymentDue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}</strong>
              </p>
              <p className="flex justify-between text-sm">
                <span className="text-slate-600">Billable Credits</span>
                <strong>{moneyData.billableCredits}</strong>
              </p>
            </>
          ) : (
            <p className="text-slate-500">No data available.</p>
          )}
          <hr className="my-1" />
          <Button variant="outline" onClick={() => (window.location.href = "/money")}>Open Money Page</Button>
        </article>

        <article className="card">
          <h2 className="card-title">My Degree</h2>
          <p className="font-semibold">{degreeData?.major ?? "Computer Science"}</p>
          <p className="text-slate-600">{degreeData?.school ?? "Newark College of Arts & Sciences"}</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: degreeData?.gpaLast ?? "—", label: "Last Semester" },
              { value: degreeData?.gpaCumulative ?? "—", label: "Cumulative" },
              { value: degreeData?.credits ?? "—", label: "Total Credits" }
            ].map(({ value, label }) => (
              <button key={label} onClick={() => setModal("gpa")} className="rounded-full border-4 border-rutgers p-3 text-center">
                <div className="font-bold">{store.hideGpa ? "*" : value}</div>
                <div className="text-xs text-slate-500">{label}</div>
              </button>
            ))}
          </div>
        </article>

        <article className="card">
          <h2 className="card-title">My Financial Aid</h2>
          <Tabs options={["Apply", "Docs", "Notifs", "Award"]} value={aidTab} onChange={setAidTab} />
          {aidTab === "Award" ? (
            store.demoData && aidData ? (
              <>
                <p className="text-sm text-slate-600">Award Year: {aidData.year}</p>
                <p className="text-2xl font-semibold text-slate-900">
                  ${(aidData.awards ?? []).reduce((s, a) => s + a.amount, 0).toLocaleString()}
                </p>
                <Button variant="outline" onClick={() => setModal("award")}>Award Detail and Information</Button>
              </>
            ) : (
              <p className="text-slate-500">No data available.</p>
            )
          ) : (
            <p className="text-slate-500">No records for this tab.</p>
          )}
          <Button variant="outline" onClick={() => (window.location.href = "/financial-aid")}>Open Financial Aid Page</Button>
        </article>
      </div>

      <Dialog open={modal === "profile"} onClose={() => setModal(null)} title="Profile Summary"><p>{user?.name} - {user?.email}</p></Dialog>
      {[
        ["change-password", "Change Password"],
        ["privacy", "Directory Privacy"],
        ["phone", "Update Phone"]
      ].map(([key, title]) => (
        <Dialog key={key} open={modal === key} onClose={() => setModal(null)} title={title}>
          <div className="grid gap-2">
            <input className="rounded border p-2" placeholder="Value" />
            <Button onClick={() => { push(`${title} saved`); setModal(null); }}>Save</Button>
          </div>
        </Dialog>
      ))}
      <Dialog open={modal === "notification-detail"} onClose={() => setModal(null)} title="Notification Detail">
        <p>{selectedNotification?.message}</p>
        <Button onClick={() => (window.location.href = selectedNotification?.route ?? "/notifications")}>Go to related page</Button>
      </Dialog>
      <Dialog open={modal === "activity-detail"} onClose={() => setModal(null)} title="Activity Detail"><p>Assignment detail modal. <Link href="/courses">View Full Page</Link></p></Dialog>
      <Dialog open={modal === "absence"} onClose={() => setModal(null)} title="Self Reporting Absence">
        <form className="grid gap-2" onSubmit={(e) => { e.preventDefault(); store.addAbsence({ date: "2026-02-10", course: "Operating Systems", reason: "Medical" }); push("Absence submitted"); setModal(null); }}>
          <input className="rounded border p-2" type="date" required />
          <select className="rounded border p-2" required><option>Operating Systems</option><option>Machine Learning</option><option>Computer Systems</option></select>
          <textarea className="rounded border p-2" required placeholder="Reason" />
          <Button type="submit">Submit</Button>
        </form>
      </Dialog>
      <Dialog open={modal === "grade-detail"} onClose={() => setModal(null)} title="Grade Detail">
        {selectedGrade && <p>{selectedGrade.course} - {selectedGrade.credits} credits{selectedGrade.instructor ? ` - ${selectedGrade.instructor}` : ""}</p>}
        <Link href="/courses?tab=grades" className="text-rutgers">View Full Page</Link>
      </Dialog>
      <Dialog open={modal === "transcript"} onClose={() => setModal(null)} title="Unofficial Transcript">
        <Table>
          <thead><tr><th className="border p-2">Course</th><th className="border p-2">Grade</th><th className="border p-2">Term</th></tr></thead>
          <tbody>{allGrades.map((g) => <tr key={g.id}><td className="border p-2">{g.course}</td><td className="border p-2">{g.grade}</td><td className="border p-2">{g.term}</td></tr>)}</tbody>
        </Table>
        <div className="mt-3 flex gap-2">
          <Button variant="outline" onClick={() => window.open("/print/transcript", "_blank")}>Open Printable View</Button>
          <Button variant="outline" onClick={() => exportCsv("transcript.txt", ["Course", "Grade", "Term"], allGrades.map((g) => [g.course, g.grade, g.term]))}>Download PDF (Placeholder)</Button>
          <Button variant="outline" onClick={() => setModal(null)}>Close</Button>
        </div>
      </Dialog>
      <Dialog open={modal === "payment"} onClose={() => setModal(null)} title="Make Payment">
        <form className="grid gap-2" onSubmit={(e) => { e.preventDefault(); push("Payment submitted"); setModal(null); }}>
          <input className="rounded border p-2" placeholder="Amount" defaultValue="1500" required />
          <select className="rounded border p-2"><option>Card</option><option>Bank</option></select>
          <Button type="submit">Pay</Button>
        </form>
      </Dialog>
      <Dialog open={modal === "gpa"} onClose={() => setModal(null)} title="GPA Breakdown"><p>Detailed GPA breakdown. <Link href="/degree">View Full Page</Link></p></Dialog>
      <Dialog open={modal === "award"} onClose={() => setModal(null)} title="Award Detail">
        <ul className="mb-2 list-disc pl-6 text-sm">{(aidData?.awards ?? []).map((a) => <li key={a.id}>{a.name} - ${a.amount}</li>)}</ul>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => exportCsv("award-summary.csv", ["Award", "Amount", "Status"], (aidData?.awards ?? []).map((a) => [a.name, String(a.amount), a.status]))}>Download Award Summary CSV</Button>
          <Button variant="outline" onClick={() => (window.location.href = "/financial-aid?tab=docs")}>View docs needed</Button>
        </div>
      </Dialog>
    </div>
  );
}
