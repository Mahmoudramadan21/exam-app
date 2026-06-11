import { notFound } from "next/navigation";
import { getQuestion } from "@/features/questions/lib/apis";
import { EditQuestionForm } from "@/features/questions/components";
import { AppBreadcrumb } from "@/features/dashboard/layout";
import { Metadata } from "next";

// ===== Metadata =====
// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ questionId: string }>;
// }): Promise<Metadata> {
//   // Get Diploma ID
//   const { questionId } = await params;

//   // Fetch Diploma
//   const { payload } = await getQuestion(questionId);

//   // Get Diploma Data
//   const question = payload?.question;

//   // Not Found Diploma
//   if (!question) {
//     return {
//       title: "Question Not Found",
//       description: "The requested question could not be found.",
//     };
//   }

//   // Return Metadata
//   return {
//     title: `Edit ${question.text}`,
//     description: question.text || `Update information for ${question.text}.`,
//   };
// }

export default async function EditQuestionPage({
  params,
}: {
  params: Promise<{ questionId: string }>;
}) {
  // Get question ID from params
  const { questionId } = await params;

  // Get question by ID
  const { payload } = await getQuestion(questionId);

  // Handle question not found
  if (!payload?.question) {
    notFound();
  }

  // Destructure question
  const question = payload.question;

  return (
    <>
      {/* ===== Breadcrumbs ===== */}
      <AppBreadcrumb
        items={[
          { label: "Exams", href: "/exams" },
          {
            label: question.exam?.title ?? "",
            href: `/exams/${question.examId}`,
          },
          { label: "Edit Question" },
        ]}
      />

      {/* ===== Edit Question Form ===== */}
      <EditQuestionForm question={question} />
    </>
  );
}
