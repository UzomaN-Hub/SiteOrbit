import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/projects",
  "/builder",
  "/analytics",
  "/team",
  "/templates",
  "/domains",
  "/settings",
];

const publicAuthRoutes = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/accept-invite",
];

function matchesRoute(pathname: string, routes: string[]) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export default function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasToken = Boolean(
    request.cookies.get("siteorbit_access_token")?.value
  );

  if (matchesRoute(pathname, protectedRoutes) && !hasToken) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("redirect", `${pathname}${search}`);
    return NextResponse.redirect(signInUrl);
  }

  if (matchesRoute(pathname, publicAuthRoutes) && hasToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/projects/:path*",
    "/builder/:path*",
    "/analytics/:path*",
    "/team/:path*",
    "/templates/:path*",
    "/domains/:path*",
    "/settings/:path*",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/accept-invite",
  ],
};