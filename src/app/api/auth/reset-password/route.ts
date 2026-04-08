import { NextRequest, NextResponse } from "next/server";

import { resetPasswordAction } from "@/features/auth/lib/actions/reset-password.action";

export async function POST(req: NextRequest) {
  try {
    // ===== Parse request body =====
    const body = await req.json();

    // ===== Execute reset password domain logic =====
    const data = await resetPasswordAction(body);

    // ===== Return success response =====
    return NextResponse.json(data);
  } catch (error) {
    // ===== Handle errors consistently across auth APIs =====
    return NextResponse.json(
      {
        status: false,
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 400 },
    );
  }
}
