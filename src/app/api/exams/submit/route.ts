import { NextRequest, NextResponse } from "next/server";
import { submitExamAction } from "@/features/exams/lib/actions";

export async function POST(req: NextRequest) {
  try {
    // ===== Extract request body =====
    const { examId, answers, startedAt } = await req.json();

    // ===== Call domain logic (submit exam) =====
    const res = await submitExamAction({ examId, answers, startedAt });

    return NextResponse.json(res);
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
