import Link from "next/link";
import { Button } from "@/shared/components/ui";
import { IExam } from "@/features/exams/lib/types/exam";
import { ExternalLink, PenLine, Trash2 } from "lucide-react";
import { DeleteExamModal, ImmutableExamModal } from "@/features/exams/components";

function AdminExamHeader({ exam }: { exam: IExam }) {
  return (
    <>
      {/* ===== Exam Header ===== */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 text-center px-4 py-2.5 bg-white overflow-hidden">
        {/* ===== Exam Title & Diploma Name ===== */}
        <div className="flex flex-col items-start">
          {/* Exam Title */}
          <h3 className="font-inter font-semibold text-lg text-black">
            {exam.title}
          </h3>

          {/* Exam Diploma Title */}
          <p className="font-inter  text-gray-400">
            Diploma:{" "}
            <Link
              href={`/diplomas/${exam.diploma.id}`}
              className="underline inline-flex items-center gap-1"
            >
              {exam.diploma.title}
              <ExternalLink size={14} />
            </Link>
          </p>
        </div>

        {/* ===== Exam Actions ===== */}
        <div className="grid grid-cols-[auto_auto_auto] items-center gap-2.5">
          {/* Immtable Exam */}
          <ImmutableExamModal examId={exam.id} immutable={!!exam.immutable} />

          {/* Edit Exam */}
          <Link
            href={`/exams/${exam.id}/edit`}
            className="px-4 py-3 h-12 w-fit flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 transition-colors duration-200 text-white "
          >
            <PenLine size={18} />
            Edit
          </Link>

          {/* Delete Exam */}
          <DeleteExamModal
            examId={exam.id}
            trigger={
              <Button variant="destructive">
                <Trash2 size={18} />
                Delete
              </Button>
            }
          />
        </div>
      </div>
    </>
  );
}

export default AdminExamHeader;
