import { NotFoundLayout } from "@/shared/layout";

export default function QuestionNotFoundPage() {
  return (
    <NotFoundLayout
      title="Question Not Found"
      description="The question you are trying to access does not exist, may have been removed, or is no longer available in this exam."
      primaryHref="/exams"
      primaryLabel="Back to Exams"
      imageAlt="Question not found illustration"
    />
  );
}
