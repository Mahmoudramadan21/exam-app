import { IExamAnswer } from "@/features/exams/lib/types/exam";

/**
 * Format exam answers to be submitted to the API.
 */
export function formatExamAnswers(
  answers: Record<string, string>,
): IExamAnswer[] {
  return Object.entries(answers).map(([questionId, answerId]) => ({
    questionId,
    answerId,
  }));
}
