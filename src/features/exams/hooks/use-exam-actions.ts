import { useCallback, useMemo } from "react";
import { IExamAnswer } from "../lib/types/exam";
import { formatExamAnswers } from "../lib/utils/format-answers.util";

interface IUseExamActionsProps {
  answers: Record<string, string>;
  examQuestionsLength: number;
  currentIndex: number;
  isSubmitting: boolean;
  submitExam: (answers: IExamAnswer[]) => void;
  next: () => void;
}

export function useExamActions({
  answers,
  examQuestionsLength,
  currentIndex,
  isSubmitting,
  submitExam,
  next,
}: IUseExamActionsProps) {
  // Check if current question is the last one
  const isLastQuestion = currentIndex === examQuestionsLength - 1;

  // Handle next step or submit exam
  const handleNextOrSubmit = useCallback(() => {
    if (isSubmitting) return;

    // Submit if last question, otherwise go next
    if (isLastQuestion) {
      submitExam(formatExamAnswers(answers));
      return;
    }

    next();
  }, [isSubmitting, isLastQuestion, submitExam, answers, next]);

  return {
    handleNextOrSubmit,
    isLastQuestion,
  };
}
