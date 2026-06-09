import { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppBreadcrumb } from "@/features/dashboard/layout";
import { getQuestion } from "@/features/questions/lib/apis";
import {
  AdminQuestionDetails,
  AdminQuestionHeader,
} from "@/features/questions/components";

// ===== Metadata =====
export async function generateMetadata({
  params,
}: {
  params: Promise<{ questionId: string }>;
}): Promise<Metadata> {
  // Get question ID
  const { questionId } = await params;

  // Fetch question
  const { payload: questionResult } = await getQuestion(questionId);

  // Get question
  const question = questionResult?.question;

  // Not found question
  if (!question) {
    return {
      title: "Question Not Found",
      description: "The requested question could not be found.",
    };
  }

  // Return question metadata
  return {
    title: question.text,
    description: `Review and manage question "${question.text}", including question details, options, and answer settings.`,
  };
}

type PageProps = {
  params: Promise<{ questionId: string }>;
};

export default async function Page({ params }: PageProps) {
  // Get question id
  const { questionId } = await params;

  // Fetch question
  const { payload: questionResult } = await getQuestion(questionId);

  // Get question
  const question = questionResult?.question;

  // Not found question
  if (!question) {
    return notFound();
  }

  return (
    <section className="flex flex-col gap-6">
      {/* ===== Breadcrumbs ===== */}
      <AppBreadcrumb
        items={[
          { label: "Exams", href: "/exams" },
          {
            label: question.exam?.title || "Untitled Exam",
            href: `/exams/${question.exam?.id}`,
          },
          { label: "Questions", href: `/exams/${question.exam?.id}` },
          { label: question.text, href: `/exams/${question.id}` },
        ]}
      />

      {/* ===== Question Header ===== */}
      <AdminQuestionHeader question={question} />

      {/* ===== Question Content ===== */}
      <AdminQuestionDetails question={question} />
    </section>
  );
}
