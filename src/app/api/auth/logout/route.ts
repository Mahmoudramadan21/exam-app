// app/logout/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect(
    new URL("/account", process.env.NEXTAUTH_URL),
  );

  console.log("Logout hit");

  response.cookies.delete("next-auth.session-token");
  response.cookies.delete("__Secure-next-auth.session-token");

  console.log("Logout hit 2");

  return response;
}
