"use client";

import { useEffect, useState } from "react";

export default function AuthGuard({ children, allowedRole }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("prime_user");

    if (!storedUser) {
      window.location.href = "/agent/login";
      return;
    }

    const user = JSON.parse(storedUser);

    if (allowedRole && user.role !== allowedRole) {
      window.location.href = "/agent/dashboard";
      return;
    }

    setReady(true);
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