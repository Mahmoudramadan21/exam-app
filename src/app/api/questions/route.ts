import { NextRequest, NextResponse } from "next/server";
import { createQuestionAction } from "@/features/questions/lib/actions";

export async function POST(req: NextRequest) {
  try {
    // ===== Extract request body =====
    const body = await req.json();

    // ===== Call domain logic (create question) =====
    const res = await createQuestionAction(body);

    // ===== Return response =====
    return NextResponse.json(res);
  } catch (error) {
    // ===== Handle unexpected or known errors =====
    return NextResponse.json(
      {
        status: false,
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
