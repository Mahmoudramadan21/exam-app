import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import { PageBar } from "@/features/dashboard/components";
import { AppBreadcrumb } from "@/features/dashboard/layout";
import {DiplomaList, AdminDiplomasTable} from "@/features/diplomas/components";

// ===== Metadata =====
export const metadata: Metadata = {
  title: "Diplomas",
  description:
    "Explore diploma programs, access exams, and manage diploma content and learning resources.",
};

export default async function Page() {
  // Get user session
  const session = await getServerSession(authOptions);

  // Check if user is admin
  const isAdmin = session?.user?.role === "ADMIN";

  // ===== Render admin diplomas if user is admin =====
  if (isAdmin) {
    return (
      <>
        {/* BreadCrumb */}
        <AppBreadcrumb
          items={[
            { label: "Diplomas", href: "/diplomas" },
          ]}
        />
        
        {/* Admin Diplomas Table */}
        <AdminDiplomasTable />
      </>
    );
  }

  // ===== Render user diplomas if user is not admin =====
  return (
    <>
      {/* BreadCrumb */}
      <AppBreadcrumb
        items={[
          { label: "Diplomas", href: "/diplomas" },
        ]}
      />

      {/* Page Bar */}
      <PageBar
        showBack
        icon={<GraduationCap className="size-11" />}
        title="Diplomas"
      />

      {/* Diploma List */}
      <DiplomaList />
    </>
  );
}
