import { useMutation } from "@tanstack/react-query";
import { IExamAnswer } from "@/features/exams/lib/types/exam";
import { IExamSubmissionResponse } from "../lib/types/api";

interface IUseExamSubmissionProps {
  examId: string;
  startedAt: Date;
}

export function useExamSubmission({
  examId,
  startedAt,
}: IUseExamSubmissionProps) {
  const mutation = useMutation({
    // Submit exam answers to server with metadata
    mutationFn: async (answers: IExamAnswer[]) => {
      const res = await fetch("/api/exams/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          examId,
          answers,
          startedAt,
        }),
      });

      const data: IExamSubmissionResponse = await res.json();

      // Fail if server returns error response
      if (!res.ok || !data.status) {
        throw new Error(data.message || "Failed to submit exam");
      }

      return data.payload;
    },
  });

  return {
    // Trigger exam submission
    submitExam: mutation.mutate,

    // Async version for manual control
    submitExamAsync: mutation.mutateAsync,

    // Submission state
    isSubmitting: mutation.isPending,
    isSuccess: mutation.isSuccess,

    // Result data or error
    error: mutation.error,
    data: mutation.data,
  };
}
