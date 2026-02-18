"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/app/components/AppShell";
import { usePortalStore } from "@/lib/store";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { session } = usePortalStore();

  useEffect(() => {
    if (!session) router.replace("/login");
  }, [session, router]);

  return <AppShell>{children}</AppShell>;
}
