import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { IExam } from "@/features/exams/lib/types/exam";

function AdminExamDetails({ exam }: { exam: IExam }) {
  return (
    <article
      aria-labelledby="exam-title"
      className="flex flex-col bg-white p-4 gap-4 font-geist-mono text-sm"
    >
      {/* ===== Exam Image ===== */}
      <div className="flex flex-col items-center md:items-start gap-1">
        <span className=" text-gray-400">Image</span>
        <div className="relative w-50 h-50 md:w-75 md:h-75">
          <Image
            src={exam.image || ""}
            alt={exam.title || ""}
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* ===== Exam Metadata ===== */}
      <dl className="flex flex-col gap-4">
        {/* Exam Title */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <dt className="text-gray-400">Title</dt>
          <dd className="text-black font-medium">{exam.title}</dd>
        </div>

        {/* Exam Diploma Title */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <dt className="text-gray-400">Diploma</dt>
          <dd>
            <Link
              href={`/diplomas/${exam.diploma.id}`}
              className="inline-flex items-center gap-1.5 hover:underline"
            >
              {exam.diploma.title}
              <ExternalLink size={14} aria-hidden="true" />
            </Link>
          </dd>
        </div>

        {/* Exam Duration */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <dt className="text-gray-400">Duration</dt>
          <dd className="text-black">{exam.duration} Minutes</dd>
        </div>

        {/* Exam Questions Count */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <dt className="text-gray-400">Number of Questions</dt>
          <dd className="text-black">{exam.questionsCount}</dd>
        </div>
      </dl>
    </article>
  );
}

export default AdminExamDetails;
