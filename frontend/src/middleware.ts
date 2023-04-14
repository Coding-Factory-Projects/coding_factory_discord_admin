import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/api") || //  exclude all API routes
    pathname.startsWith("/static") || // exclude static files
    pathname.includes(".") // exclude all files in the public folder
  ) {
    return NextResponse.next();
  }

  // let this go through
  if (pathname === "/") return NextResponse.next();

  const tokenCookie = req.cookies.get('token');
  
  if (!tokenCookie) {
    req.nextUrl.pathname = "/";
    return NextResponse.redirect(req.nextUrl);
  }

  // otherwise the header is present
  return NextResponse.next();
}
