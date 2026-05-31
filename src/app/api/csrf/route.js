import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  const token = crypto.randomUUID();

  const response = NextResponse.json({
    csrfToken: token,
  });

  response.cookies.set({
    name: "csrf_token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return response;
}