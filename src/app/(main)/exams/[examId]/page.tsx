import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getExam } from "@/features/exams/lib/apis";
import { AdminExamDetails, AdminExamHeader } from "@/features/exams/components";
import { AppBreadcrumb } from "@/features/dashboard/layout";
import { AdminQuestionsTable } from "@/features/questions/components";
import { AdminQuestionsTableSkeleton } from "@/features/questions/lib/skeletons";

// ===== Metadata =====
export async function generateMetadata({
  params,
}: {
  params: Promise<{ examId: string }>;
}): Promise<Metadata> {
  // Get exam ID
  const { examId } = await params;

  // Fetch exam
  const { payload } = await getExam(examId);

  // Get exam
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
    description: `Manage and review questions for "${exam.title}", including editing, deleting, and adding new questions to the exam.`,
  };
}

type ExamPageProps = {
  params: Promise<{ examId: string }>;
};

export default async function ExamPage({ params }: ExamPageProps) {
  // Get exam ID from params
  const { examId } = await params;

  // Get exam by ID
  const { payload } = await getExam(examId);

  const exam = payload?.exam;

  // Handle exam not found
  if (!exam) {
    notFound();
  }

  return (
    <section className="flex flex-col gap-6">
      {/* ===== Breadcrumbs ===== */}
      <AppBreadcrumb
        items={[
          { label: "Exams", href: "/exams" },
          { label: exam.title, href: `/exams/${examId}` },
        ]}
      />

      {/* ===== Admin Exam Header ===== */}
      <AdminExamHeader exam={exam} />

      {/* ===== Admin Exam Details ===== */}
      <AdminExamDetails exam={exam} />

      {/* ===== Questions List ===== */}
      <Suspense fallback={<AdminQuestionsTableSkeleton />}>
        <AdminQuestionsTable examId={examId} />
      </Suspense>
    </section>
  );
}
