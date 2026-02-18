"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NotificationItem } from "@/types/models";

type Bookmark = { label: string; url: string };
type Reminder = { title: string; date: string };
type Note = { text: string };

type PortalState = {
  session: boolean;
  demoData: boolean;
  hideMoney: boolean;
  hideGpa: boolean;
  sidebarCollapsed: boolean;
  notifications: NotificationItem[];
  bookmarks: Bookmark[];
  reminders: Reminder[];
  notes: Note[];
  absences: Array<{ date: string; course: string; reason: string }>;
  login: () => void;
  logout: () => void;
  setDemoData: (v: boolean) => void;
  setHideMoney: (v: boolean) => void;
  setHideGpa: (v: boolean) => void;
  setSidebarCollapsed: (v: boolean) => void;
  setNotifications: (v: NotificationItem[]) => void;
  markNotificationRead: (id: string) => void;
  addBookmark: (bookmark: Bookmark) => void;
  addReminder: (rem: Reminder) => void;
  addNote: (note: Note) => void;
  addAbsence: (absence: { date: string; course: string; reason: string }) => void;
};

export const usePortalStore = create<PortalState>()(
  persist(
    (set) => ({
      session: true,
      demoData: true,
      hideMoney: false,
      hideGpa: false,
      sidebarCollapsed: false,
      notifications: [],
      bookmarks: [],
      reminders: [],
      notes: [],
      absences: [],
      login: () => set({ session: true }),
      logout: () => set({ session: false }),
      setDemoData: (v) => set({ demoData: v }),
      setHideMoney: (v) => set({ hideMoney: v }),
      setHideGpa: (v) => set({ hideGpa: v }),
      setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
      setNotifications: (v) => set({ notifications: v }),
      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
      })),
      addBookmark: (bookmark) => set((s) => ({ bookmarks: [...s.bookmarks, bookmark] })),
      addReminder: (rem) => set((s) => ({ reminders: [...s.reminders, rem] })),
      addNote: (note) => set((s) => ({ notes: [...s.notes, note] })),
      addAbsence: (absence) => set((s) => ({ absences: [...s.absences, absence] }))
    }),
    {
      name: "rutgers-portal-store",
      partialize: (state) => ({
        session: state.session,
        demoData: state.demoData,
        hideMoney: state.hideMoney,
        hideGpa: state.hideGpa,
        sidebarCollapsed: state.sidebarCollapsed,
        bookmarks: state.bookmarks,
        reminders: state.reminders,
        notes: state.notes,
        absences: state.absences
      })
    }
  )
);
