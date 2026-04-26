import { confirmOtpStepAction } from "@/features/auth/lib/apis/auth.api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const data = await confirmOtpStepAction(body);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 400 },
    );
  }
}
