"use client";

import { IExam } from "@/features/exams/lib/types/exam";
import { IQuestion } from "@/features/questions/lib/types/question";
import { ExamPageQuestion } from "@/features/questions/components";
import { useExamController } from "@/features/exams/hooks";
import {
  ExamPageHeader,
  ExamPageNavigation,
  ExamPageResult,
  ExamPageStatus,
} from "@/features/exams/components";

interface IExamPageClientProps {
  exam: IExam;
  examQuestions: IQuestion[];
}

export default function ExamPageClient({
  exam,
  examQuestions,
}: IExamPageClientProps) {
  const examCtrl = useExamController(exam, examQuestions);

  // Success Screen
  if (examCtrl.isSuccess && examCtrl.result) {
    return <ExamPageResult data={examCtrl.result} />;
  }

  return (
    <div className="bg-white p-6 flex flex-col justify-center">
      {/* Exam header: title, progress, and timer */}
      <ExamPageHeader
        title={examCtrl.examTitle}
        currentIndex={examCtrl.currentIndex}
        total={examCtrl.totalQuestions}
        progress={examCtrl.progress}
        timeLeft={examCtrl.timer.timeLeft}
        angle={examCtrl.timer.angle}
        formatTime={examCtrl.timer.formatTime}
      />

      {/* Current question + answer selection */}
      <ExamPageQuestion
        question={examCtrl.currentQuestion}
        selectedAnswerId={examCtrl.answers[examCtrl.currentQuestion.id]}
        onSelect={examCtrl.selectAnswer}
      />

      {/* Navigation between questions or final submission */}
      <ExamPageNavigation
        onPrev={examCtrl.prev}
        onNextOrSubmit={examCtrl.handleNextOrSubmit}
        isFirst={examCtrl.currentIndex === 0}
        isLast={examCtrl.currentIndex === examCtrl.totalQuestions - 1}
        isDisabled={examCtrl.isSubmitting}
        isSubmitting={examCtrl.isSubmitting}
        isAnswered={examCtrl.isAnswered(examCtrl.currentQuestion.id)}
      />

      {/* Submission feedback (error/success states) */}
      <ExamPageStatus error={examCtrl.error} isSuccess={examCtrl.isSuccess} />
    </div>
  );
}
