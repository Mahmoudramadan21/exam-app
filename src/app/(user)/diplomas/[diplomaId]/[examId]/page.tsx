import { getExamAction } from "@/features/exams/lib/actions";
import { getExamQuestions } from "@/features/questions/lib/actions/question.action";
import ExamPageClient from "./exam-page-client";
import { Suspense } from "react";
import PageBar from "@/features/dashboard/components/page-bar";
import { CircleQuestionMark } from "lucide-react";

async function ExamPage({
  params,
}: {
  params: Promise<{
    examId: string;
  }>;
}) {
  const { examId } = await params;
  const { exam } = await getExamAction(examId);
  const { questions } = await getExamQuestions(examId);

  return (
    <>
      <PageBar
        showBack
        icon={<CircleQuestionMark className="size-11" />}
        title={`${exam?.title || "Exam"}`}
      />
      <Suspense
        fallback={<div className="mx-auto my-10 italic">Loading Exam...</div>}
      >
        <ExamPageClient exam={exam} examQuestions={questions} />
      </Suspense>
    </>
  );
}

export default ExamPage;
