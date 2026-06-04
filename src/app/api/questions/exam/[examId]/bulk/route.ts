import { NextRequest, NextResponse } from "next/server";
import { createQuestionBulkAction } from "@/features/questions/lib/actions";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ examId: string }> },
) {
  try {
    // ===== Extract exam id from params =====
    const { examId } = await params;

    // ===== Extract request body =====
    const body = await req.json();

    // ===== Call domain logic (create question bulk) =====
    const res = await createQuestionBulkAction({ examId, data: body });

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
