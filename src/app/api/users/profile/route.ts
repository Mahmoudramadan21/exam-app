import { NextResponse } from "next/server";
import { getProfile } from "@/features/users/lib/apis";

export async function GET() {
  try {
    // ===== Call domain logic (get profile) =====
    const data = await getProfile();

    // ===== Return successful response =====
    return NextResponse.json(data);
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
