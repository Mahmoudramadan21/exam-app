import { userInfoStepAction } from "@/features/auth/lib/apis/auth.api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const message = await userInfoStepAction(payload);

    return NextResponse.json({ status: true, code: 201, message });
  } catch (error) {
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
