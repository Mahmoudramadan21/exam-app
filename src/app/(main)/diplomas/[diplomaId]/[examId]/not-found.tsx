import { NotFoundLayout } from "@/shared/layout";

export default async function DiplomaNotFoundPage() {
  return (
    <NotFoundLayout
      title="Exam Not Found"
      description="The exam you are trying to access does not exist or may have been removed from the platform."
      primaryHref={`/diplomas`}
      primaryLabel="Back to Diplomas"
      imageAlt="Diploma not found illustration"
    />
  );
}
