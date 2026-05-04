import { useMemo, useState } from "react";
import { IQuestion } from "@/features/questions/lib/types/question";

export function useExamNavigation(questions: IQuestion[]) {
  // Current active question index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Current question based on active index
  const currentQuestion = questions[currentIndex];

  // Progress percentage based on current position in exam
  const progress = useMemo(() => {
    return ((currentIndex + 1) / questions.length) * 100;
  }, [currentIndex, questions.length]);

  // Move to next question (bounded by last index)
  const next = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((p) => p + 1);
    }
  };

  // Move to previous question (bounded by first index)
  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((p) => p - 1);
    }
  };

  return {
    currentIndex,
    currentQuestion,
    progress,
    next,
    prev,
  };
}
