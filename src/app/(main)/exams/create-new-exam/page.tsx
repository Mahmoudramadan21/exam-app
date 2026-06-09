import { Metadata } from "next";
import { AppBreadcrumb } from "@/features/dashboard/layout";
import { CreateExamForm } from "@/features/exams/components";

// ===== Metadata =====
export const metadata: Metadata = {
  title: "Create New Exam",
  description:
    "Design and create a new exam with custom settings, question pool, and exam structure.",
};

export default function CreateExamPage() {
  return (
    <>
      {/* ===== Breadcrumbs ===== */}
      <AppBreadcrumb
        items={[
          { label: "Exams", href: "/exams" },
          { label: "Create New Exam" },
        ]}
      />

      {/* ===== Create Exam Form ===== */}
      <CreateExamForm />
    </>
  );
}
