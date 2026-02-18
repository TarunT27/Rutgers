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
  term: string;
  major?: string;
};

const terms = ["Spring 2026", "Fall 2025", "Spring 2025"];

const scheduleByTerm: Record<string, CourseEvent[]> = {
  "Spring 2026": [],
  "Fall 2025": [
    { code: "CS 352", title: "Internet Technology", day: "Mon/Wed", time: "10:20 AM", location: "Hill 116" },
    { code: "MATH 477", title: "Theory of Probability", day: "Tue/Thu", time: "1:10 PM", location: "Allison 203" },
  ],
  "Spring 2025": [{ code: "CS 440", title: "Introduction to AI", day: "Mon/Wed", time: "12:00 PM", location: "CoRE 302" }],
};

const gradesByTerm: Record<string, GradeItem[]> = {
  "Spring 2026": [],
  "Fall 2025": [
    { course: "Data Structures", score: "A", term: "Fall 2025", major: "Computer Science" },
    { course: "Algorithms", score: "A-", term: "Fall 2025", major: "Computer Science" },
    { course: "Database Systems", score: "B+", term: "Fall 2025", major: "Computer Science" },
  ],
  "Spring 2025": [{ course: "Operating Systems", score: "A", term: "Spring 2025", major: "Computer Science" }],
};

