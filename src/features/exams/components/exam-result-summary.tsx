import { CheckCircle, XCircle } from "lucide-react";

interface ExamResultSummaryProps {
  correct: number;
  wrong: number;
  percent: number;
  gradientStyle: React.CSSProperties;
}

export default function ExamResultSummary({
  correct,
  wrong,
  percent,
  gradientStyle,
}: ExamResultSummaryProps) {
  return (
    <section
      aria-label="Exam score summary"
      className="flex flex-col gap-9 justify-center items-center bg-blue-50 border border-blue-200 p-6"
    >
      {/* ==== Score Visualization ==== */}
      {/* Circular progress represents overall exam percentage */}
      <div
        className="relative w-44 h-44"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Exam score"
      >
        {/* Gradient ring background */}
        <div className="w-full h-full rounded-full" style={gradientStyle} />

        {/* Inner white mask to create donut effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white w-28 h-28 rounded-full" />
        </div>
      </div>

      {/* ==== Score Breakdown ==== */}
      <div className="flex flex-col gap-3">
        {/* Correct answers count */}
        <p
          className="tetx-sm font-geist-mono font-medium relative before:absolute before:-inset-s-6 ms-9 before:top-1/2 before:-translate-y-1/2 before:w-4 before:h-4 before:bg-green-500"
          aria-label={`Correct answers ${correct}`}
        >
          Correct: {correct}
        </p>

        {/* Incorrect answers count */}
        <p
          className="text-sm font-geist-mono font-medium relative before:absolute before:-inset-s-6 ms-9 before:top-1/2 before:-translate-y-1/2 before:w-4 before:h-4 before:bg-red-500"
          aria-label={`Incorrect answers ${wrong}`}
        >
          InCorrect: {wrong}
        </p>
      </div>
    </section>
  );
}
