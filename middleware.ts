import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect /user to /user/dashboard
  if (pathname === "/user") {
    const url = request.nextUrl.clone();
    url.pathname = "/user/dashboard";
    return NextResponse.redirect(url);
  }

  // Redirect /user/settings to /user/settings/profile
  if (pathname === "/user/settings") {
    const url = request.nextUrl.clone();
    url.pathname = "/user/settings/profile";
    return NextResponse.redirect(url);
  }
  // Redirect /user to /user/dashboard
  if (pathname === "/admin") {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  // Redirect /user/settings to /user/settings/profile
  if (pathname === "/admin/settings") {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/settings/profile";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
