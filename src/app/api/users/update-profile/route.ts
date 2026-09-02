import { NextRequest, NextResponse } from "next/server";
import { updateProfileAction } from "@/features/users/lib/actions";

export async function PATCH(req: NextRequest) {
  try {
    // Extract request body
    const body = await req.json();

    // Call domain logic (update profile)
    const data = await updateProfileAction(body);

    // Return successful response
    return NextResponse.json(data);
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
