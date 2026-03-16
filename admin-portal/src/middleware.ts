import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Routes that require authentication
const PROTECTED_ROUTES = ["/dashboard"];

// Routes that should redirect to dashboard if already logged in
const AUTH_ROUTES = ["/"];

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET || "beersheba-fallback-secret-change-in-prod",
  });

  const { pathname } = request.nextUrl;

  // Check if route requires auth
  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  // If trying to access protected route without token → redirect to login
  if (isProtected && !token) {
    const loginUrl = new URL("/", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If already logged in and visiting login page → redirect to dashboard
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
