import PageBar from "@/features/dashboard/components/page-bar";
import { getDiplomaByIdAction } from "@/features/diplomas/lib/actions";
import ExamList from "@/features/exams/components/exam-list";
import ExamListSkeleton from "@/features/exams/lib/skeletons/exam-list-skeleton";
import { BookOpenCheck } from "lucide-react";
import { Suspense } from "react";

export default async function DiplomaPage({
  params,
}: {
  params: Promise<{ diplomaId: string }>;
}) {
  const { diplomaId } = await params;
  const result = await getDiplomaByIdAction(diplomaId);

  const exams = (result.status && result?.payload?.diploma?.exams) || [];

  return (
    <>
      <PageBar
        showBack
        icon={<BookOpenCheck className="size-11" />}
        title={`${result.payload?.diploma?.title || "Diploma"} Exams`}
      />
      <Suspense fallback={<ExamListSkeleton />}>
        <ExamList exams={exams} diplomaId={diplomaId} />
      </Suspense>
    </>
  );
}
