import type { IExam } from "@/features/exams/lib/types/exam";
import { ExamItem } from "@/features/exams/components";

// Component Props
interface IExamListProps {
  exams: IExam[];
  diplomaId: string;
}

function ExamList({ exams, diplomaId }: IExamListProps) {
  return (
    // Exams grid container
    <section aria-label="Diploma exams">
      {/* Renders list of available exams */}
      <div className="grid grid-cols-1 gap-6">
        {exams.map((exam) => (
          <ExamItem exam={exam} diplomaId={diplomaId} />
        ))}
      </div>
    </section>
  );
}

export default ExamList;
