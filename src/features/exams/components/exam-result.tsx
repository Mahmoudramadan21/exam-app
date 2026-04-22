"use client";

import { useMemo } from "react";
import { IExamSubmissionPayload } from "@/features/exams/lib/types/api";

import {
  ExamResultSummary,
  ExamAnalyticsList,
  ExamResultActions,
} from "@/features/exams/components";

interface Props {
  data: IExamSubmissionPayload;
}

export default function ExamResult({ data }: Props) {
  const { submission, analytics } = data;

  const correct = submission.correctAnswers;
  const wrong = submission.wrongAnswers;
  const total = submission.totalQuestions;

  // Calculate success percentage safely
  const percent = useMemo(() => {
    if (!total) return 0;
    return Math.round((correct / total) * 100);
  }, [correct, total]);

  // Build circular gradient based on score percentage
  const gradientStyle = useMemo(
    () => ({
      background: `conic-gradient(
        from 90deg,
        #00BC7D 0% ${percent}%,
        #EF4444 ${percent}% 100%
      )`,
    }),
    [percent],
  );

  return (
    <section className="p-6 bg-white flex flex-col gap-6">
      {/* ==== Exam results header ==== */}
      <h3 className="text-2xl font-semibold font-geist-mono text-blue-600">
        Exam Results
      </h3>

      {/* ==== Main results layout (score + question review) ==== */}
      <div className="grid grid-cols-1 md:grid-cols-[275px_1fr] gap-4">
        {/* Score visualization (correct / wrong / percentage) */}
        <ExamResultSummary
          correct={correct}
          wrong={wrong}
          percent={percent}
          gradientStyle={gradientStyle}
        />

        {/* Per-question breakdown for review */}
        <ExamAnalyticsList analytics={analytics} />
      </div>

      {/* ==== User actions (retry or explore diploma) ==== */}
      <ExamResultActions />
    </section>
  );
}
