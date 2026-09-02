import { NextRequest, NextResponse } from "next/server";
import {
  updateQuestionAction,
  deleteQuestionAction,
} from "@/features/questions/lib/actions";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ questionId: string }> },
) {
  try {
    // ===== Extract question id from params =====
    const { questionId } = await params;

    // ===== Extract question data from request body =====
    const body = await req.json();

    // ===== Call domain logic (update question) =====
    const res = await updateQuestionAction({ questionId, data: body });

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

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ questionId: string }>;
  },
) {
  try {
    // ===== Extract question id from params and body =====
    const { questionId } = await params;

    // ===== Call domain logic (delete question) =====
    const res = await deleteQuestionAction(questionId);

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
