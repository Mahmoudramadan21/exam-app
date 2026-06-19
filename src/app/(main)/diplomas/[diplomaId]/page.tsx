import {BookOpenCheck} from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import { PageBar } from "@/features/dashboard/components";
import { AppBreadcrumb } from "@/features/dashboard/layout";
import { getDiploma } from "@/features/diplomas/lib/apis";
import { AdminDiplomaDetails, AdminDiplomaHeader } from "@/features/diplomas/components";
import { ExamListSkeleton } from "@/features/exams/lib/skeletons";
import { ExamList } from "@/features/exams/components";
import { AppContainer } from "@/shared/components";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";

// ===== Metadata =====
export async function generateMetadata({
  params,
}: {
  params: Promise<{ diplomaId: string }>;
}): Promise<Metadata> {
  // Get diploma ID
  const { diplomaId } = await params;
  
  // Fetch diploma
  const { payload } = await getDiploma(diplomaId);
  const diploma = payload?.diploma;

  // Not found diploma
  if (!diploma) {
    return {
      title: "Diploma Not Found",
      description: "The requested diploma could not be found.",
    };
  }

  // Return diploma metadata
  return {
    title: diploma.title,
    description:
      diploma.description ||
      `View exams and learning materials for ${diploma.title}.`,
  };
}

export default async function DiplomaPage({
  params,
}: {
  params: Promise<{ diplomaId: string }>;
}) {
  // Get diploma ID
  const { diplomaId } = await params;
  
  // Fetch diploma
  const { payload: result } = await getDiploma(diplomaId);

  // Not found diploma
  if (!result?.diploma) {
    notFound();
  }

  // Get exams
  const exams = result?.diploma?.exams || [];

  // Get user session
  const jwt = await getNextAuthToken();
  
  // Check if user is admin
  const isAdmin = jwt?.user?.role === "ADMIN";

  return (
    <>
      {isAdmin ? (
        <section className="flex flex-col">
          <AppBreadcrumb
            items={[
              { label: "Diplomas", href: "/diplomas" },
              { label: result?.diploma?.title || "Diploma", href: `/diplomas/${diplomaId}` },
            ]}
          />
          {/* ===== Admin Diploma Header ===== */}
          <AdminDiplomaHeader diploma={result.diploma} />

          {/* ===== Admin Diploma Details ===== */}
          <AppContainer className="mt-6">
            <AdminDiplomaDetails diploma={result.diploma} />
          </AppContainer>
        </section>
      ) : (
        <>
          <AppBreadcrumb
            items={[
              { label: "Diplomas", href: "/diplomas" },
              { label: result?.diploma?.title || "Diploma", href: `/diplomas/${diplomaId}` },
              { label: "Exams"},
            ]}
          />

          <AppContainer>
          {/* ===== User Diploma Page Bar ===== */}
          <PageBar
            showBack
            icon={<BookOpenCheck className="size-7 md:size-11" />}
            title={`${result?.diploma?.title || "Diploma"} Exams`}
          />

          {/* ===== User Diploma Exams ===== */}
            <Suspense fallback={<ExamListSkeleton />}>
              <ExamList exams={exams} diplomaId={diplomaId} />
            </Suspense>
        </AppContainer>
        </>
      )}
    </>
  );
}
