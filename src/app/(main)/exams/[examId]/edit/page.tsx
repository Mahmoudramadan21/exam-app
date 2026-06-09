import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getExam } from "@/features/exams/lib/apis";
import { AppBreadcrumb } from "@/features/dashboard/layout";
import { EditExamForm } from "@/features/exams/components";
import {AdminQuestionsTable} from "@/features/questions/components";
import { AdminQuestionsTableSkeleton } from "@/features/questions/lib/skeletons";

// ===== Metadata =====
export async function generateMetadata({
  params,
}: {
  params: Promise<{ examId: string }>;
}): Promise<Metadata> {
  // Get Diploma ID
  const { examId } = await params;

  // Fetch Diploma
  const { payload } = await getExam(examId);

  // Exam Data
  const exam = payload?.exam;

  // Not Found
  if (!exam) {
    return {
      title: "Exam Not Found",
      description: "The requested exam could not be found.",
    };
  }

  // Return Metadata
  return {
    title: `Edit ${exam.title}`,
    description:exam.description || `Update information for ${exam.title}.`,
  };
}

export default async function EditExamPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  // Get Diploma ID
  const { examId } = await params;

  // Fetch Diploma
  const { payload } = await getExam(examId);

  // Not Found
  if (!payload?.exam) {
    notFound();
  }

  const exam = payload.exam;

  return (
    <div className="flex flex-col gap-6">
      {/* ===== Breadcrumb ===== */}
      <AppBreadcrumb
        items={[
          { label: "Exams", href: "/exams" },
          {
            label: `${exam.title} Exam`,
            href: `/exams/${examId}`,
          },
          { label: "Edit" },
        ]}
      />

      {/* ===== Edit Exam Form ===== */}
      <EditExamForm exam={exam} />

      {/* ===== Questions List ===== */}
      <Suspense fallback={<AdminQuestionsTableSkeleton />}>
        <AdminQuestionsTable examId={examId} />
      </Suspense>
    </div>
  );
}