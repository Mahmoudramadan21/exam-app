import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDiploma } from "@/features/diplomas/lib/apis";
import { AppBreadcrumb } from "@/features/dashboard/layout";
import { EditDiplomaForm } from "@/features/diplomas/components";

// ===== Metadata =====
export async function generateMetadata({
  params,
}: {
  params: Promise<{ diplomaId: string }>;
}): Promise<Metadata> {
  // Get Diploma ID
  const { diplomaId } = await params;

  // Fetch Diploma
  const { payload } = await getDiploma(diplomaId);

  // Get Diploma Data
  const diploma = payload?.diploma;

  // Not Found Diploma
  if (!diploma) {
    return {
      title: "Diploma Not Found",
      description: "The requested diploma could not be found.",
    };
  }

  // Return Metadata
  return {
    title: `Edit ${diploma.title}`,
    description:
      diploma.description ||
      `Update information for ${diploma.title}.`,
  };
}

export default async function EditDiplomaPage({
  params,
}: {
  params: Promise<{ diplomaId: string }>;
}) {
  // Get Diploma ID
  const { diplomaId } = await params;

  // Fetch Diploma
  const { payload } = await getDiploma(diplomaId);

  // Not Found
  if (!payload?.diploma) {
    notFound();
  }

  const diploma = payload.diploma;

  return (
    <div className="flex flex-col">
      <AppBreadcrumb
        items={[
          { label: "Diplomas", href: "/diplomas" },
          {
            label: `${diploma.title} Diploma`,
            href: `/diplomas/${diplomaId}`,
          },
          { label: "Edit" },
        ]}
      />

      <EditDiplomaForm
        diplomaId={diplomaId}
        diploma={diploma}
      />
    </div>
  );
}