import { NextRequest } from "next/server";
import { getExamAction } from "@/features/exams/lib/actions/get-exam.action";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const data = await getExamAction(id);

  return Response.json(data);
}
