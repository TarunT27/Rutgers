"use client";

import { useRouter } from "next/navigation";
import { usePortalStore } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const { login } = usePortalStore();

  return (
    <div className="grid min-h-screen place-items-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow">
        <h1 className="mb-2 text-2xl font-bold text-rutgers">Rutgers Portal Login</h1>
        <p className="mb-4 text-sm text-slate-600">Demo login for prototype.</p>
        <button
          className="w-full rounded bg-rutgers px-4 py-2 text-white"
          onClick={() => {
            login();
            router.push("/dashboard");
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
