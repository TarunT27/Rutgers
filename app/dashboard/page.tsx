"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type CourseEvent = {
  code: string;
  title: string;
  day: string;
  time: string;
  location: string;
};

type GradeItem = {
  course: string;
  score: string;
  major: string;
  term: string;
};

const terms = ["Spring 2026", "Fall 2025", "Summer 2025"];

const scheduleByTerm: Record<string, CourseEvent[]> = {
  "Spring 2026": [],
  "Fall 2025": [
    { code: "CS 352", title: "Internet Technology", day: "Mon/Wed", time: "10:20 AM", location: "Hill 116" },
    { code: "MATH 477", title: "Mathematical Probability", day: "Tue/Thu", time: "1:10 PM", location: "Allison 203" },
  ],
  "Summer 2025": [],
};

const gradesByTerm: Record<string, GradeItem[]> = {
  "Spring 2026": [],
  "Fall 2025": [
    { course: "Data Structures", score: "A", major: "Computer Science", term: "Fall 2025" },
    { course: "Algorithms", score: "A-", major: "Computer Science", term: "Fall 2025" },
    { course: "Database Systems", score: "B+", major: "Computer Science", term: "Fall 2025" },
    { course: "Operating Systems", score: "A", major: "Computer Science", term: "Fall 2025" },
  ],
  "Summer 2025": [],
};

const sidebarIcons = ["⊞", "◫", "◔", "⎓", "$", "◷", "⚙", "?"];

