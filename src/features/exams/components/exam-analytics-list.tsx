import { memo } from "react";
import { IExamAnalytics } from "../lib/types/exam";

interface IExamAnalyticsListProps {
  analytics: IExamAnalytics[];
}

function ExamAnalyticsList({ analytics }: IExamAnalyticsListProps) {
  return (
    <section
      aria-label="Questions review"
      className="flex flex-col gap-6 max-h-[500px] overflow-y-auto p-4 border border-dashed border-blue-200"
    >
      {/* ==== Map through analytics array ==== */}
      {analytics.map((q, index) => {
        const correctText = q.correctAnswer?.text;
        const selectedText = q.selectedAnswer?.text;

        return (
          <article key={q.questionId} aria-label={`Question ${index + 1}`}>
            {/* Question text */}
            <h4 className="text-xl font-geist-mono text-blue-600 font-semibold mb-3">
              {q.questionText}
            </h4>

            {/* ==== Check if question is correct ==== */}
            {q.isCorrect ? (
              <div
                className="flex items-center gap-3 p-4 bg-emerald-50"
                aria-label="Correct answer"
              >
                <input
                  type="radio"
                  checked={true}
                  readOnly
                  className="w-4 h-4 shrink-0 accent-green-600 pointer-events-none"
                  aria-hidden
                />
                <span className="text-sm">{correctText}</span>
              </div>
            ) : (
              // Show incorrect answer breakdown
              <div className="space-y-3">
                {/* ==== User selected (wrong) answer ==== */}
                <div
                  className="flex items-center gap-3 p-4 bg-red-50"
                  aria-label="Selected answer (incorrect)"
                >
                  <input
                    type="radio"
                    checked={true}
                    readOnly
                    className="w-4 h-4 accent-red-600 pointer-events-none"
                    aria-hidden
                  />
                  <span className="text-sm">
                    {selectedText || "No answer selected"}
                  </span>
                </div>

                {/* Correct answer for comparison */}
                <div
                  className="flex items-center gap-3 p-4 bg-emerald-50"
                  aria-label="Correct answer"
                >
                  <div className="w-4 h-4 shrink-0 rounded-full border border-green-600" />
                  <span className="text-sm">{correctText}</span>
                </div>
              </div>
            )}
          </article>
        );
      })}
    </section>
  );
}

export default memo(ExamAnalyticsList);