export default function DashboardPage() {
  const [selectedTerm, setSelectedTerm] = useState(terms[0]);
  const [profileTab, setProfileTab] = useState<"active" | "history">("active");
  const [notificationsFilter, setNotificationsFilter] = useState<"active" | "history">("active");
  const [activityFilter, setActivityFilter] = useState<"course" | "date" | "history">("course");
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
        {[
          ["Dashboard", "▦"],
          ["Courses", "📘"],
          ["Notifications", "🔔"],
          ["Degree", "🎓"],
          ["Billing", "💵"],
          ["Calendar", "📅"],
          ["Settings", "⚙️"],
          ["Help", "?"],
        ].map(([name, icon]) => (
          <button key={name} className="navBtn" aria-label={name} type="button">
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
            <button type="button">＋</button>
            <button type="button">🔔</button>
            <button type="button">🔍</button>
            <button type="button">↪</button>
          </div>
        </header>

        <section className="dashboard" aria-labelledby="dashboard-title">
          <h1 id="dashboard-title">My Dashboard</h1>

          <div className="grid" aria-label="Student dashboard modules">
            <article className="card profileCard">
              <ModuleHeader title="My Profile" />
              <TabRow
                label="Profile filters"
                options={[{ label: "Active", value: "active" }, { label: "History", value: "history" }]}
                value={profileTab}
                onChange={(v) => setProfileTab(v as "active" | "history")}
              />
              {profileTab === "history" ? (
                <EmptyState message="No profile history updates yet." />
              ) : (
                <>
                  <div className="avatar">👤</div>
                  <p className="centerText">Tarun Tata</p>
                  <p className="muted centerText">Student · Rutgers</p>
                  <div className="quickLinks">
                    <Link href="/profile">Password</Link>
                    <Link href="/profile">Privacy</Link>
                    <Link href="/profile">Phone</Link>
                    <Link href="/profile">ID Card</Link>
                  </div>
                </>
              )}
            </article>

            <article className="card">
              <ModuleHeader title="My Notifications" />
              <TabRow
                label="Notification filters"
                options={[{ label: "Active", value: "active" }, { label: "History", value: "history" }]}
                value={notificationsFilter}
                onChange={(v) => setNotificationsFilter(v as "active" | "history")}
              />
              {notificationsFilter === "history" ? (
                <EmptyState message="No archived notifications." />
              ) : (
                <div className="emptyWithIcon">
                  <span>✅</span>
                  <p>You&apos;re all caught up!</p>
                </div>
              )}
              <button className="textAction" type="button" onClick={() => setNotificationsFilter("history")}>Mark all as read</button>
            </article>

            <article className="card">
              <ModuleHeader title="My Course Activity" />
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
              {activityFilter === "history" ? (
                <EmptyState message="No Course Activity Data" />
              ) : (
                <ul className="compactList">
                  <li>{activityFilter === "course" ? "CS 352" : "Today"}: Assignment 2 submitted</li>
                  <li>{activityFilter === "course" ? "MATH 477" : "Yesterday"}: Quiz 4 posted</li>
                </ul>
              )}
            </article>

            <article className="card">
              <ModuleHeader title="My Course Schedule" />
              <div className="termRow">
                <label htmlFor="term-select">Term</label>
                <select id="term-select" value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)}>
                  {terms.map((term) => (
                    <option key={term} value={term}>
                      {term}
                    </option>
                  ))}
                </select>
              </div>
              <TabRow
                label="Schedule filters"
                options={[{ label: "Active", value: "active" }, { label: "History", value: "history" }]}
                value={scheduleView}
                onChange={(v) => setScheduleView(v as "active" | "history")}
              />
              {scheduleView === "history" || !currentSchedule.length ? (
                <EmptyState message="No Course Schedule Data" />
              ) : (
                <ul className="compactList">
                  {currentSchedule.map((course) => (
                    <li key={course.code}>
                      <strong>{course.code}</strong> · {course.day} {course.time} · {course.location}
                    </li>
                  ))}
                </ul>
              )}
              <div className="linkActions">
                <button className="textAction" type="button" onClick={exportScheduleCsv} disabled={!currentSchedule.length}>
                  Export Course Schedule
                </button>
                <Link href="/schedule">Expand Course Schedule</Link>
              </div>
            </article>

            <article className="card">
              <ModuleHeader title="My Grades" />
              <div className="termRow">
                <label htmlFor="grade-term">Term</label>
                <select id="grade-term" value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)}>
                  {terms.map((term) => (
                    <option key={term} value={term}>
                      {term}
                    </option>
                  ))}
                </select>
              </div>
              {currentGrades.length ? (
                <ul className="gradeList">
                  {currentGrades.map((grade) => (
                    <li key={grade.course}>
                      <div>
                        <strong>{grade.course}</strong>
                        <p>{grade.major}</p>
                      </div>
                      <span>{grade.score}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState message="Grades will appear once posted." />
              )}
              <button className="textAction" type="button" onClick={() => setShowTranscriptModal(true)}>
                Unofficial Transcript
              </button>
            </article>

            <article className="card">
              <ModuleHeader title="My Money" />
              <div className="moneyTile">
                <p>Account Balance</p>
                <p>{showMoney ? "$1,500.00" : "••••••"}</p>
              </div>
              <p>Payment Due: $1,500.00</p>
              <p>Billable Credit Hours: 15</p>
              <div className="actions">
                <Link href="/billing">View Billing</Link>
                <button className="ghostBtn" type="button" onClick={() => setShowMoney((v) => !v)}>
                  {showMoney ? "Hide" : "Show"} balance
                </button>
              </div>
            </article>

            <article className="card">
              <ModuleHeader title="My Degree" />
              <p className="program">Computer Science</p>
              <p className="muted">School of Arts & Sciences</p>
              <div className="metrics">
                <div>
                  <strong>3.8</strong>
                  <span>GPA</span>
                </div>
                <div>
                  <strong>3.7</strong>
                  <span>Cumulative GPA</span>
                </div>
                <div>
                  <strong>90</strong>
                  <span>Credits</span>
                </div>
              </div>
            </article>

            <article className="card">
              <ModuleHeader title="My Financial Aid" />
              <TabRow
                label="Aid tabs"
                options={[
                  { label: "Apply", value: "apply" },
                  { label: "Docs", value: "docs" },
                  { label: "Notifs", value: "notifs" },
                  { label: "Award", value: "award" },
                ]}
                value={aidTab}
                onChange={(v) => setAidTab(v as "apply" | "docs" | "notifs" | "award")}
              />
              {aidTab === "award" ? (
                <>
                  <p>Award Year: July 2025 – June 2026</p>
                  <div className="aidBarWrap">
                    <span>Award Summary</span>
                    <div className="aidBar"><div /></div>
                    <strong>$15,000</strong>
                  </div>
                  <Link href="/financial-aid" className="filledBtn">
                    Award Detail and Information
                  </Link>
                </>
              ) : (
                <EmptyState message="No records for this tab yet." />
              )}
            </article>
          </div>
        </section>
      </div>

      {showTranscriptModal && (
        <div
          className="modalBackdrop"
          role="presentation"
          onClick={() => {
            setShowTranscriptModal(false);
            setPdfMessage("");
          }}
        >
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="transcript-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="transcript-title">Unofficial Transcript</h2>
            {currentGrades.length ? (
              <table>
                <thead>
                  <tr>
                    <th scope="col">Course</th>
                    <th scope="col">Grade</th>
                    <th scope="col">Term</th>
                  </tr>
                </thead>
                <tbody>
                  {currentGrades.map((grade) => (
                    <tr key={grade.course}>
                      <td>{grade.course}</td>
                      <td>{grade.score}</td>
                      <td>{grade.term}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <EmptyState message="No transcript records in this term." />
            )}
            <div className="actions">
              <button className="ghostBtn" type="button" onClick={() => window.print()}>
                Open Printable View
              </button>
              <button className="ghostBtn" type="button" onClick={() => setPdfMessage("PDF export is not configured yet. This is a placeholder action.")}>
                Download PDF (Placeholder)
              </button>
              <button
                className="ghostBtn"
                type="button"
                ref={transcriptCloseRef}
                onClick={() => {
                  setShowTranscriptModal(false);
                  setPdfMessage("");
                }}
              >
                Close
              </button>
            </div>
            {pdfMessage && <p className="statusMessage" aria-live="polite">{pdfMessage}</p>}
          </section>
        </div>
      )}

      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
          background: #ececf1;
          color: #0f172a;
        }
        .layout {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 74px 1fr;
        }
        .sidebar {
          background: #cc0033;
          padding: 14px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .navBtn {
          width: 42px;
          height: 42px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
          border-radius: 10px;
          cursor: pointer;
        }
        .contentWrap {
          display: flex;
          flex-direction: column;
        }
        .topBar {
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 18px;
          background: #f8f8fa;
          border-bottom: 1px solid #dedee6;
        }
        .brand {
          display: flex;
          gap: 10px;
          align-items: baseline;
        }
        .brand strong {
          color: #cc0033;
          letter-spacing: 0.03em;
        }
        .brand span {
          color: #6b7280;
          font-size: 0.9rem;
        }
        .topActions button {
          border: none;
          background: transparent;
          font-size: 1rem;
          margin-left: 8px;
          cursor: pointer;
        }
        .dashboard {
          max-width: 1120px;
          margin: 0 auto;
          width: 100%;
          padding: 22px;
        }
        .dashboard h1 {
          margin: 0 0 14px;
          font-size: 2rem;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }
        .card {
          background: #f5f5f6;
          border: 1px solid #d7d7df;
          border-top: 3px solid #cc0033;
          border-radius: 10px;
          padding: 12px;
          min-height: 220px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        .profileCard {
          min-height: 360px;
        }
        .moduleHeader {
          margin: 0;
          font-size: 1.3rem;
          color: #cc0033;
          font-weight: 700;
        }
        .tabRow {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          border-bottom: 1px solid #d9d9e2;
          padding-bottom: 6px;
        }
        .tab {
          border: none;
          background: transparent;
          color: #6b7280;
          cursor: pointer;
          padding: 0 2px 6px;
        }
        .tab[aria-pressed="true"] {
          color: #cc0033;
          border-bottom: 2px solid #cc0033;
        }
        .avatar {
          width: 72px;
          height: 72px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          margin: 0 auto;
          background: #dddfe6;
          font-size: 1.6rem;
        }
        .centerText {
          text-align: center;
          margin: 0;
        }
        .muted {
          margin: 0;
          color: #64748b;
        }
        .quickLinks {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
        }
        .quickLinks a,
        .actions a,
        .linkActions a {
          color: #334155;
          text-decoration: none;
          font-size: 0.85rem;
        }
        .empty {
          color: #64748b;
          margin: auto 0;
        }
        .emptyWithIcon {
          display: grid;
          place-items: center;
          gap: 4px;
          color: #64748b;
          margin: auto 0;
          text-align: center;
        }
        .emptyWithIcon span {
          font-size: 2rem;
          color: #16a34a;
        }
        .termRow {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
        }
        select {
          border: 1px solid #d1d5db;
          border-radius: 6px;
          background: #fff;
          padding: 0.2rem 0.4rem;
        }
        .compactList,
        .gradeList {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 8px;
        }
        .gradeList li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e4e4ea;
          padding-bottom: 4px;
        }
        .gradeList p {
          margin: 0;
          font-size: 0.8rem;
          color: #64748b;
        }
        .textAction {
          border: none;
          background: none;
          color: #cc0033;
          cursor: pointer;
          padding: 0;
          width: fit-content;
          font-weight: 600;
        }
        .linkActions {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: auto;
        }
        .moneyTile {
          background: #cc0033;
          color: #fff;
          border-radius: 8px;
          padding: 10px;
        }
        .moneyTile p {
          margin: 0;
        }
        .moneyTile p:last-child {
          margin-top: 6px;
          font-weight: 700;
          font-size: 1.2rem;
        }
        .actions {
          margin-top: auto;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .ghostBtn {
          border: 1px solid #c4c4d0;
          background: #fff;
          border-radius: 6px;
          padding: 0.4rem 0.65rem;
          cursor: pointer;
        }
        .ghostBtn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .program {
          font-size: 1.05rem;
          font-weight: 700;
          margin: 0;
        }
        .metrics {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-top: auto;
        }
        .metrics div {
          border: 3px solid #cc0033;
          border-radius: 999px;
          height: 74px;
          display: grid;
          place-items: center;
          text-align: center;
        }
        .metrics strong {
          font-size: 1.1rem;
        }
        .metrics span {
          font-size: 0.72rem;
          color: #64748b;
        }
        .aidBarWrap {
          background: #eef1f5;
          padding: 10px;
          border-radius: 8px;
        }
        .aidBar {
          height: 8px;
          border-radius: 999px;
          background: #e2e8f0;
          margin: 8px 0;
        }
        .aidBar > div {
          width: 80%;
          height: 100%;
          background: #16a34a;
          border-radius: inherit;
        }
        .filledBtn {
          margin-top: auto;
          text-decoration: none;
          text-align: center;
          background: #cc0033;
          color: #fff;
          border-radius: 6px;
          padding: 0.6rem;
          font-weight: 600;
        }
        .modalBackdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.45);
          display: grid;
          place-items: center;
          padding: 1rem;
          z-index: 1000;
        }
        .modal {
          width: min(760px, 100%);
          background: #fff;
          border-radius: 10px;
          padding: 1rem;
          max-height: 90vh;
          overflow: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th,
        td {
          border: 1px solid #dce0e7;
          padding: 0.5rem;
          text-align: left;
        }
        .statusMessage {
          margin-top: 0.5rem;
          color: #334155;
        }
        @media (max-width: 1200px) {
          .grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 760px) {
          .layout {
            grid-template-columns: 1fr;
          }
          .sidebar {
            flex-direction: row;
            justify-content: center;
            overflow-x: auto;
          }
          .dashboard {
            padding: 14px;
          }
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}

function ModuleHeader({ title }: { title: string }) {
  return <h2 className="moduleHeader">{title}</h2>;
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
        <button
          key={option.value}
          type="button"
          className="tab"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
