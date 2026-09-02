import { NextRequest, NextResponse } from "next/server";
import { getFilters } from "@/shared/lib/utils/get-filters";
import { getAllDiplomas } from "@/features/diplomas/lib/apis";
import { createDiplomaAction } from "@/features/diplomas/lib/actions";

export async function GET(req: NextRequest) {
  try {
    // Extract search params
    const { searchParams } = new URL(req.url);

    // Parse filters
    const params = getFilters(searchParams);

    // Call domain logic (get all diplomas)
    const res = await getAllDiplomas(params);

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Extract body
    const body = await req.json();

    // Call domain logic (create diploma)
    const res = await createDiplomaAction(body);

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
