import { NotFoundLayout } from "@/shared/layout";

export default function NotFoundPage() {
  return (
    <NotFoundLayout
      title="Not Found"
      description="The Page you are trying to access does not exist or may have been removed from the platform."
      primaryHref="/diplomas"
      primaryLabel="Browse Diplomas"
      imageAlt="Page not found illustration"
    />
  );
}
