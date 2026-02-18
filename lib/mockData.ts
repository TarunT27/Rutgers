import { ActivityItem, AidAward, CourseScheduleItem, GradeItem, MoneyState, NotificationItem } from "@/types/models";

export const user = {
  name: "Tarun Tata",
  netId: "tt123",
  ruid: "123456789",
  email: "tarun.tata@rutgers.edu",
  college: "Newark College of Arts & Sciences",
  major: "Computer Science"
};

export const notifications: NotificationItem[] = [
  { id: "n1", title: "Tuition payment reminder", message: "Your spring payment is due in 5 days.", type: "billing", read: false, date: "2026-02-01", route: "/money" },
  { id: "n2", title: "Assignment graded", message: "Algorithms HW4 grade posted.", type: "course", read: false, date: "2026-01-29", route: "/courses?tab=grades" },
  { id: "n3", title: "Aid document required", message: "Upload tax transcript.", type: "aid", read: true, date: "2026-01-20", route: "/financial-aid?tab=docs" }
];

export const schedules: CourseScheduleItem[] = [
  { id: "s1", course: "CS 352", title: "Internet Technology", day: "Mon/Wed", time: "10:20 AM", location: "Hill 116", term: "Spring 2026" },
  { id: "s2", course: "MATH 477", title: "Mathematical Probability", day: "Tue/Thu", time: "1:10 PM", location: "Allison 203", term: "Spring 2026" }
];

export const activities: ActivityItem[] = [
  { id: "a1", course: "CS 352", kind: "assignment", text: "Assignment 2 submitted", date: "2026-02-03" },
  { id: "a2", course: "CS 352", kind: "grade", text: "Quiz 4 graded", date: "2026-02-02" }
];

export const grades: GradeItem[] = [
  { id: "g1", course: "Data Structures", major: "Computer Science", grade: "A", credits: 4, instructor: "Prof. Kim", term: "Fall 2025" },
  { id: "g2", course: "Algorithms", major: "Computer Science", grade: "A-", credits: 4, instructor: "Prof. Iyer", term: "Fall 2025" },
  { id: "g3", course: "Database Systems", major: "Computer Science", grade: "B+", credits: 3, instructor: "Prof. Rao", term: "Fall 2025" },
  { id: "g4", course: "Operating Systems", major: "Computer Science", grade: "A", credits: 4, instructor: "Prof. Diaz", term: "Fall 2025" }
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
  { id: "aw1", name: "Scarlet Promise Grant", amount: 12000, status: "Accepted", year: "2025-2026" },
  { id: "aw2", name: "Federal Direct Loan", amount: 3000, status: "Accepted", year: "2025-2026" }
];

export const helpFaq = [
  { q: "How do I report an absence?", a: "Use Course Schedule > Self Reporting Absence." },
  { q: "How do I view my transcript?", a: "Go to Grades > Unofficial Transcript." }
];
