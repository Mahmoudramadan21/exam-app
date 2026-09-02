import { NotFoundLayout } from "@/shared/layout";

export default function ExamNotFoundPage() {
  return (
    <NotFoundLayout
      title="Exam Not Found"
      description="The exam you are trying to access does not exist, may have been removed, or is no longer available in this diploma."
      primaryHref="/exams"
      primaryLabel="Back to Exams"
      imageAlt="Exam not found illustration"
    />
  );
}
