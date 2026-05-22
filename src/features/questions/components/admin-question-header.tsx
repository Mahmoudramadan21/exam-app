import Link from "next/link";
import {
  DeleteQuestionModal,
  ImmutableQuestionModal,
} from "@/features/questions/components";
import { Button } from "@/shared/components/ui";
import { ExternalLink, PenLine, Trash2 } from "lucide-react";
import { IQuestion } from "@/features/questions/lib/types/question";

function AdminQuestionHeader({ question }: { question: IQuestion }) {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 text-center px-4 py-2.5 bg-white overflow-hidden">
      {/* Question Title & Exam Name */}
      <div className="flex flex-col items-start">
        {/* Question Title */}
        <h3 className="font-semibold text-lg text-black">{question?.text}</h3>

        {/* Exam Title */}
        <p className="text-gray-400">
          Exam:{" "}
          <Link
            href={`/exams/${question.examId}`}
            className="underline inline-flex items-center gap-1"
          >
            {question?.exam?.title}
            <ExternalLink size={14} />
          </Link>
        </p>
      </div>

      {/* ===== Question Actions ===== */}
      <div className="grid grid-cols-[auto_auto_auto] items-center gap-2.5">
        {/* Immtable Question */}
        <ImmutableQuestionModal
          questionId={question.id}
          immutable={question?.immutable ?? false}
        />

        {/* Edit Question */}
        <Link
          href={`/questions/${question.id}/edit`}
          className="px-4 py-3 h-12 w-fit flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 transition-colors duration-200 text-white "
        >
          <PenLine size={18} />
          Edit
        </Link>

        {/* Delete Question */}
        <DeleteQuestionModal
          questionId={question.id}
          trigger={
            <Button variant="destructive">
              <Trash2 size={18} />
              Delete
            </Button>
          }
        />
      </div>
    </div>
  );
}

export default AdminQuestionHeader;
