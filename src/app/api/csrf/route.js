import { NextResponse } from "next/server";

export async function GET() {
  const token = crypto.randomUUID();

  const response = NextResponse.json({
    success: true,
    csrfToken: token,
  });

  response.cookies.set({
    name: "prime_csrf",
    value: token,
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  });

  return response;
}