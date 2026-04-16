import { ActivityItem, AidAward, CourseScheduleItem, GradeItem, MoneyState, NotificationItem } from "@/types/models";

export const user = {
  name: "Tarun Tata",
  netId: "tt580",
  ruid: "284761935",
  email: "tt580@scarletmail.rutgers.edu",
  college: "Newark College of Arts & Sciences",
  major: "Computer Science"
};

export const notifications: NotificationItem[] = [
  { id: "n1", title: "Tuition payment reminder", message: "Your spring payment is due in 5 days.", type: "billing", read: false, date: "2026-02-01", route: "/money" },
  { id: "n2", title: "Assignment graded", message: "Algorithms HW4 grade posted.", type: "course", read: false, date: "2026-01-29", route: "/courses?tab=grades" },
  { id: "n3", title: "Aid document required", message: "Upload tax transcript.", type: "aid", read: true, date: "2026-01-20", route: "/financial-aid?tab=docs" }
];

export const schedules: CourseScheduleItem[] = [
  { id: "s1", course: "Operating Systems", title: "Operating Systems", day: "Wednesday", time: "5:00 PM - 7:00 PM", location: "Busch Campus", term: "Spring 2026" },
  { id: "s2", course: "Machine Learning", title: "Machine Learning", day: "Thursday", time: "5:00 PM - 7:00 PM", location: "Busch Campus", term: "Spring 2026" },
  { id: "s3", course: "Computer Systems", title: "Computer Systems", day: "Friday", time: "5:00 PM - 7:00 PM", location: "Busch Campus", term: "Spring 2026" }
];

export const activities: ActivityItem[] = [
  { id: "a1", course: "Operating Systems", kind: "assignment", text: "HW3 submitted", date: "2026-02-05" },
  { id: "a2", course: "Machine Learning", kind: "grade", text: "Quiz 2 graded – 92/100", date: "2026-02-03" },
  { id: "a3", course: "Computer Systems", kind: "assignment", text: "Lab 4 due in 2 days", date: "2026-02-01" }
];

export const grades: GradeItem[] = [
  { id: "g1", course: "Operating Systems", major: "Computer Science", grade: "A-", credits: 6, instructor: "", term: "Spring 2026" },
  { id: "g2", course: "Machine Learning", major: "Computer Science", grade: "A", credits: 6, instructor: "", term: "Spring 2026" },
  { id: "g3", course: "Computer Systems", major: "Computer Science", grade: "A", credits: 3, instructor: "", term: "Spring 2026" },
  { id: "g4", course: "General Chemistry I", major: "Computer Science", grade: "B", credits: 6, instructor: "", term: "Fall 2025" },
  { id: "g5", course: "Data Structures", major: "Computer Science", grade: "A", credits: 6, instructor: "", term: "Fall 2025" },
  { id: "g6", course: "America in the 1960s", major: "Computer Science", grade: "B", credits: 6, instructor: "", term: "Fall 2025" },
  { id: "g7", course: "Data Structures", major: "Computer Science", grade: "B", credits: 6, instructor: "", term: "Spring 2025" },
  { id: "g8", course: "English Composition 102", major: "Computer Science", grade: "B", credits: 5, instructor: "", term: "Spring 2025" },
  { id: "g9", course: "Intro to Logic", major: "Computer Science", grade: "B", credits: 5, instructor: "", term: "Spring 2025" },
  { id: "g10", course: "Design Fundamentals", major: "Computer Science", grade: "C", credits: 5, instructor: "", term: "Fall 2024" },
  { id: "g11", course: "Computer&Program II", major: "Computer Science", grade: "B", credits: 5, instructor: "", term: "Fall 2024" },
  { id: "g12", course: "Intro to Sociology", major: "Computer Science", grade: "B", credits: 5, instructor: "", term: "Fall 2024" },
  { id: "g13", course: "Computer&Program I", major: "Unspecified (Matriculating)", grade: "B+", credits: 5, instructor: "", term: "Spring 2024" },
  { id: "g14", course: "History West Civ I", major: "Unspecified (Matriculating)", grade: "B", credits: 5, instructor: "", term: "Spring 2024" },
  { id: "g15", course: "Prin of Psychology 102", major: "Unspecified (Matriculating)", grade: "A", credits: 5, instructor: "", term: "Spring 2024" },
  { id: "g16", course: "Writing Workshop", major: "Unspecified (Matriculating)", grade: "U", credits: 6, instructor: "", term: "Fall 2023" },
  { id: "g17", course: "English Composition", major: "Unspecified (Matriculating)", grade: "D", credits: 6, instructor: "", term: "Fall 2023" },
  { id: "g18", course: "Hist Islamic Civ I", major: "Unspecified (Matriculating)", grade: "B", credits: 6, instructor: "", term: "Fall 2023" },
  { id: "g19", course: "Precalculus", major: "Unspecified (Matriculating)", grade: "A-", credits: 6, instructor: "", term: "Fall 2023" },
  { id: "g20", course: "Prin of Psychology", major: "Unspecified (Matriculating)", grade: "B+", credits: 6, instructor: "", term: "Fall 2023" }
];

export const money: MoneyState = {
  accountBalance: 2450,
  paymentDue: 1500,
  billableCredits: 15,
  transactions: [
    { id: "t1", date: "2026-01-12", description: "Tuition payment", amount: -1200 },
    { id: "t2", date: "2026-01-02", description: "Financial aid disbursement", amount: 2200 }
  ]
};

export const aidAwards: AidAward[] = [
  { id: "aw1", name: "Scarlet Promise Grant", amount: 3600, status: "Accepted", year: "2025-2026" },
  { id: "aw2", name: "Federal Direct Loan", amount: 3000, status: "Accepted", year: "2025-2026" }
];

export const helpFaq = [
  { q: "How do I report an absence?", a: "Use Course Schedule > Self Reporting Absence." },
  { q: "How do I view my transcript?", a: "Go to Grades > Unofficial Transcript." }
];
