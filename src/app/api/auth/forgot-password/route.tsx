import { forgotPasswordAction } from "@/features/auth/lib/apis/auth.api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const data = await forgotPasswordAction(email);
    return NextResponse.json(data);
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
