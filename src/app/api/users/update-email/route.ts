import { sendUpdateEmailAction } from "@/features/users/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // ===== Extract request body =====
    const body = await req.json();

    // ===== Call domain logic (send update email) =====
    const data = await sendUpdateEmailAction(body);

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
