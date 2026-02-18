"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePortalStore } from "@/lib/store";

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = usePortalStore();

  useEffect(() => {
    logout();
    router.replace("/login");
  }, [logout, router]);

  return <p className="p-6">Logging out...</p>;
}
