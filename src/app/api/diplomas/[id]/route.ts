import { NextRequest, NextResponse } from "next/server";
import { getDiploma } from "@/features/diplomas/lib/apis";
import {
  updateDiplomaAction,
  deleteDiplomaAction,
} from "@/features/diplomas/lib/actions";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // ===== Extract diploma id from params =====
    const { id } = await params;

    // ===== Call domain logic (get diploma) =====
    const res = await getDiploma(id);

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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // ===== Extract diploma id from params =====
    const { id } = await params;

    // ===== Extract diploma data from request body =====
    const body = await req.json();

    // ===== Call domain logic (update diploma) =====
    const res = await updateDiplomaAction({ diplomaId: id, data: body });

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
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // ===== Extract diploma id from params =====
    const { id } = await params;

    // ===== Call domain logic (delete diploma) =====
    const res = await deleteDiplomaAction(id);

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
