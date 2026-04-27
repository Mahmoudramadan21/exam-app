import { NextRequest, NextResponse } from "next/server";

import { userInfoStepAction } from "@/features/auth/lib/actions/register.action";

export async function POST(req: NextRequest) {
  try {
    // ===== Parse user registration final step payload =====
    const payload = await req.json();

    // ===== Create user / complete registration process =====
    const message = await userInfoStepAction(payload);

    // ===== Return success response (user created) =====
    return NextResponse.json({
      status: true,
      code: 201,
      message,
    });
  } catch (error) {
    // ===== Handle registration errors =====
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
