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
};

const terms = ["Fall 2025", "Spring 2025", "Fall 2024"];

const scheduleByTerm: Record<string, CourseEvent[]> = {
  "Fall 2025": [
    { code: "CS 352", title: "Internet Technology", day: "Mon/Wed", time: "10:20 AM", location: "Hill 116" },
    { code: "MATH 477", title: "Mathematical Theory of Probability", day: "Tue/Thu", time: "1:10 PM", location: "Allison 203" },
  ],
  "Spring 2025": [
    { code: "CS 440", title: "Introduction to AI", day: "Mon/Wed", time: "12:00 PM", location: "CoRE 302" },
  ],
  "Fall 2024": [],
};

const gradesByTerm: Record<string, GradeItem[]> = {
  "Fall 2025": [
    { course: "CS 352", score: "A", term: "Fall 2025" },
    { course: "MATH 477", score: "A-", term: "Fall 2025" },
  ],
  "Spring 2025": [{ course: "CS 440", score: "B+", term: "Spring 2025" }],
  "Fall 2024": [],
};

export default function DashboardPage() {
  const [selectedTerm, setSelectedTerm] = useState(terms[0]);
  const [profileTab, setProfileTab] = useState<"active" | "history">("active");
  const [notificationsFilter, setNotificationsFilter] = useState<"active" | "history">("active");
  const [activityFilter, setActivityFilter] = useState<"course" | "date" | "history">("course");
  const [scheduleView, setScheduleView] = useState<"active" | "history">("active");
  const [aidTab, setAidTab] = useState<"grants" | "loans" | "history">("grants");
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
    <main className="dashboard" aria-labelledby="dashboard-heading">
      <header className="dashboardHeader">
        <h1 id="dashboard-heading">Dashboard</h1>
        <div className="termPicker">
          <label htmlFor="term-select">Current term</label>
          <select id="term-select" value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)}>
            {terms.map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </select>
        </div>
      </header>

      <section className="grid" aria-label="Student dashboard modules">
        <article className="card">
          <ModuleHeader title="Profile" />
          <TabRow
            label="Profile filters"
            options={[
              { label: "Active", value: "active" },
              { label: "History", value: "history" },
            ]}
            value={profileTab}
            onChange={(v) => setProfileTab(v as "active" | "history")}
          />
          {profileTab === "active" ? (
            <ul>
              <li>Name: Alex Scarlet</li>
              <li>Major: Computer Science</li>
              <li>Status: Full-time</li>
            </ul>
          ) : (
            <EmptyState message="No profile history changes for this period." />
          )}
          <div className="actions">
            <Link href="/profile">Open profile page</Link>
          </div>
        </article>

        <article className="card">
          <ModuleHeader title="Notifications" />
          <TabRow
            label="Notification filters"
            options={[
              { label: "Active", value: "active" },
              { label: "History", value: "history" },
            ]}
            value={notificationsFilter}
            onChange={(v) => setNotificationsFilter(v as "active" | "history")}
          />
          {notificationsFilter === "active" ? (
            <ul>
              <li>Advising appointment available next week.</li>
              <li>Tuition reminder due in 5 days.</li>
            </ul>
          ) : (
            <EmptyState message="No archived notifications." />
          )}
          <button className="ghostBtn" type="button" onClick={() => setNotificationsFilter("history")}>Mark all as read</button>
        </article>

        <article className="card">
          <ModuleHeader title="Course Activity" />
          <TabRow
            label="Course activity filters"
            options={[
              { label: "By Course", value: "course" },
              { label: "By Date", value: "date" },
              { label: "History", value: "history" },
            ]}
            value={activityFilter}
            onChange={(v) => setActivityFilter(v as "course" | "date" | "history")}
          />
          {activityFilter === "history" ? (
            <EmptyState message="No historical activity yet." />
          ) : (
            <ul>
              <li>{activityFilter === "course" ? "CS 352" : "Today"}: Assignment 2 submitted.</li>
              <li>{activityFilter === "course" ? "MATH 477" : "Yesterday"}: Quiz 4 posted.</li>
            </ul>
          )}
          <div className="actions">
            <Link href="/courses">Go to course activity</Link>
          </div>
        </article>

        <article className="card">
          <ModuleHeader title="Course Schedule" />
          <TabRow
            label="Schedule filters"
            options={[
              { label: "Active", value: "active" },
              { label: "History", value: "history" },
            ]}
            value={scheduleView}
            onChange={(v) => setScheduleView(v as "active" | "history")}
          />
          {scheduleView === "history" || !currentSchedule.length ? (
            <EmptyState message="No schedule items in this view." />
          ) : (
            <ul>
              {currentSchedule.map((course) => (
                <li key={course.code}>
                  <strong>{course.code}</strong> · {course.day} {course.time} · {course.location}
                </li>
              ))}
            </ul>
          )}
          <button className="ghostBtn" type="button" onClick={exportScheduleCsv} disabled={!currentSchedule.length}>
            Export Course Schedule
          </button>
        </article>

        <article className="card">
          <ModuleHeader title="Grades" />
          {currentGrades.length ? (
            <ul>
              {currentGrades.map((grade) => (
                <li key={grade.course}>
                  {grade.course}: {grade.score}
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState message="Grades will appear once posted." />
          )}
          <button className="ghostBtn" type="button" onClick={() => setShowTranscriptModal(true)}>
            Unofficial Transcript
          </button>
        </article>

        <article className="card">
          <ModuleHeader title="Money" />
          <p>Current balance: {showMoney ? "$1,240.00" : "•••••"}</p>
          <button className="ghostBtn" type="button" onClick={() => setShowMoney((v) => !v)}>
            {showMoney ? "Hide" : "Show"} balance
          </button>
          <div className="actions">
            <Link href="/billing">Open billing details</Link>
          </div>
        </article>

        <article className="card">
          <ModuleHeader title="Degree" />
          <p>Progress: 84 / 120 credits complete.</p>
          <progress value={84} max={120} aria-label="Degree completion" />
          <div className="actions">
            <Link href="/degree-audit">Run degree audit</Link>
          </div>
        </article>

        <article className="card">
          <ModuleHeader title="Financial Aid" />
          <TabRow
            label="Aid tabs"
            options={[
              { label: "Grants", value: "grants" },
              { label: "Loans", value: "loans" },
              { label: "History", value: "history" },
            ]}
            value={aidTab}
            onChange={(v) => setAidTab(v as "grants" | "loans" | "history")}
          />
          {aidTab === "history" ? (
            <EmptyState message="No prior aid package history." />
          ) : (
            <ul>
              <li>{aidTab === "grants" ? "Scarlet Promise Grant" : "Federal Direct Loan"}</li>
              <li>Status: Accepted</li>
            </ul>
          )}
          <div className="actions">
            <Link href="/financial-aid">View aid details</Link>
          </div>
        </article>
      </section>

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
            <p>Printable transcript preview for {selectedTerm}.</p>
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
              <button
                className="ghostBtn"
                type="button"
                onClick={() => setPdfMessage("PDF export is not configured yet. This is a placeholder action.")}
              >
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
        .dashboard {
          padding: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .dashboardHeader {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .termPicker {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1rem;
        }
        .card {
          border: 1px solid #d6d6d6;
          border-radius: 0.75rem;
          background: #fff;
          padding: 1rem;
          min-height: 220px;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .moduleHeader {
          margin: 0;
          font-size: 1rem;
        }
        .tabRow {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .tab {
          border: 1px solid #ccc;
          padding: 0.25rem 0.5rem;
          border-radius: 999px;
          background: #f8f8f8;
          cursor: pointer;
        }
        .tab[aria-pressed="true"] {
          background: #c4172c;
          border-color: #c4172c;
          color: #fff;
        }
        .ghostBtn {
          width: fit-content;
          border: 1px solid #c4172c;
          color: #c4172c;
          border-radius: 0.4rem;
          padding: 0.35rem 0.6rem;
          background: #fff;
          cursor: pointer;
        }
        .ghostBtn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
        .actions {
          margin-top: auto;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .empty {
          font-style: italic;
          color: #555;
        }
        .modalBackdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          display: grid;
          place-items: center;
          padding: 1rem;
          z-index: 1000;
        }
        .modal {
          width: min(720px, 100%);
          background: #fff;
          border-radius: 0.75rem;
          padding: 1rem;
          max-height: 90vh;
          overflow: auto;
        }
        .statusMessage {
          margin-top: 0.5rem;
          color: #333;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th,
        td {
          border: 1px solid #ddd;
          padding: 0.5rem;
          text-align: left;
        }
        @media (max-width: 1024px) {
          .grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 640px) {
          .dashboard {
            padding: 0.75rem;
          }
          .dashboardHeader {
            flex-direction: column;
            align-items: stretch;
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
