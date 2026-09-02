import { NextRequest, NextResponse } from "next/server";
import { getExam } from "@/features/exams/lib/apis";
import {
  updateExamAction,
  deleteExamAction,
} from "@/features/exams/lib/actions";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Extract exam id from params
    const { id } = await params;

    // Call domain logic (get exam)
    const res = await getExam(id);

    return NextResponse.json(res);
  } catch (error) {
    // Handle unexpected or known errors
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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Extract exam id from params
    const { id } = await params;

    // Extract exam data from request body
    const body = await req.json();

    // Call domain logic (update exam)
    const res = await updateExamAction({ examId: id, data: body });

    return NextResponse.json(res);
  } catch (error) {
    // Handle unexpected or known errors
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
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Extract exam id from params
    const { id } = await params;

    // Call domain logic (delete exam)
    const res = await deleteExamAction(id);

    return NextResponse.json(res);
  } catch (error) {
    // Handle unexpected or known errors
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