export default function DashboardPage() {
  const [selectedTerm, setSelectedTerm] = useState(terms[0]);
  const [notificationsFilter, setNotificationsFilter] = useState<"active" | "history">("active");
  const [activityFilter, setActivityFilter] = useState<"course" | "date" | "history">("course");
  const [activityViewTab, setActivityViewTab] = useState<"activity" | "grades">("activity");
  const [scheduleView, setScheduleView] = useState<"active" | "history">("active");
  const [aidTab, setAidTab] = useState<"apply" | "docs" | "notifs" | "award">("award");
  const [showTranscriptModal, setShowTranscriptModal] = useState(false);
  const [showMoney, setShowMoney] = useState(false);
  const [pdfMessage, setPdfMessage] = useState("");
  const transcriptCloseRef = useRef<HTMLButtonElement | null>(null);

  const currentSchedule = useMemo(() => scheduleByTerm[selectedTerm] ?? [], [selectedTerm]);
  const currentGrades = useMemo(() => gradesByTerm[selectedTerm] ?? [], [selectedTerm]);

  useEffect(() => {
    if (!showTranscriptModal) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowTranscriptModal(false);
        setPdfMessage("");
      }
    };

    const originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    transcriptCloseRef.current?.focus();
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [showTranscriptModal]);

  const escapeCsvValue = (value: string) => `"${value.replaceAll('"', '""')}"`;

  const exportScheduleCsv = () => {
    if (!currentSchedule.length) return;

    const headers = ["Course", "Title", "Day", "Time", "Location"];
    const rows = currentSchedule.map((row) => [row.code, row.title, row.day, row.time, row.location]);
    const csv = [headers, ...rows].map((line) => line.map((cell) => escapeCsvValue(cell)).join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedTerm.replace(/\s+/g, "-").toLowerCase()}-schedule.csv`;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="layout" aria-label="Rutgers dashboard layout">
      <aside className="sidebar" aria-label="Main navigation">
        {sidebarIcons.map((icon, index) => (
          <button key={icon + String(index)} className="navBtn" aria-label={`Sidebar icon ${index + 1}`} type="button">
            <span aria-hidden>{icon}</span>
          </button>
        ))}
      </aside>

      <div className="contentWrap">
        <header className="topBar">
          <div className="brand">
            <strong>RUTGERS</strong>
            <span>myRutgers Portal</span>
          </div>
          <div className="topActions" aria-label="header actions">
            <button type="button" aria-label="Create">＋</button>
            <button type="button" aria-label="Notifications">◔</button>
            <button type="button" aria-label="Search">⌕</button>
            <button type="button" aria-label="Logout">↪</button>
          </div>
        </header>

        <section className="dashboard" aria-labelledby="dashboard-title">
          <h1 id="dashboard-title">My Dashboard</h1>

          <div className="grid" aria-label="Student dashboard modules">
            <article className="card profileCard">
              <h2 className="moduleHeader">User Profile</h2>
              <div className="avatar">👤</div>
              <p className="centerText strong">Tarun Tata</p>
              <p className="centerText muted">NetID: tt123</p>
              <p className="centerText muted">RUID: 123456789</p>
              <p className="centerText muted">tarun.tata@rutgers.edu</p>
              <p className="centerText muted">Student</p>
              <p className="centerText muted tiny">Newark College of Arts & Sciences</p>

              <div className="quickBlock">
                <p className="muted tiny">Quick Actions</p>
                <div className="quickLinks">
                  {[
                    ["⌂", "Password"],
                    ["⌁", "Privacy"],
                    ["✆", "Phone"],
                    ["▣", "ID Card"],
                    ["♡", "Health"],
                    ["♡", "Wellness"],
                  ].map(([icon, label]) => (
                    <button key={label} type="button" className="quickBtn">
                      <span>{icon}</span>
                      <small>{label}</small>
                    </button>
                  ))}
                </div>
              </div>
            </article>

            <article className="card">
              <h2 className="moduleHeader">My Notifications</h2>
              <TabRow
                label="Notification filters"
                options={[{ label: "Active", value: "active" }, { label: "History", value: "history" }]}
                value={notificationsFilter}
                onChange={(v) => setNotificationsFilter(v as "active" | "history")}
              />
              {notificationsFilter === "history" ? (
                <EmptyState message="No archived notifications" />
              ) : (
                <div className="emptyWithIcon">
                  <span>✓</span>
                  <p>You&apos;re all caught up!</p>
                </div>
              )}
            </article>

            <article className="card">
              <h2 className="moduleHeader">My Course Activity</h2>
              <TabRow
                label="Course activity filters"
                options={[
                  { label: "By Course", value: "course" },
                  { label: "By Date", value: "date" },
                  { label: "By History", value: "history" },
                ]}
                value={activityFilter}
                onChange={(v) => setActivityFilter(v as "course" | "date" | "history")}
              />
              <TabRow
                label="Course activity type"
                options={[{ label: "Activity", value: "activity" }, { label: "Grades", value: "grades" }]}
                value={activityViewTab}
                onChange={(v) => setActivityViewTab(v as "activity" | "grades")}
              />
              {activityFilter === "history" ? (
                <EmptyState message="No Course Activity Data" />
              ) : (
                <div className="emptyWithIcon">
                  <span>✓</span>
                  <p>{activityViewTab === "activity" ? "No Course Activity Data" : "No Course Grades Data"}</p>
                </div>
              )}
            </article>

            <article className="card">
              <h2 className="moduleHeader">My Course Schedule</h2>
              <div className="termRow">
                <select aria-label="Select schedule term" value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)}>
                  {terms.map((term) => (
                    <option key={term} value={term}>{term}</option>
                  ))}
                </select>
              </div>
              {scheduleView === "history" || !currentSchedule.length ? (
                <div className="emptyWithIcon">
                  <span>✓</span>
                  <p>No Course Schedule Data</p>
                </div>
              ) : (
                <ul className="compactList">
                  {currentSchedule.map((course) => (
                    <li key={course.code}><strong>{course.code}</strong> · {course.day} {course.time} · {course.location}</li>
                  ))}
                </ul>
              )}
              <button className="textAction" type="button" onClick={() => setScheduleView((v) => (v === "active" ? "history" : "active"))}>Self Reporting Absence</button>
              <div className="linkActions">
                <button className="plainLink" type="button" onClick={exportScheduleCsv} disabled={!currentSchedule.length}>⤓ Export Course Schedule</button>
                <Link href="/schedule">↗ Expand Course Schedule</Link>
              </div>
            </article>

            <article className="card">
              <h2 className="moduleHeader">My Grades</h2>
              <div className="termRow">
                <select aria-label="Select grades term" value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)}>
                  {terms.map((term) => (
                    <option key={term} value={term}>{term}</option>
                  ))}
                </select>
              </div>
              {currentGrades.length ? (
                <ul className="gradeList">
                  {currentGrades.map((grade) => (
                    <li key={grade.course}>
                      <div><strong>{grade.course}</strong><p>{grade.major}</p></div>
                      <span>{grade.score}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState message="Grades will appear once posted." />
              )}
              <button className="textAction" type="button" onClick={() => setShowTranscriptModal(true)}>↗ Unofficial Transcript</button>
            </article>

            <article className="card">
              <h2 className="moduleHeader">My Money</h2>
              <div className="moneyTile">
                <div className="moneyTop"><p>Account Balance</p><button type="button" onClick={() => setShowMoney((v) => !v)}>{showMoney ? "◉" : "◎"}</button></div>
                <p className="moneyAmount">{showMoney ? "$2,450.00" : "••••••"}</p>
              </div>
              <div className="moneyMeta"><span>Payment Due</span><strong>$1,500.00</strong></div>
              <div className="moneyMeta"><span>Billable Credit Hours</span><strong>15</strong></div>
              <div className="actions splitTop">
                <button className="ghostBtn" type="button">$ View Billing</button>
                <button className="ghostBtn" type="button">▭ Make Payment</button>
              </div>
            </article>

            <article className="card">
              <h2 className="moduleHeader">My Degree</h2>
              <p className="program">Computer Science</p>
              <p className="muted">Newark College of Arts & Sciences</p>
              <div className="metrics">
                <div><strong>3.8</strong><span>GPA</span><small>Last Semester</small></div>
                <div><strong>3.7</strong><span>GPA</span><small>Cumulative</small></div>
                <div><strong>90</strong><span>Credits</span><small>Total Degree</small></div>
              </div>
            </article>

            <article className="card">
              <h2 className="moduleHeader">My Financial Aid</h2>
              <TabRow
                label="Aid tabs"
                options={[{ label: "Apply", value: "apply" }, { label: "Docs", value: "docs" }, { label: "Notifs", value: "notifs" }, { label: "Award", value: "award" }]}
                value={aidTab}
                onChange={(v) => setAidTab(v as "apply" | "docs" | "notifs" | "award")}
              />
              {aidTab === "award" ? (
                <>
                  <p className="muted">Award Year</p>
                  <p className="strong">July 2025 – June 2026</p>
                  <div className="aidSummary">
                    <p>Award Summary</p>
                    <div className="aidBar"><div /></div>
                    <strong>$15,000</strong>
                  </div>
                  <Link href="/financial-aid" className="filledBtn">▣ Award Detail and Information</Link>
                </>
              ) : (
                <EmptyState message="No records for this tab yet." />
              )}
            </article>
          </div>
        </section>
      </div>

      {showTranscriptModal && (
        <div className="modalBackdrop" role="presentation" onClick={() => { setShowTranscriptModal(false); setPdfMessage(""); }}>
          <section className="modal" role="dialog" aria-modal="true" aria-labelledby="transcript-title" onClick={(e) => e.stopPropagation()}>
            <h2 id="transcript-title">Unofficial Transcript</h2>
            {currentGrades.length ? (
              <table>
                <thead><tr><th scope="col">Course</th><th scope="col">Grade</th><th scope="col">Term</th></tr></thead>
                <tbody>
                  {currentGrades.map((grade) => (
                    <tr key={grade.course}><td>{grade.course}</td><td>{grade.score}</td><td>{grade.term}</td></tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <EmptyState message="No transcript records in this term." />
            )}
            <div className="actions">
              <button className="ghostBtn" type="button" onClick={() => window.print()}>Open Printable View</button>
              <button className="ghostBtn" type="button" onClick={() => setPdfMessage("PDF export is not configured yet. This is a placeholder action.")}>Download PDF (Placeholder)</button>
              <button className="ghostBtn" type="button" ref={transcriptCloseRef} onClick={() => { setShowTranscriptModal(false); setPdfMessage(""); }}>Close</button>
            </div>
            {pdfMessage && <p className="statusMessage" aria-live="polite">{pdfMessage}</p>}
          </section>
        </div>
      )}

      <style jsx>{`
        :global(body) { margin: 0; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; background: #e9e9ee; color: #1f2937; }
        .layout { min-height: 100vh; display: grid; grid-template-columns: 82px 1fr; }
        .sidebar { background: #cc0033; padding: 14px 10px; display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .navBtn { width: 48px; height: 48px; border: none; background: rgba(255,255,255,.17); color: #fff; border-radius: 12px; cursor: pointer; font-size: 1.25rem; }
        .contentWrap { display: flex; flex-direction: column; }
        .topBar { height: 70px; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; background: #fff; border-bottom: 1px solid #e2e8f0; }
        .brand { display: flex; gap: 12px; align-items: baseline; }
        .brand strong { color: #cc0033; font-size: 2.15rem; letter-spacing: 0.02em; }
        .brand span { color: #475569; font-size: 1.95rem; }
        .topActions button { border: none; background: transparent; font-size: 2rem; margin-left: 16px; cursor: pointer; color: #64748b; }
        .dashboard { max-width: 1600px; margin: 0 auto; width: 100%; padding: 22px; }
        .dashboard h1 { margin: 0 0 14px; font-size: 2.45rem; }
        .grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
        .card { background: #f4f4f7; border: 1px solid #d6d8e1; border-top: 3px solid #cc0033; border-radius: 12px; padding: 14px; min-height: 260px; display: flex; flex-direction: column; gap: 10px; box-shadow: 0 1px 2px rgba(0,0,0,.06); }
        .profileCard { min-height: 540px; }
        .moduleHeader { margin: 0; font-size: 2.4rem; color: #cc0033; font-weight: 700; }
        .tabRow { display: flex; flex-wrap: wrap; gap: 12px; border-bottom: 1px solid #d8dce5; padding-bottom: 7px; }
        .tab { border: none; background: transparent; color: #64748b; cursor: pointer; padding: 0 0 7px; font-size: 1.4rem; }
        .tab[aria-pressed="true"] { color: #cc0033; border-bottom: 2px solid #cc0033; }
        .avatar { width: 92px; height: 92px; border-radius: 999px; display: grid; place-items: center; margin: 2px auto 0; background: #d5d9e2; font-size: 2.2rem; }
        .centerText { text-align: center; margin: 0; }
        .strong { font-weight: 700; }
        .muted { margin: 0; color: #64748b; }
        .tiny { font-size: 1.05rem; }
        .quickBlock { margin-top: auto; border-top: 1px solid #d8dce5; padding-top: 10px; }
        .quickLinks { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: 8px; }
        .quickBtn { border: none; background: transparent; display: grid; justify-items: center; gap: 3px; padding: 6px; color: #475569; }
        .quickBtn span { font-size: 1.5rem; }
        .quickBtn small { font-size: 1.05rem; }
        .empty { color: #64748b; margin: auto 0; font-size: 1.4rem; }
        .emptyWithIcon { display: grid; place-items: center; gap: 4px; color: #64748b; margin: auto 0; text-align: center; font-size: 1.4rem; }
        .emptyWithIcon span { font-size: 4rem; color: #14b64f; line-height: 1; }
        .termRow select { border: 1px solid #cbd5e1; border-radius: 6px; background: #fff; padding: .25rem .5rem; font-size: 1.3rem; }
        .compactList, .gradeList { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; font-size: 1.3rem; }
        .gradeList li { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
        .gradeList p { margin: 0; font-size: 1.05rem; color: #64748b; }
        .gradeList span { color: #cc0033; font-weight: 700; }
        .textAction { border: none; background: none; color: #cc0033; cursor: pointer; padding: 0; width: fit-content; font-weight: 600; font-size: 1.3rem; }
        .plainLink { border: none; background: none; color: #334155; text-align: left; padding: 0; cursor: pointer; font-size: 1.3rem; }
        .linkActions { display: flex; flex-direction: column; gap: 6px; margin-top: auto; }
        .linkActions a { color: #334155; text-decoration: none; font-size: 1.3rem; }
        .moneyTile { background: #cc0033; color: #fff; border-radius: 10px; padding: 11px; }
        .moneyTop { display: flex; justify-content: space-between; align-items: center; }
        .moneyTop p { margin: 0; font-size: 1.15rem; }
        .moneyTop button { border: none; background: transparent; color: #fff; font-size: 1.2rem; cursor: pointer; }
        .moneyAmount { margin: 8px 0 0; font-weight: 700; font-size: 2.1rem; }
        .moneyMeta { display: flex; justify-content: space-between; align-items: center; font-size: 1.2rem; }
        .splitTop { border-top: 1px solid #e2e8f0; padding-top: 10px; }
        .actions { margin-top: auto; display: flex; gap: 8px; flex-wrap: wrap; }
        .ghostBtn { border: 1px solid #d1d5db; background: #eceef3; border-radius: 6px; padding: .45rem .65rem; cursor: pointer; font-size: 1.25rem; }
        .ghostBtn:disabled { opacity: .5; cursor: not-allowed; }
        .program { font-size: 1.6rem; font-weight: 700; margin: 0; }
        .metrics { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 12px; margin-top: auto; }
        .metrics div { display: grid; justify-items: center; text-align: center; }
        .metrics strong { width: 88px; height: 88px; border: 4px solid #cc0033; border-radius: 999px; display: grid; place-items: center; font-size: 2rem; }
        .metrics span { margin-top: 4px; font-size: 1.2rem; color: #64748b; }
        .metrics small { font-size: 1.1rem; color: #475569; }
        .aidSummary { background: #e9edf3; padding: 10px; border-radius: 8px; }
        .aidSummary p { margin: 0 0 6px; color: #475569; font-size: 1.1rem; }
        .aidBar { height: 9px; border-radius: 999px; background: #d7dee8; margin-bottom: 6px; }
        .aidBar > div { width: 82%; height: 100%; background: #15b94e; border-radius: inherit; }
        .filledBtn { margin-top: auto; text-decoration: none; text-align: center; background: #cc0033; color: #fff; border-radius: 6px; padding: .7rem; font-weight: 600; font-size: 1.2rem; }
        .modalBackdrop { position: fixed; inset: 0; background: rgba(15,23,42,.45); display: grid; place-items: center; padding: 1rem; z-index: 1000; }
        .modal { width: min(760px,100%); background: #fff; border-radius: 10px; padding: 1rem; max-height: 90vh; overflow: auto; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #dce0e7; padding: .5rem; text-align: left; }
        .statusMessage { margin-top: .5rem; color: #334155; }
        @media (max-width: 1200px) { .grid { grid-template-columns: repeat(2,minmax(0,1fr)); } }
        @media (max-width: 760px) {
          .layout { grid-template-columns: 1fr; }
          .sidebar { flex-direction: row; justify-content: center; overflow-x: auto; }
          .topBar { height: auto; padding: 10px; flex-wrap: wrap; gap: 8px; }
          .brand strong { font-size: 1.7rem; }
          .brand span { font-size: 1.3rem; }
          .topActions button { font-size: 1.3rem; }
          .dashboard { padding: 14px; }
          .dashboard h1 { font-size: 1.8rem; }
          .grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}

function EmptyState({ message }: { message: string }) {
  return <p className="empty">{message}</p>;
}

function TabRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Array<{ label: string; value: string }>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="tabRow" role="toolbar" aria-label={label}>
      {options.map((option) => (
        <button key={option.value} type="button" className="tab" aria-pressed={value === option.value} onClick={() => onChange(option.value)}>
          {option.label}
        </button>
      ))}
    </div>
  );
}
