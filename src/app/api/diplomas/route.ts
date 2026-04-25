// app/api/diplomas/route.ts
import { getAllDiplomasAction } from "@/features/diplomas/lib/actions";

// app/api/diplomas/route.ts
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 6);

  const data = await getAllDiplomasAction({
    page,
    limit,
  });

  return Response.json(data);
}
