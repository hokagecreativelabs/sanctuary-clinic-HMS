import { NextResponse } from "next/server";

export function middleware(req) {
  console.log("🔹 Middleware is running...");

  const token = req.cookies.get("token")?.value; // Read token from cookies

  const isLoginPage = req.nextUrl.pathname.startsWith("/login");
  const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");

  if (!token && isDashboardPage) {
    console.log("🚨 No token found. Redirecting to /login...");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isLoginPage) {
    console.log("✅ User is authenticated. Redirecting to /dashboard...");
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
