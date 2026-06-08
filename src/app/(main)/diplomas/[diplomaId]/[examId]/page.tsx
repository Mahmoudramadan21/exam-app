import { CircleQuestionMark } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getExam } from "@/features/exams/lib/apis";
import { getExamQuestions } from "@/features/questions/lib/apis";
import { PageBar } from "@/features/dashboard/components";
import { AppBreadcrumb } from "@/features/dashboard/layout";
import ExamPageClient from "./exam-page-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ examId: string }>;
}): Promise<Metadata> {
  // Get exam id
  const { examId } = await params;

  // Fetch exam
  const { payload } = await getExam(examId);

  const exam = payload?.exam;

  // Not found exam
  if (!exam) {
    return {
      title: "Exam Not Found",
      description: "The requested exam could not be found.",
    };
  }

  // Return exam metadata
  return {
    title: exam.title,
    description: `Attempt the ${exam.title} exam, answer questions in real time, and track your performance with instant results.`,
  };
}

export default async function ExamPage({
  params,
}: {
  params: Promise<{
    examId: string;
  }>;
}) {
  // Get exam id
  const { examId } = await params;

  // Fetch exam and questions
  const { payload: examResult } = await getExam(examId);
  const { payload: questionsResult } = await getExamQuestions(examId);

  // Not found exam
  if (!examResult?.exam || !questionsResult?.questions.length) {
    notFound();
  }

  return (
    <>
      <AppBreadcrumb
        items={[
          { label: "Diplomas", href: "/diplomas" },
          {
            label: examResult?.exam?.diploma?.title || "Diploma",
            href: `/diplomas/${examResult?.exam?.diploma?.id}`,
          },
          {
            label: examResult?.exam?.title || "Exam",
            href: `/diplomas/${examResult?.exam?.diploma?.id}/${examResult?.exam?.id}`,
          },
        ]}
      />
      <PageBar
        showBack
        icon={<CircleQuestionMark className="size-11" />}
        title={`${examResult?.exam?.title || "Exam"}`}
      />
      <ExamPageClient
        exam={examResult?.exam}
        examQuestions={questionsResult?.questions}
      />
    </>
  );
}
