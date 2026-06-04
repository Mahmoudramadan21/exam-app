import { NextRequest, NextResponse } from "next/server";
import { createQuestionAction } from "@/features/questions/lib/actions";
import { getExamQuestions } from "@/features/questions/lib/apis";
import { getFilters } from "@/shared/lib/utils/get-filters";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ examId: string }> },
) {
  try {
    // ===== Extract exam id from params =====
    const { examId } = await params;

    // ===== Extract query params =====
    const { searchParams } = new URL(req.url);

    const filters = getFilters(searchParams);

    // ===== Call domain logic (get exam questions) =====
    const res = await getExamQuestions(examId, filters);

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

export async function POST(
  req: Request,
  { params }: { params: Promise<{ examId: string }> },
) {
  try {
    // ===== Extract exam id from params =====
    const { examId } = await params;

    // ===== Extract request body =====
    const body = await req.json();

    // ===== Call domain logic (create question) =====
    const res = await createQuestionAction({ examId, data: body });

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
