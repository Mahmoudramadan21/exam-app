import { Metadata } from "next";
import { AppBreadcrumb } from "@/features/dashboard/layout";
import { AdminExamsTable } from "@/features/exams/components";

// ===== Metadata =====
export const metadata: Metadata = {
  title: "Exams",
  description:
    "Manage and administer exams, including exam creation, question management, and exam settings.",
};

export default function Page() {
  return (
    <>
      {/* ===== Breadcrumbs ===== */}
      <AppBreadcrumb items={[{ label: "Exams" }]} />

      {/* ===== Exams Table ===== */}
      <AdminExamsTable />
    </>
  );
}
