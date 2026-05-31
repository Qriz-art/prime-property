"use client";

import { useEffect, useState } from "react";

export default function AuthGuard({ children, allowedRole }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const response = await fetch("/api/me");
      const result = await response.json();

      if (!result.success || !result.user) {
        window.location.href = "/agent/login";
        return;
      }

      if (allowedRole && result.user.role !== allowedRole) {
        window.location.href = "/agent/dashboard";
        return;
      }

      setReady(true);
    }

    checkSession();
  }, [allowedRole]);

  if (!ready) {
    return (
      <main className="min-h-screen bg-[#1A1A1A] text-white flex items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  return children;
}