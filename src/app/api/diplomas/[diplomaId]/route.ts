// app/api/diplomas/[id]/route.ts

import { getDiplomaByIdAction } from "@/features/diplomas/lib/actions/get-diploma-by-id.action";
import { IDiplomaPayload } from "@/features/diplomas/lib/types/api";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ diplomaId: string }> },
) {
  const { diplomaId } = await params;

  const res = await getDiplomaByIdAction(diplomaId);

  const data = res.payload;

  return Response.json(data);
}
