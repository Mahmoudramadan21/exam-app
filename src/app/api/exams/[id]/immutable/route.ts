import { NextRequest, NextResponse } from "next/server";
import { immutableExamAction } from "@/features/exams/lib/actions";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // ===== Extract exam id from params =====
    const { id } = await params;

    // ===== Parse request body =====
    const body = await req.json();

    // ===== Call domain logic (immutable exam) =====
    const res = await immutableExamAction({ id, immutable: body.immutable });

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
