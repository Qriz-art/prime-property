import { NextResponse } from "next/server";

export function proxy(request) {
  const session = request.cookies.get("prime_session");

  const protectedRoutes = [
    "/agent/dashboard",
    "/agent/admin-management",
    "/agent/audit-log",
  ];

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !session) {
    return NextResponse.redirect(
      new URL("/agent/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/agent/dashboard/:path*",
    "/agent/admin-management/:path*",
    "/agent/audit-log/:path*",
  ],
};