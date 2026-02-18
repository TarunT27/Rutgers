export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  type: "billing" | "course" | "aid";
  read: boolean;
  date: string;
  route: string;
};

export type CourseScheduleItem = {
  id: string;
  course: string;
  title: string;
  day: string;
  time: string;
  location: string;
  term: string;
};

export type ActivityItem = {
  id: string;
  course: string;
  kind: "assignment" | "grade";
  text: string;
  date: string;
};

export type GradeItem = {
  id: string;
  course: string;
  major: string;
  grade: string;
  credits: number;
  instructor: string;
  term: string;
};

export type MoneyState = {
  accountBalance: number;
  paymentDue: number;
  billableCredits: number;
  transactions: Array<{ id: string; date: string; description: string; amount: number }>;
};

export type AidAward = {
  id: string;
  name: string;
  amount: number;
  status: "Accepted" | "Pending";
  year: string;
};
