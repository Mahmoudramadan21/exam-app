import { Metadata } from "next";
import {
  CreateQuestionForm,
  CreateBulkQuestionForm,
} from "@/features/questions/components";
import { AppBreadcrumb } from "@/features/dashboard/layout";

// ===== Metadata =====
export const metadata: Metadata = {
  title: "Create New Question",
  description:
    "Add a new question to the exam, including question text, question type, options, and answer selection.",
};

interface PageProps {
  searchParams: Promise<{
    mode?: string;
    examId?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  // Get search params
  const params = await searchParams;

  // Get mode from search params
  const mode = params.mode;
  const examId = params.examId || "";

  // Render bulk question form if mode is bulk
  if (mode === "bulk") {
    return <CreateBulkQuestionForm examId={examId} />;
  }

  // Render single question form if mode is not bulk
  return (
    <>
      {/* ===== Breadcrumbs ===== */}
      <AppBreadcrumb
        items={[
          { label: "Exams", href: "/exams" },
          { label: "Create New Question" },
        ]}
      />

      {/* ===== Create Question Form ===== */}
      <CreateQuestionForm examId={examId} />
    </>
  );
}
