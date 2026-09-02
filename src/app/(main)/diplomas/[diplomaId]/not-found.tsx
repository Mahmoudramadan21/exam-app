import { NotFoundLayout } from "@/shared/layout";

export default function DiplomaNotFoundPage() {
  return (
    <NotFoundLayout
      title="Diploma Not Found"
      description="The diploma you are trying to access does not exist or may have been removed from the platform."
      primaryHref="/diplomas"
      primaryLabel="Browse Diplomas"
      imageAlt="Diploma not found illustration"
    />
  );
}
