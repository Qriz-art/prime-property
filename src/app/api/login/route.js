import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

const loginAttempts = new Map();

function getClientIp(request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkLoginRateLimit(request) {
  const ip = getClientIp(request);
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 10;

  const history = loginAttempts.get(ip) || [];
  const recentHistory = history.filter((time) => now - time < windowMs);

  if (recentHistory.length >= maxRequests) {
    return false;
  }

  loginAttempts.set(ip, [...recentHistory, now]);
  return true;
}


export async function POST(request) {
  try {
    if (!checkLoginRateLimit(request)) {
  return Response.json(
    {
      success: false,
      message: "Terlalu banyak percobaan login. Coba lagi sebentar.",
    },
    { status: 429 }
  );
}
    const body = await request.json();
    const { email, password } = body;

    const now = new Date();
    const windowMinutes = 30;
    const lockMinutes = 15;

    const { data, error } = await supabase
      .from("admins")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !data) {
      return Response.json({
        success: false,
        message: "Email tidak ditemukan",
      });
    }

    if (data.locked_until && new Date(data.locked_until) > now) {
      return Response.json({
        success: false,
        message:
          "Akun terkunci sementara karena terlalu banyak gagal login. Coba lagi nanti.",
      });
    }

    const isValidPassword = await bcrypt.compare(password, data.password);

    if (!isValidPassword) {
      const windowStart = data.failed_login_window_start
        ? new Date(data.failed_login_window_start)
        : null;

      const isSameWindow =
        windowStart &&
        now.getTime() - windowStart.getTime() <= windowMinutes * 60 * 1000;

      const nextFailedCount = isSameWindow
        ? (data.failed_login_count || 0) + 1
        : 1;

      const nextWindowStart = isSameWindow
        ? data.failed_login_window_start
        : now.toISOString();

      const shouldLock = nextFailedCount >= 5;

      await supabase
        .from("admins")
        .update({
          failed_login_count: shouldLock ? 0 : nextFailedCount,
          failed_login_window_start: shouldLock ? null : nextWindowStart,
          locked_until: shouldLock
            ? new Date(now.getTime() + lockMinutes * 60 * 1000).toISOString()
            : null,
        })
        .eq("id", data.id);

      return Response.json({
        success: false,
        message: shouldLock
          ? "Akun terkunci 15 menit karena 5 kali gagal login."
          : `Password salah. Percobaan gagal: ${nextFailedCount}/5`,
      });
    }

    await supabase
      .from("admins")
      .update({
        failed_login_count: 0,
        failed_login_window_start: null,
        locked_until: null,
      })
      .eq("id", data.id);

    const user = {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    };

    const response = NextResponse.json({
  success: true,
  user,
});

response.cookies.set({
  name: "prime_session",
  value: JSON.stringify(user),
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
});

return response;
  } catch (error) {
  return NextResponse.json({
    success: false,
    message: error.message || "Server error",
  });
}
}