import { NextRequest, NextResponse } from "next/server";
import { getAllExams } from "@/features/exams/lib/apis";
import { createExamAction } from "@/features/exams/lib/actions";
import { getFilters } from "@/shared/lib/utils/get-filters";

export async function GET(req: NextRequest) {
  try {
    // ===== Extract search params =====
    const { searchParams } = new URL(req.url);

    // ===== Parse filters =====
    const params = getFilters(searchParams);

    // ===== Call domain logic (get all exams) =====
    const res = await getAllExams(params);

    return NextResponse.json(res);
  } catch (error) {
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

export async function POST(req: NextRequest) {
  try {
    // ===== Extract request body =====
    const body = await req.json();

    // ===== Call domain logic (create exam) =====
    const res = await createExamAction(body);

    return NextResponse.json(res);
  } catch (error) {
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
