"use client";

import { IExam } from "@/features/exams/lib/types/exam";
import { IQuestion } from "@/features/questions/lib/types/question";
import { useExamController } from "@/features/exams/hooks/use-exam-controller";
import { ExamQuestion } from "@/features/questions/components";

import {
  ExamHeader,
  ExamNavigation,
  ExamResult,
  ExamStatus,
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
    return <ExamResult data={examCtrl.result} />;
  }

  return (
    <div className="bg-white p-6 flex flex-col justify-center">
      {/* Exam header: title, progress, and timer */}
      <ExamHeader
        title={examCtrl.examTitle}
        currentIndex={examCtrl.currentIndex}
        total={examCtrl.totalQuestions}
        progress={examCtrl.progress}
        timeLeft={examCtrl.timer.timeLeft}
        angle={examCtrl.timer.angle}
        formatTime={examCtrl.timer.formatTime}
      />

      {/* Current question + answer selection */}
      <ExamQuestion
        question={examCtrl.currentQuestion}
        selectedAnswerId={examCtrl.answers[examCtrl.currentQuestion.id]}
        onSelect={examCtrl.selectAnswer}
      />

      {/* Navigation between questions or final submission */}
      <ExamNavigation
        onPrev={examCtrl.prev}
        onNextOrSubmit={examCtrl.handleNextOrSubmit}
        isFirst={examCtrl.currentIndex === 0}
        isLast={examCtrl.currentIndex === examCtrl.totalQuestions - 1}
        isDisabled={examCtrl.isSubmitting}
        isSubmitting={examCtrl.isSubmitting}
        isAnswered={examCtrl.isAnswered(examCtrl.currentQuestion.id)}
      />

      {/* Submission feedback (error/success states) */}
      <ExamStatus error={examCtrl.error} isSuccess={examCtrl.isSuccess} />
    </div>
  );
}
