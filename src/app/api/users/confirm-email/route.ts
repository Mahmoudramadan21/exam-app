import { NextRequest, NextResponse } from "next/server";
import { confirmUpdateEmailAction } from "@/features/users/lib/actions";

export async function POST(req: NextRequest) {
  try {
    // ===== Extract request body =====
    const body = await req.json();

    // ===== Call domain logic (confirm update email) =====
    const data = await confirmUpdateEmailAction(body);

    // ===== Return successful response =====
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
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
