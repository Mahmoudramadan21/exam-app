import { submitExamAction } from "@/features/exams/lib/actions";

export async function POST(req: Request) {
  const { examId, answers, startedAt } = await req.json();
  const result = await submitExamAction({ examId, answers, startedAt });

  return Response.json(result);
}
