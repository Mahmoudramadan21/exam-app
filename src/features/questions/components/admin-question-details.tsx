import Link from "next/link";
import { IQuestion } from "@/features/questions/lib/types/question";
import { ExternalLink } from "lucide-react";

function AdminQuestionDetails({ question }: { question: IQuestion }) {
  return (
    <article
      aria-labelledby="question-title"
      className="flex flex-col bg-white p-4 gap-4 text-sm"
    >
      {/* Question Text */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
        <span className=" text-gray-400">Headline</span>
        <h3 id="question-title" className=" font-geist-mono text-black">
          {question?.text}
        </h3>
      </div>

      {/* Exam Description */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
        <span className=" text-gray-400">Description</span>
        <p className="font-geist-mono leading-6 text-gray-800"></p>
      </div>

      {/* Exam Title */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
        <span className=" text-gray-400">Exam</span>
        <Link
          href={`/exams/${question.examId}`}
          className="font-geist-mono inline-flex items-center gap-1.5 hover:underline"
        >
          {question?.exam?.title}
          <ExternalLink size={14} />
        </Link>
      </div>

      {/* Question Answers Count */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
        <span className=" text-gray-400">Answers</span>
        <p
          id="exam-title"
          className="fontleading-6 text-gray-8-geist-mono text-black"
        >
          {question?.answers.length}
        </p>
      </div>
    </article>
  );
}

export default AdminQuestionDetails;
