import { authOptions } from "@/auth";
import { imageSchema } from "@/shared/lib/schemes/image.schema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // ===== Get Auth Token =====
    const session = await getServerSession(authOptions);
    const token = session?.token;

    // ===== Check if token is valid =====
    if (!token) {
      return NextResponse.json(
        {
          status: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    // ===== Parse Form Data =====
    const formData = await req.formData();
    const file = formData.get("image");

    // ===== Validate Image =====
    const validation = imageSchema.safeParse({
      file,
    });

    // ===== Handle validation errors =====
    if (!validation.success) {
      return NextResponse.json(
        {
          status: false,
          message: validation.error.issues[0]?.message || "Invalid image",
        },
        { status: 400 },
      );
    }

    // ===== Check if file is a File instance =====
    if (!(file instanceof File)) {
      return NextResponse.json(
        { status: false, message: "Invalid file" },
        { status: 400 },
      );
    }

    // ===== Create Backend Form Data =====
    const validatedFile = validation.data.file;
    const backendFormData = new FormData();
    backendFormData.append("image", validatedFile);

    // ===== Upload Image =====
    const response = await fetch(`${process.env.BACKEND_URL}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: backendFormData,
    });

    // ===== Parse backend response =====
    const data = await response.json();

    // ===== Return response =====
    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    // ===== Handle unexpected errors =====
    return NextResponse.json(
      {
        status: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
