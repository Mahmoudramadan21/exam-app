import { sendUpdateEmailAction } from "@/features/user/lib/actions/update-email";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // ===== Extract request body =====
    const body = await req.json();

    console.log(body);

    // ===== Call domain logic (update email) =====
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
