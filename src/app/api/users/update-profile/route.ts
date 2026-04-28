import { updateProfileAction } from "@/features/user/lib/actions/update-profile";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    // ===== Extract request body =====
    const body = await req.json();

    // ===== Call domain logic (update profile) =====
    const data = await updateProfileAction(body);

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
