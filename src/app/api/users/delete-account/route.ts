import { NextResponse } from "next/server";
import { deleteAccountAction } from "@/features/users/lib/actions";

export async function DELETE() {
  try {
    // ===== Call domain logic (delete account) =====
    const data = await deleteAccountAction();

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
