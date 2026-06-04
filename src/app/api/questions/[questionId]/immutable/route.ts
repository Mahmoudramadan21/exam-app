import { NextRequest, NextResponse } from "next/server";
import { immutableQuestionAction } from "@/features/questions/lib/actions";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ questionId: string }> },
) {
  try {
    // ===== Extract question id from params =====
    const { questionId: id } = await params;

    // ===== Extract request body =====
    const { immutable } = await req.json();

    // ===== Call domain logic (immutable question) =====
    const res = await immutableQuestionAction({ id, immutable });

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
