import { useState } from "react";

export function useExamAnswers() {
  // Store selected answers per question (questionId -> answerId)
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Update selected answer for a specific question
  const selectAnswer = (questionId: string, answerId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  // Check if a question has been answered
  const isAnswered = (questionId: string) => {
    return !!answers[questionId];
  };

  return { answers, selectAnswer, isAnswered };
}
