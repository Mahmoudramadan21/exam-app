import { IExam } from "../lib/types/exam";
import ExamItem from "./exam-item";

function ExamList({ exams, diplomaId }: { exams: IExam[]; diplomaId: string }) {
  // Empty state: when no exams are available
  if (!exams?.length) {
    return (
      <p className="text-center mt-10" role="status">
        No exams available
      </p>
    );
  }

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
