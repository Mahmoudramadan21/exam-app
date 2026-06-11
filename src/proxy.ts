import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { ROUTES } from "./routes";

function hasAccess(pathname: string, routes: RegExp[]) {
  return routes.some((route) => route.test(pathname));
}

export default async function proxy(request: NextRequest) {
  const token = await getToken({ req: request });
  const pathname = request.nextUrl.pathname;

  console.log(token);
  console.log(pathname);

  // Auth Pages
  if (ROUTES.auth.includes(pathname)) {
    if (token) {
      return NextResponse.redirect(new URL("/diplomas", request.url));
    }

    return NextResponse.next();
  }

  // Not Logged In
  if (!token) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(loginUrl);
  }

  // Admin
  if (token.user.role === "ADMIN") {
    if (hasAccess(pathname, ROUTES.admin)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/diplomas", request.url));
  }

  // User
  if (token.user.role === "USER") {
    if (hasAccess(pathname, ROUTES.user)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/diplomas", request.url));
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images).*)",
  ],
};
