import { AppBreadcrumb } from "@/features/dashboard/layout";
import { CreateDiplomaForm } from "@/features/diplomas/components";
import type { Metadata } from "next";

// ===== Metadata =====
export const metadata: Metadata = {
  title: "Create New Diploma",
  description:
    "Create a new diploma program by adding its title, description, and featured image.",
};

export default function CreateDiplomaPage() {
  return (
    <>
      <AppBreadcrumb
        items={[
          { label: "Diplomas", href: "/diplomas" },
          { label: "Add New Diploma" },
        ]}
      />
      <CreateDiplomaForm />
    </>
  );
}
