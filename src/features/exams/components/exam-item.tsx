import Image from "next/image";
import { IExam } from "../lib/types/exam";
import { Button } from "@/shared/components/ui/button";
import { CircleQuestionMark, MoveRight, Timer } from "lucide-react";
import TruncatedText from "@/shared/components/turncated-text";
import Link from "next/link";

function ExamItem({ exam, diplomaId }: { exam: IExam; diplomaId: string }) {
  return (
    <article className="bg-blue-50 p-4 flex gap-4 group">
      {/* ==== Exam Image ==== */}
      <div className="shrink-0 p-3 w-22 h-22 bg-blue-100 relative">
        {exam.image && (
          <Image
            src={exam.image}
            alt={`${exam.title} exam thumbnail`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* ==== Exam Content ==== */}
      <div className="flex flex-col gap-1.5 grow relative">
        {/* === Exam Heading (Title, Questions Count, Duration) === */}
        <div className="flex justify-between">
          {/* Exam Title */}
          <h3 className="text-xl font-semibold text-blue-600 font-geist-mono">
            {exam.title}
          </h3>

          {/* Questions Count & Duration */}
          <p className="text-sm text-gray-800 flex items-center gap-2">
            <CircleQuestionMark className="size-4.5" aria-hidden="true" />
            {exam.questionsCount} Questions{" "}
            <span className="bg-gray-300 h-4.5 w-0.25 inline-block"></span>{" "}
            <Timer className="size-4.5" aria-hidden="true" />
            {exam.duration} Minutes
          </p>
        </div>

        {/* === Exam Description === */}
        <TruncatedText text={exam.description || ""} maxChars={150} />

        {/* === Start Exam Button === */}
        <Link
          href={`/diplomas/${diplomaId}/${exam.id}`}
          className="flex items-center justify-center px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white absolute bottom-0 right-0 uppercase text-sm opacity-0 group-hover:opacity-100 transition-all duration-200 "
          aria-label={`Start ${exam.title} exam`}
        >
          Start
          <MoveRight className="size-4.5 ml-1" />
        </Link>
      </div>
    </article>
  );
}

export default ExamItem;
