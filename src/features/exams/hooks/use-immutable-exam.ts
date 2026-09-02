"use client";
import { useMutation } from "@tanstack/react-query";
import { IApiResponse } from "@/shared/lib/types/api";

// Interface for immutable exam params
interface IUseImmutableExamParams {
  id: string;
  immutable: boolean;
}

// Hook for immutable exam
export function useImmutableExam() {
  const mutation = useMutation({
    mutationFn: async ({ id, immutable }: IUseImmutableExamParams) => {
      const res = await fetch(`/api/exams/${id}/immutable`, {
        method: "PATCH",
        body: JSON.stringify({ immutable }),
      });
      const data: IApiResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      // Return data
      return data;
    },
  });

  // Return mutation
  return { mutation };
}
