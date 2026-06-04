import { NextRequest, NextResponse } from "next/server";
import { immutableDiplomaAction } from "@/features/diplomas/lib/actions";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // ===== Extract diploma id from params and body =====
    const { id } = await params;
    const body = await req.json();

    // ===== Call domain logic (immutable diploma) =====
    const res = await immutableDiplomaAction({ id, immutable: body.immutable });

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
