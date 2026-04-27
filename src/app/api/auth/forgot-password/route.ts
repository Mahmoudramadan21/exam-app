import { NextRequest, NextResponse } from "next/server";

import { forgotPasswordAction } from "@/features/auth/lib/actions/forgot-password.action";

export async function POST(req: NextRequest) {
  try {
    // ===== Extract request body =====
    const { email } = await req.json();

    // ===== Call domain logic (send reset email) =====
    const data = await forgotPasswordAction(email);

    // ===== Return successful response =====
    return NextResponse.json(data);
  } catch (error) {
    // ===== Handle unexpected or known errors =====
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
