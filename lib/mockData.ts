import { ActivityItem, AidAward, CourseScheduleItem, GradeItem, MoneyState, NotificationItem } from "@/types/models";

export const user = {
  name: "Tarun Tata",
  netId: "tt580",
  ruid: "846209731",
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
  { id: "s1", course: "CS 513", title: "Operating Systems", day: "Wednesday", time: "5:00 PM - 7:00 PM", location: "Hill 116", term: "Spring 2026" },
  { id: "s2", course: "CS 536", title: "Machine Learning", day: "Thursday", time: "5:00 PM - 7:00 PM", location: "CoRE 302", term: "Spring 2026" },
  { id: "s3", course: "CS 214", title: "Computer Systems", day: "Friday", time: "5:00 PM - 7:00 PM", location: "Allison 203", term: "Spring 2026" }
];

export const activities: ActivityItem[] = [];

export const grades: GradeItem[] = [
  { id: "g1", course: "Operating Systems", major: "Computer Science", grade: "A", credits: 4, instructor: "Prof. Kim", term: "Spring 2026" },
  { id: "g2", course: "Machine Learning", major: "Computer Science", grade: "A-", credits: 4, instructor: "Prof. Iyer", term: "Spring 2026" },
  { id: "g3", course: "Computer Systems", major: "Computer Science", grade: "B+", credits: 4, instructor: "Prof. Rao", term: "Spring 2026" }
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
